import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export function useSavePortfolioData() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const { token } = useAuth();
  const { refetch } = usePortfolioData();

  const saveData = async (newData: any, commitMessage: string) => {
    setIsSaving(true);
    setSaveError('');
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: token,
          content: newData,
          path: 'content/portfolio.json',
          message: commitMessage
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save data');
      }

      // Refetch the public query to ensure we have the latest
      await refetch();
      
      setIsSaving(false);
      return true;
    } catch (e: any) {
      console.error(e);
      setSaveError(e.message || 'An error occurred while saving.');
      setIsSaving(false);
      return false;
    }
  };

  return { saveData, isSaving, saveError };
}
