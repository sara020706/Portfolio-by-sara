import React, { useEffect, useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useSavePortfolioData } from '../hooks/useSavePortfolioData';
import { Save, Loader2, ExternalLink } from 'lucide-react';

export default function ProfileManager() {
  const { data, isLoading } = usePortfolioData();
  const { saveData, isSaving, saveError } = useSavePortfolioData();
  const [resumeUrl, setResumeUrl] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.profile?.resumeUrl) setResumeUrl(data.profile.resumeUrl);
  }, [data?.profile?.resumeUrl]);

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-amber-500" size={32} /></div>;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    const success = await saveData(
      { ...data, profile: { ...(data?.profile || {}), resumeUrl } },
      'docs(profile): update resume link'
    );
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>

      {saveError && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">{saveError}</div>}
      {saved && <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6">Resume link updated.</div>}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl">
        <h2 className="text-xl font-bold text-white mb-1">Resume Link</h2>
        <p className="text-sm text-gray-500 mb-6">
          This is the link the "Resume" nav item and any resume download buttons on the public site point to.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Resume URL</label>
            <input
              required
              type="url"
              value={resumeUrl}
              onChange={e => setResumeUrl(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white"
              placeholder="https://drive.google.com/file/d/.../view"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Save
            </button>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400 text-sm font-medium flex items-center gap-1.5"
              >
                <ExternalLink size={14} /> Open current link
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
