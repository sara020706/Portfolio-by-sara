import { useQuery } from '@tanstack/react-query';

// Load the deployed asset from the same origin in both dev and production.
// Vite serves /content/portfolio.json locally, and the build copies the file into public/ for production.
const PORTFOLIO_URL = '/content/portfolio.json';

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
