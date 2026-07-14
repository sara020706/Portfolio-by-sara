import React, { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useSavePortfolioData } from '../hooks/useSavePortfolioData';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'AI', 'Cloud', 'Database', 'Tools'];
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function SkillsManager() {
  const { data, isLoading } = usePortfolioData();
  const { saveData, isSaving, saveError } = useSavePortfolioData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-amber-500" size={32} /></div>;

  const skills = data?.skills || [];
  const grouped = SKILL_CATEGORIES.reduce((acc: any, cat) => {
    acc[cat] = skills.filter((s: any) => s.category === cat);
    return acc;
  }, {});

  const handleEdit = (skill: any) => { setEditingId(skill.id); setEditForm({ ...skill }); };
  const handleAdd = () => {
    const newId = `skill-${Date.now()}`;
    setEditingId(newId);
    setEditForm({ id: newId, name: '', icon: '', category: 'Frontend', level: 'Intermediate' });
  };
  const handleCancel = () => { setEditingId(null); setEditForm(null); };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this skill?')) return;
    await saveData({ ...data, skills: skills.filter((s: any) => s.id !== id) }, `docs(skills): delete skill ${id}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !skills.find((s: any) => s.id === editForm.id);
    const newSkills = isNew ? [...skills, editForm] : skills.map((s: any) => s.id === editForm.id ? editForm : s);
    const success = await saveData({ ...data, skills: newSkills }, `feat(skills): ${isNew ? 'add' : 'update'} skill ${editForm.name}`);
    if (success) handleCancel();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Skills Management</h1>
        <button onClick={handleAdd} disabled={!!editingId} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50 transition-colors">
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {saveError && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">{saveError}</div>}

      {editingId && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">{skills.find((s:any) => s.id === editingId) ? 'Edit Skill' : 'New Skill'}</h2>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input required type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Icon (name/url)</label>
              <input type="text" value={editForm.icon} onChange={e => setEditForm({...editForm, icon: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" placeholder="e.g. react, python" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white">
                {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Level</label>
              <select value={editForm.level} onChange={e => setEditForm({...editForm, level: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white">
                {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
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

      {SKILL_CATEGORIES.map(cat => grouped[cat]?.length > 0 && (
        <div key={cat} className="mb-8">
          <h2 className="text-lg font-bold text-amber-500 mb-3 uppercase tracking-widest text-xs">{cat}</h2>
          <div className="grid grid-cols-1 gap-2">
            {grouped[cat].map((skill: any) => (
              <div key={skill.id} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 flex items-center justify-between hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-white font-semibold">{skill.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{skill.level}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(skill)} disabled={!!editingId} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(skill.id)} disabled={!!editingId} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {skills.length === 0 && !editingId && (
        <div className="text-center text-gray-500 py-16 border border-dashed border-gray-800 rounded-2xl">
          <p className="text-lg mb-2">No skills yet</p>
          <button onClick={handleAdd} className="text-amber-500 hover:underline text-sm">Add your first skill →</button>
        </div>
      )}
    </div>
  );
}
