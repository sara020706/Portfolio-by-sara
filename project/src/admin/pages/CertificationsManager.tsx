import React, { useState } from 'react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { useSavePortfolioData } from '../hooks/useSavePortfolioData';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

export default function CertificationsManager() {
  const { data, isLoading } = usePortfolioData();
  const { saveData, isSaving, saveError } = useSavePortfolioData();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  const certificates = data?.certificates || [];

  const handleEdit = (cert: any) => {
    setEditingId(cert.id || cert.title);
    setEditForm({ ...cert, skills: cert.skills?.join(', ') || '' });
  };

  const handleAdd = () => {
    const newId = `cert-${Date.now()}`;
    const newCert = {
      id: newId,
      title: 'New Certificate',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialUrl: '',
      credentialId: '',
      image: '',
      skills: ''
    };
    setEditingId(newId);
    setEditForm(newCert);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    const newData = {
      ...data,
      certificates: certificates.filter((c: any) => (c.id || c.title) !== id)
    };
    await saveData(newData, `docs(certificates): delete certificate ${id}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCert = {
      ...editForm,
      skills: editForm.skills.split(',').map((t: string) => t.trim()).filter(Boolean),
    };

    const isNew = !certificates.find((c: any) => (c.id || c.title) === (updatedCert.id || updatedCert.title));
    const newCerts = isNew 
      ? [...certificates, updatedCert]
      : certificates.map((c: any) => (c.id || c.title) === (updatedCert.id || updatedCert.title) ? updatedCert : c);

    const newData = { ...data, certificates: newCerts };
    const success = await saveData(newData, `feat(certificates): ${isNew ? 'add' : 'update'} certificate ${updatedCert.title}`);
    
    if (success) {
      setEditingId(null);
      setEditForm(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Certifications Management</h1>
        <button
          onClick={handleAdd}
          disabled={editingId !== null}
          className="bg-primary hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium disabled:opacity-50 transition-colors"
        >
          <Plus size={18} /> Add Certificate
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
            {certificates.find((c:any) => (c.id || c.title) === editingId) ? 'Edit Certificate' : 'New Certificate'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input required type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Issuer</label>
                <input required type="text" value={editForm.issuer} onChange={e => setEditForm({...editForm, issuer: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Issue Date</label>
                <input type="text" value={editForm.issueDate || editForm.date || ''} onChange={e => setEditForm({...editForm, issueDate: e.target.value, date: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Credential URL</label>
                <input type="url" value={editForm.credentialUrl || editForm.verificationUrl || ''} onChange={e => setEditForm({...editForm, credentialUrl: e.target.value, verificationUrl: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">PDF/Image URL</label>
                <input type="url" value={editForm.image || editForm.pdfUrl || ''} onChange={e => setEditForm({...editForm, image: e.target.value, pdfUrl: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Skills (comma separated)</label>
                <input type="text" value={editForm.skills} onChange={e => setEditForm({...editForm, skills: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white" />
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
        {certificates.map((cert: any) => (
          <div key={cert.id || cert.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-700 transition-colors">
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">{cert.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{cert.issuer} • {cert.issueDate || cert.date}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleEdit(cert)} disabled={editingId !== null} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Edit2 size={18} />
              </button>
              <button onClick={() => handleDelete(cert.id || cert.title)} disabled={editingId !== null} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
