import React, { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useSavePortfolioData } from '../hooks/useSavePortfolioData';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

export default function ProjectsManager() {
  const { data, isLoading } = usePortfolioData();
  const { saveData, isSaving, saveError } = useSavePortfolioData();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  const projects = data?.projects || [];

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setEditForm({ ...project, tags: project.tags?.join(', ') || '', technologies: project.technologies?.join(', ') || '' });
  };

  const handleAdd = () => {
    const newId = `project-${Date.now()}`;
    const newProject = {
      id: newId,
      title: 'New Project',
      subtitle: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      image: '',
      tags: '',
      order: projects.length + 1
    };
    setEditingId(newId);
    setEditForm(newProject);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const newData = {
      ...data,
      projects: projects.filter((p: any) => p.id !== id)
    };
    await saveData(newData, `docs(projects): delete project ${id}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject = {
      ...editForm,
      tags: editForm.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      technologies: editForm.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
    };

    const isNew = !projects.find((p: any) => p.id === updatedProject.id);
    const newProjects = isNew 
      ? [...projects, updatedProject]
      : projects.map((p: any) => p.id === updatedProject.id ? updatedProject : p);

    const newData = { ...data, projects: newProjects };
    const success = await saveData(newData, `feat(projects): ${isNew ? 'add' : 'update'} project ${updatedProject.title}`);
    
    if (success) {
      setEditingId(null);
      setEditForm(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Projects Management</h1>
        <button
          onClick={handleAdd}
          disabled={editingId !== null}
          className="bg-primary hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50 transition-colors"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {saveError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">
          {saveError}
        </div>
      )}

      {editingId && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">
            {projects.find((p:any) => p.id === editingId) ? 'Edit Project' : 'New Project'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input required type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Subtitle</label>
                <input type="text" value={editForm.subtitle} onChange={e => setEditForm({...editForm, subtitle: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea required value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white h-24" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
                <input type="url" value={editForm.githubUrl || editForm.github} onChange={e => setEditForm({...editForm, githubUrl: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Live URL</label>
                <input type="url" value={editForm.liveUrl || editForm.live} onChange={e => setEditForm({...editForm, liveUrl: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input type="text" value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                <input type="text" value={editForm.tags} onChange={e => setEditForm({...editForm, tags: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
                <input type="text" value={editForm.technologies} onChange={e => setEditForm({...editForm, technologies: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
            <div className="flex gap-4 pt-4 border-t border-gray-800">
              <button type="submit" disabled={isSaving} className="bg-primary hover:bg-amber-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50">
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Save
              </button>
              <button type="button" onClick={handleCancel} disabled={isSaving} className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50">
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project: any) => (
          <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-16 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                {project.image ? (
                   <img src={project.image} alt="" className="w-full h-full object-cover opacity-80" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Img</div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-1">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(project)} disabled={editingId !== null} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(project.id)} disabled={editingId !== null} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
