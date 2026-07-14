import { useQuery } from '@tanstack/react-query';

// In production: raw GitHub URL. In dev: load from /content/portfolio.json served by Vite
const PORTFOLIO_URL = import.meta.env.DEV
  ? '/content/portfolio.json'
  : `https://raw.githubusercontent.com/${import.meta.env.VITE_REPO_OWNER}/${import.meta.env.VITE_REPO_NAME}/main/content/portfolio.json`;

async function fetchPortfolioData() {
  const url = import.meta.env.DEV ? PORTFOLIO_URL : `${PORTFOLIO_URL}?t=${Date.now()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch portfolio data (${response.status})`);
  return response.json();
}

export function usePortfolioData() {
  return useQuery({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2,
  });
}
