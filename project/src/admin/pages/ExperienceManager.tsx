import React, { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useSavePortfolioData } from '../hooks/useSavePortfolioData';
import { Plus, Edit2, Trash2, Save, X, Loader2, Building2 } from 'lucide-react';

export default function ExperienceManager() {
  const { data, isLoading } = usePortfolioData();
  const { saveData, isSaving, saveError } = useSavePortfolioData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const inferType = (item: any) => item.type || (item.location?.toLowerCase().includes('virtual') ? 'virtual' : 'offline');

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-amber-500" size={32} /></div>;

  // Support both new schema (experience[]) and legacy (internships via type field)
  const experience = data?.experience || [];

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      ...item,
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.skills || []).join(', '),
      type: inferType(item),
    });
  };
  const handleAdd = () => {
    const newId = `exp-${Date.now()}`;
    setEditingId(newId);
    setEditForm({ id: newId, company: '', role: '', duration: '', location: '', description: '', technologies: '', certificate: '', type: 'virtual' });
  };
  const handleCancel = () => { setEditingId(null); setEditForm(null); };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this experience entry?')) return;
    await saveData({ ...data, experience: experience.filter((e: any) => e.id !== id) }, `docs(experience): delete ${id}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...editForm,
      technologies: editForm.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
    };
    const isNew = !experience.find((e: any) => e.id === updated.id);
    const newExperience = isNew ? [...experience, updated] : experience.map((e: any) => e.id === updated.id ? updated : e);
    const success = await saveData({ ...data, experience: newExperience }, `feat(experience): ${isNew ? 'add' : 'update'} ${updated.role} at ${updated.company}`);
    if (success) handleCancel();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <button onClick={handleAdd} disabled={!!editingId} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50 transition-colors">
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {saveError && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">{saveError}</div>}

      {editingId && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">{experience.find((e:any) => e.id === editingId) ? 'Edit Experience' : 'New Experience'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company</label>
              <input required type="text" value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Role / Title</label>
              <input required type="text" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Duration</label>
              <input type="text" value={editForm.duration} onChange={e => setEditForm({...editForm, duration: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" placeholder="e.g. Jul 2025 - Sep 2025" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <input type="text" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" placeholder="e.g. Virtual, Remote, Chennai" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Type</label>
              <select value={editForm.type || 'virtual'} onChange={e => setEditForm({...editForm, type: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white">
                <option value="virtual">Virtual</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea required value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white h-28" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
              <input type="text" value={editForm.technologies} onChange={e => setEditForm({...editForm, technologies: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Certificate URL</label>
              <input type="url" value={editForm.certificate || ''} onChange={e => setEditForm({...editForm, certificate: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" placeholder="Optional certificate link" />
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
        {experience.map((item: any) => (
          <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-start justify-between hover:border-gray-700 transition-colors gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Building2 size={20} className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-white leading-tight">{item.role || item.title}</h3>
                <p className="text-sm text-amber-500/80 mt-0.5">{item.company}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.duration} {item.location ? `• ${item.location}` : ''}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${inferType(item) === 'offline' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                    {inferType(item) === 'offline' ? 'Offline' : 'Virtual'}
                  </span>
                  {item.certificate && (
                    <a href={item.certificate} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 hover:bg-amber-500/20">
                      Certificate
                    </a>
                  )}
                </div>
                {Array.isArray(item.technologies) && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.technologies.slice(0, 4).map((tech: string) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">{tech}</span>
                    ))}
                    {item.technologies.length > 4 && <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-500 rounded-full">+{item.technologies.length - 4} more</span>}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(item)} disabled={!!editingId} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(item.id)} disabled={!!editingId} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {experience.length === 0 && !editingId && (
          <div className="text-center text-gray-500 py-16 border border-dashed border-gray-800 rounded-2xl">
            <p className="text-lg mb-2">No experience entries yet</p>
            <button onClick={handleAdd} className="text-amber-500 hover:underline text-sm">Add your first experience →</button>
          </div>
        )}
      </div>
    </div>
  );
}
