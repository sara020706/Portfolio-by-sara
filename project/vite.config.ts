import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

/* ─── Helper: read body as JSON ──────────────────────────────────────────── */
function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); }
      catch { reject(new Error('Invalid JSON body')); }
    });
    req.on('error', reject);
  });
}

/* ─── Helper: send JSON response ─────────────────────────────────────────── */
function sendJSON(res: ServerResponse, status: number, body: object) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

/* ─── Dev API middleware plugin ───────────────────────────────────────────── */
function devApiPlugin(env: Record<string, string>) {
  return {
    name: 'dev-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url ?? '';
        const method = req.method ?? 'GET';

        /* POST /api/auth ── simple password check */
        if (url === '/api/auth' && method === 'POST') {
          try {
            const body = await readBody(req);
            if (body.password && body.password === env.ADMIN_PASSWORD) {
              return sendJSON(res, 200, { success: true, token: env.ADMIN_PASSWORD });
            }
            return sendJSON(res, 401, { error: 'Invalid password' });
          } catch {
            return sendJSON(res, 400, { error: 'Bad request' });
          }
        }

        /* POST /api/save ── commit updated portfolio.json to GitHub */
        if (url === '/api/save' && method === 'POST') {
          try {
            const body = await readBody(req);
            const { password, content, path: filePath, message } = body;

            if (password !== env.ADMIN_PASSWORD) {
              return sendJSON(res, 401, { error: 'Unauthorized' });
            }
            if (!content || !filePath || !message) {
              return sendJSON(res, 400, { error: 'Missing required fields' });
            }

            const GITHUB_PAT  = env.GITHUB_PAT;
            const REPO_OWNER  = env.REPO_OWNER  || env.VITE_REPO_OWNER;
            const REPO_NAME   = env.REPO_NAME   || env.VITE_REPO_NAME;

            if (!GITHUB_PAT) {
              /* ── Fallback for local dev without PAT: write to local disk ── */
              const localPath = path.resolve(__dirname, '..', filePath);
              fs.mkdirSync(path.dirname(localPath), { recursive: true });
              fs.writeFileSync(localPath, JSON.stringify(content, null, 2), 'utf-8');

              // Also keep public/content in sync so Vite serves the update immediately
              const pubDir = path.resolve(__dirname, 'public', path.dirname(filePath));
              fs.mkdirSync(pubDir, { recursive: true });
              fs.writeFileSync(
                path.join(pubDir, path.basename(filePath)),
                JSON.stringify(content, null, 2),
                'utf-8',
              );
              return sendJSON(res, 200, { success: true, local: true, message: 'Saved locally (no GITHUB_PAT set)' });
            }

            /* ── Real GitHub commit ── */
            const fileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;
            const getRes = await fetch(fileUrl, {
              headers: {
                Authorization: `token ${GITHUB_PAT}`,
                Accept: 'application/vnd.github.v3+json',
              },
            });
            let sha: string | undefined;
            if (getRes.ok) sha = (await getRes.json()).sha;

            const putRes = await fetch(fileUrl, {
              method: 'PUT',
              headers: {
                Authorization: `token ${GITHUB_PAT}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message,
                content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
                sha,
              }),
            });

            if (!putRes.ok) {
              const err = await putRes.json();
              return sendJSON(res, putRes.status, { error: 'GitHub API error', details: err });
            }

            // Mirror the change to local disk so Vite serves the new file immediately
            const localPath = path.resolve(__dirname, '..', filePath);
            fs.mkdirSync(path.dirname(localPath), { recursive: true });
            fs.writeFileSync(localPath, JSON.stringify(content, null, 2), 'utf-8');
            const pubDir = path.resolve(__dirname, 'public', path.dirname(filePath));
            fs.mkdirSync(pubDir, { recursive: true });
            fs.writeFileSync(
              path.join(pubDir, path.basename(filePath)),
              JSON.stringify(content, null, 2),
              'utf-8',
            );

            return sendJSON(res, 200, { success: true });
          } catch (e: any) {
            return sendJSON(res, 500, { error: 'Internal server error', details: e.message });
          }
        }

        next();
      });
    },
  };
}

/* ─── Sync content/portfolio.json → public/content/portfolio.json ─────────── */
function syncContentPlugin() {
  return {
    name: 'sync-content',
    buildStart() {
      const src = path.resolve(__dirname, '../content/portfolio.json');
      const destDir = path.resolve(__dirname, 'public/content');
      const dest = path.join(destDir, 'portfolio.json');
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      if (fs.existsSync(src)) fs.copyFileSync(src, dest);
    },
  };
}

/* ─── Vite config ─────────────────────────────────────────────────────────── */
export default defineConfig(({ mode }) => {
  // Load all env vars (including non-VITE_ ones) for use in the dev middleware
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), syncContentPlugin(), devApiPlugin(env)],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
