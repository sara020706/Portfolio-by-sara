import React, { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useSavePortfolioData } from '../hooks/useSavePortfolioData';
import { Plus, Edit2, Trash2, Save, X, Loader2, Award } from 'lucide-react';

export default function BadgesManager() {
  const { data, isLoading } = usePortfolioData();
  const { saveData, isSaving, saveError } = useSavePortfolioData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-amber-500" size={32} /></div>;

  const badges = data?.badges || [];

  const handleEdit = (badge: any) => { setEditingId(badge.id || badge.title); setEditForm({ ...badge }); };
  const handleAdd = () => {
    const newId = `badge-${Date.now()}`;
    setEditingId(newId);
    setEditForm({ id: newId, title: '', issuer: '', date: '', description: '', verificationUrl: '' });
  };
  const handleCancel = () => { setEditingId(null); setEditForm(null); };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this badge?')) return;
    await saveData({ ...data, badges: badges.filter((b: any) => (b.id || b.title) !== id) }, `docs(badges): delete badge ${id}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !badges.find((b: any) => (b.id || b.title) === (editForm.id || editForm.title));
    const newBadges = isNew ? [...badges, editForm] : badges.map((b: any) => (b.id || b.title) === (editForm.id || editForm.title) ? editForm : b);
    const success = await saveData({ ...data, badges: newBadges }, `feat(badges): ${isNew ? 'add' : 'update'} badge ${editForm.title}`);
    if (success) handleCancel();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Badges & Honors</h1>
        <button onClick={handleAdd} disabled={!!editingId} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50 transition-colors">
          <Plus size={18} /> Add Badge
        </button>
      </div>

      {saveError && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">{saveError}</div>}

      {editingId && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">{badges.find((b:any) => (b.id||b.title) === editingId) ? 'Edit Badge' : 'New Badge'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input required type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Issuer</label>
              <input required type="text" value={editForm.issuer} onChange={e => setEditForm({...editForm, issuer: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input type="text" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" placeholder="e.g. 12.11.2025" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea required value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white h-24" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Verification URL</label>
              <input type="url" value={editForm.verificationUrl} onChange={e => setEditForm({...editForm, verificationUrl: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div className="md:col-span-2 flex gap-4 pt-4 border-t border-gray-800">
              <button type="submit" disabled={isSaving} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50">
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Save
              </button>
              <button type="button" onClick={handleCancel} disabled={isSaving} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium">
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {badges.map((badge: any) => (
          <div key={badge.id || badge.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start justify-between hover:border-gray-700 transition-colors gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Award size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-white leading-tight">{badge.title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{badge.issuer} • {badge.date}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(badge)} disabled={!!editingId} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(badge.id || badge.title)} disabled={!!editingId} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {badges.length === 0 && !editingId && (
          <div className="text-center text-gray-500 py-16 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-lg mb-2">No badges yet</p>
            <button onClick={handleAdd} className="text-amber-500 hover:underline text-sm">Add your first badge →</button>
          </div>
        )}
      </div>
    </div>
  );
}
