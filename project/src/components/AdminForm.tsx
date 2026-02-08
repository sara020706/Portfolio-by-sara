import React, { useState } from 'react';
import { X, Save, Trash2, Download, Upload } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Certification, Badge, Internship, Project } from '../data/types';
import { defaultCertifications } from '../data/certifications';
import { defaultBadges } from '../data/badges';
import { defaultInternships } from '../data/internships';
import { defaultProjects } from '../data/projects';

type Tab = 'certifications' | 'badges' | 'internships' | 'projects';

interface AdminFormProps {
    onClose: () => void;
}

export const AdminForm: React.FC<AdminFormProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<Tab>('certifications');
    const [certifications, setCertifications] = useLocalStorage<Certification[]>('portfolio_certifications', defaultCertifications);
    const [badges, setBadges] = useLocalStorage<Badge[]>('portfolio_badges', defaultBadges);
    const [internships, setInternships] = useLocalStorage<Internship[]>('portfolio_internships', defaultInternships);
    const [projects, setProjects] = useLocalStorage<Project[]>('portfolio_projects', defaultProjects);

    // Form states
    const [certForm, setCertForm] = useState<Partial<Certification>>({});
    const [badgeForm, setBadgeForm] = useState<Partial<Badge>>({});
    const [internshipForm, setInternshipForm] = useState<Partial<Internship>>({});
    const [projectForm, setProjectForm] = useState<Partial<Project>>({});
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // Add/Update Certification
    const handleSaveCertification = () => {
        if (!certForm.title || !certForm.issuer) {
            alert('Please fill in required fields (Title, Issuer)');
            return;
        }

        const newCert: Certification = {
            title: certForm.title,
            issuer: certForm.issuer,
            date: certForm.date || '',
            verificationUrl: certForm.verificationUrl || '',
            pdfUrl: certForm.pdfUrl || '',
        };

        if (editIndex !== null) {
            const updated = [...certifications];
            updated[editIndex] = newCert;
            setCertifications(updated);
        } else {
            setCertifications([...certifications, newCert]);
        }

        setCertForm({});
        setEditIndex(null);
    };

    // Add/Update Badge
    const handleSaveBadge = () => {
        if (!badgeForm.title || !badgeForm.issuer) {
            alert('Please fill in required fields (Title, Issuer)');
            return;
        }

        const newBadge: Badge = {
            title: badgeForm.title,
            issuer: badgeForm.issuer,
            date: badgeForm.date || '',
            description: badgeForm.description || '',
            verificationUrl: badgeForm.verificationUrl || '',
        };

        if (editIndex !== null) {
            const updated = [...badges];
            updated[editIndex] = newBadge;
            setBadges(updated);
        } else {
            setBadges([...badges, newBadge]);
        }

        setBadgeForm({});
        setEditIndex(null);
    };

    // Add/Update Internship
    const handleSaveInternship = () => {
        if (!internshipForm.title || !internshipForm.company) {
            alert('Please fill in required fields (Title, Company)');
            return;
        }

        const newInternship: Internship = {
            title: internshipForm.title,
            company: internshipForm.company,
            duration: internshipForm.duration || '',
            description: internshipForm.description || '',
            skills: internshipForm.skills || [],
            certificate: internshipForm.certificate || '',
            type: internshipForm.type || 'virtual',
        };

        if (editIndex !== null) {
            const updated = [...internships];
            updated[editIndex] = newInternship;
            setInternships(updated);
        } else {
            setInternships([...internships, newInternship]);
        }

        setInternshipForm({});
        setEditIndex(null);
    };

    // Delete functions
    const handleDeleteCertification = (index: number) => {
        if (confirm('Are you sure you want to delete this certification?')) {
            setCertifications(certifications.filter((_, i) => i !== index));
        }
    };

    const handleDeleteBadge = (index: number) => {
        if (confirm('Are you sure you want to delete this badge?')) {
            setBadges(badges.filter((_, i) => i !== index));
        }
    };

    const handleDeleteInternship = (index: number) => {
        if (confirm('Are you sure you want to delete this internship?')) {
            setInternships(internships.filter((_, i) => i !== index));
        }
    };

    // Add/Update Project
    const handleSaveProject = () => {
        if (!projectForm.title || !projectForm.description) {
            alert('Please fill in required fields (Title, Description)');
            return;
        }

        const newProject: Project = {
            title: projectForm.title,
            description: projectForm.description,
            tags: projectForm.tags || [],
            github: projectForm.github || '',
            live: projectForm.live || '',
            gradient: projectForm.gradient || 'from-orange-600 to-orange-500',
            icon: projectForm.icon || 'Folder',
            iconColor: projectForm.iconColor || 'text-orange-100',
        };

        if (editIndex !== null) {
            const updated = [...projects];
            updated[editIndex] = newProject;
            setProjects(updated);
        } else {
            setProjects([...projects, newProject]);
        }

        setProjectForm({});
        setEditIndex(null);
    };

    const handleDeleteProject = (index: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter((_, i) => i !== index));
        }
    };

    // Export/Import functions
    const handleExport = () => {
        const data = {
            certifications,
            badges,
            internships,
            projects,
            exportDate: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-${Date.now()}.json`;
        a.click();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                if (data.certifications) setCertifications(data.certifications);
                if (data.badges) setBadges(data.badges);
                if (data.internships) setInternships(data.internships);
                if (data.projects) setProjects(data.projects);
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-pumpkin/30 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold text-white">Admin Panel - Content Management</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                        >
                            <Download size={16} />
                            Export
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer">
                            <Upload size={16} />
                            Import
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </label>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-700 px-6">
                    <button
                        onClick={() => setActiveTab('certifications')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'certifications'
                            ? 'text-pumpkin border-b-2 border-pumpkin'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Certifications ({certifications.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('badges')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'badges'
                            ? 'text-pumpkin border-b-2 border-pumpkin'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Badges ({badges.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('internships')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'internships'
                            ? 'text-pumpkin border-b-2 border-pumpkin'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Internships ({internships.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'projects'
                            ? 'text-pumpkin border-b-2 border-pumpkin'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Projects ({projects.length})
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'certifications' && (
                        <CertificationTab
                            certifications={certifications}
                            certForm={certForm}
                            setCertForm={setCertForm}
                            editIndex={editIndex}
                            setEditIndex={setEditIndex}
                            onSave={handleSaveCertification}
                            onDelete={handleDeleteCertification}
                        />
                    )}
                    {activeTab === 'badges' && (
                        <BadgeTab
                            badges={badges}
                            badgeForm={badgeForm}
                            setBadgeForm={setBadgeForm}
                            editIndex={editIndex}
                            setEditIndex={setEditIndex}
                            onSave={handleSaveBadge}
                            onDelete={handleDeleteBadge}
                        />
                    )}
                    {activeTab === 'internships' && (
                        <InternshipTab
                            internships={internships}
                            internshipForm={internshipForm}
                            setInternshipForm={setInternshipForm}
                            editIndex={editIndex}
                            setEditIndex={setEditIndex}
                            onSave={handleSaveInternship}
                            onDelete={handleDeleteInternship}
                        />
                    )}
                    {activeTab === 'projects' && (
                        <ProjectTab
                            projects={projects}
                            projectForm={projectForm}
                            setProjectForm={setProjectForm}
                            editIndex={editIndex}
                            setEditIndex={setEditIndex}
                            onSave={handleSaveProject}
                            onDelete={handleDeleteProject}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Certification Tab Component
const CertificationTab: React.FC<{
    certifications: Certification[];
    certForm: Partial<Certification>;
    setCertForm: React.Dispatch<React.SetStateAction<Partial<Certification>>>;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    onSave: () => void;
    onDelete: (index: number) => void;
}> = ({ certifications, certForm, setCertForm, editIndex, setEditIndex, onSave, onDelete }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">
                    {editIndex !== null ? 'Edit Certification' : 'Add New Certification'}
                </h3>
                <input
                    type="text"
                    placeholder="Title *"
                    value={certForm.title || ''}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Issuer *"
                    value={certForm.issuer || ''}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Date"
                    value={certForm.date || ''}
                    onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="url"
                    placeholder="Verification URL"
                    value={certForm.verificationUrl || ''}
                    onChange={(e) => setCertForm({ ...certForm, verificationUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="url"
                    placeholder="PDF URL"
                    value={certForm.pdfUrl || ''}
                    onChange={(e) => setCertForm({ ...certForm, pdfUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <div className="flex gap-2">
                    <button
                        onClick={onSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pumpkin hover:bg-pumpkin-dark text-white rounded-lg transition-colors"
                    >
                        <Save size={16} />
                        {editIndex !== null ? 'Update' : 'Add'}
                    </button>
                    {editIndex !== null && (
                        <button
                            onClick={() => {
                                setCertForm({});
                                setEditIndex(null);
                            }}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-4">Current Certifications</h3>
                {certifications.map((cert, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-bold text-white">{cert.title}</h4>
                                <p className="text-sm text-gray-400">{cert.issuer} • {cert.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setCertForm(cert);
                                        setEditIndex(index);
                                    }}
                                    className="p-2 hover:bg-slate-700 rounded text-pumpkin transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(index)}
                                    className="p-2 hover:bg-slate-700 rounded text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Badge Tab Component (similar structure)
const BadgeTab: React.FC<{
    badges: Badge[];
    badgeForm: Partial<Badge>;
    setBadgeForm: React.Dispatch<React.SetStateAction<Partial<Badge>>>;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    onSave: () => void;
    onDelete: (index: number) => void;
}> = ({ badges, badgeForm, setBadgeForm, editIndex, setEditIndex, onSave, onDelete }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">
                    {editIndex !== null ? 'Edit Badge' : 'Add New Badge'}
                </h3>
                <input
                    type="text"
                    placeholder="Title *"
                    value={badgeForm.title || ''}
                    onChange={(e) => setBadgeForm({ ...badgeForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Issuer *"
                    value={badgeForm.issuer || ''}
                    onChange={(e) => setBadgeForm({ ...badgeForm, issuer: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Date"
                    value={badgeForm.date || ''}
                    onChange={(e) => setBadgeForm({ ...badgeForm, date: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <textarea
                    placeholder="Description"
                    value={badgeForm.description || ''}
                    onChange={(e) => setBadgeForm({ ...badgeForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none h-24"
                />
                <input
                    type="url"
                    placeholder="Verification URL"
                    value={badgeForm.verificationUrl || ''}
                    onChange={(e) => setBadgeForm({ ...badgeForm, verificationUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <div className="flex gap-2">
                    <button
                        onClick={onSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pumpkin hover:bg-pumpkin-dark text-white rounded-lg transition-colors"
                    >
                        <Save size={16} />
                        {editIndex !== null ? 'Update' : 'Add'}
                    </button>
                    {editIndex !== null && (
                        <button
                            onClick={() => {
                                setBadgeForm({});
                                setEditIndex(null);
                            }}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-4">Current Badges</h3>
                {badges.map((badge, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-bold text-white">{badge.title}</h4>
                                <p className="text-sm text-gray-400">{badge.issuer} • {badge.date}</p>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{badge.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setBadgeForm(badge);
                                        setEditIndex(index);
                                    }}
                                    className="p-2 hover:bg-slate-700 rounded text-pumpkin transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(index)}
                                    className="p-2 hover:bg-slate-700 rounded text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Internship Tab Component
const InternshipTab: React.FC<{
    internships: Internship[];
    internshipForm: Partial<Internship>;
    setInternshipForm: React.Dispatch<React.SetStateAction<Partial<Internship>>>;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    onSave: () => void;
    onDelete: (index: number) => void;
}> = ({ internships, internshipForm, setInternshipForm, editIndex, setEditIndex, onSave, onDelete }) => {
    const [filter, setFilter] = useState<'all' | 'virtual' | 'offline'>('all');

    const filteredInternships = internships.filter(i => {
        if (filter === 'all') return true;
        return i.type === filter;
    });

    const virtualCount = internships.filter(i => i.type === 'virtual').length;
    const offlineCount = internships.filter(i => i.type === 'offline').length;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">
                    {editIndex !== null ? 'Edit Internship' : 'Add New Internship'}
                </h3>
                <input
                    type="text"
                    placeholder="Title *"
                    value={internshipForm.title || ''}
                    onChange={(e) => setInternshipForm({ ...internshipForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Company *"
                    value={internshipForm.company || ''}
                    onChange={(e) => setInternshipForm({ ...internshipForm, company: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />

                {/* Type Selector - More Prominent */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Internship Type *</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => setInternshipForm({ ...internshipForm, type: 'virtual' })}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${(internshipForm.type || 'virtual') === 'virtual'
                                ? 'bg-pumpkin text-white shadow-lg'
                                : 'bg-slate-900 text-gray-400 hover:bg-slate-800'
                                }`}
                        >
                            🌐 Virtual
                        </button>
                        <button
                            type="button"
                            onClick={() => setInternshipForm({ ...internshipForm, type: 'offline' })}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${internshipForm.type === 'offline'
                                ? 'bg-pumpkin text-white shadow-lg'
                                : 'bg-slate-900 text-gray-400 hover:bg-slate-800'
                                }`}
                        >
                            🏢 Offline
                        </button>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Duration (e.g., Jun 2024 - Aug 2024)"
                    value={internshipForm.duration || ''}
                    onChange={(e) => setInternshipForm({ ...internshipForm, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <textarea
                    placeholder="Description"
                    value={internshipForm.description || ''}
                    onChange={(e) => setInternshipForm({ ...internshipForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none h-24"
                />
                <input
                    type="text"
                    placeholder="Skills (comma-separated)"
                    value={internshipForm.skills?.join(', ') || ''}
                    onChange={(e) => setInternshipForm({ ...internshipForm, skills: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="url"
                    placeholder="Certificate URL"
                    value={internshipForm.certificate || ''}
                    onChange={(e) => setInternshipForm({ ...internshipForm, certificate: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <div className="flex gap-2">
                    <button
                        onClick={onSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pumpkin hover:bg-pumpkin-dark text-white rounded-lg transition-colors"
                    >
                        <Save size={16} />
                        {editIndex !== null ? 'Update' : 'Add'}
                    </button>
                    {editIndex !== null && (
                        <button
                            onClick={() => {
                                setInternshipForm({});
                                setEditIndex(null);
                            }}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* List with Filter Tabs */}
            <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Current Internships</h3>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all'
                            ? 'bg-pumpkin text-white'
                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        All ({internships.length})
                    </button>
                    <button
                        onClick={() => setFilter('virtual')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'virtual'
                            ? 'bg-pumpkin text-white'
                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        🌐 Virtual ({virtualCount})
                    </button>
                    <button
                        onClick={() => setFilter('offline')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'offline'
                            ? 'bg-pumpkin text-white'
                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                            }`}
                    >
                        🏢 Offline ({offlineCount})
                    </button>
                </div>

                {/* Internships List */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {filteredInternships.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            No {filter !== 'all' ? filter : ''} internships yet
                        </div>
                    ) : (
                        filteredInternships.map((internship) => {
                            const actualIndex = internships.indexOf(internship);
                            return (
                                <div key={actualIndex} className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-white">{internship.title}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${internship.type === 'virtual'
                                                    ? 'bg-blue-500/20 text-blue-300'
                                                    : 'bg-green-500/20 text-green-300'
                                                    }`}>
                                                    {internship.type === 'virtual' ? '🌐 Virtual' : '🏢 Offline'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">{internship.company} • {internship.duration}</p>
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{internship.description}</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {internship.skills.map((skill, i) => (
                                                    <span key={i} className="text-xs px-2 py-1 bg-pumpkin/20 text-pumpkin rounded">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    setInternshipForm(internship);
                                                    setEditIndex(actualIndex);
                                                }}
                                                className="p-2 hover:bg-slate-700 rounded text-pumpkin transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(actualIndex)}
                                                className="p-2 hover:bg-slate-700 rounded text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

// Project Tab Component
const ProjectTab: React.FC<{
    projects: Project[];
    projectForm: Partial<Project>;
    setProjectForm: React.Dispatch<React.SetStateAction<Partial<Project>>>;
    editIndex: number | null;
    setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
    onSave: () => void;
    onDelete: (index: number) => void;
}> = ({ projects, projectForm, setProjectForm, editIndex, setEditIndex, onSave, onDelete }) => {
    const iconOptions = ['Code2', 'Smartphone', 'Timer', 'Heart', 'Folder', 'Zap', 'Palette'];
    const gradientOptions = [
        'from-orange-600 via-orange-500 to-amber-500',
        'from-orange-500 via-orange-600 to-orange-700',
        'from-orange-500 via-orange-600 to-red-600',
        'from-pink-500 via-orange-500 to-orange-600',
        'from-purple-500 via-orange-500 to-orange-600',
        'from-blue-500 via-orange-500 to-orange-600',
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">
                    {editIndex !== null ? 'Edit Project' : 'Add New Project'}
                </h3>
                <input
                    type="text"
                    placeholder="Title *"
                    value={projectForm.title || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <textarea
                    placeholder="Description *"
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none h-24"
                />
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={projectForm.tags?.join(', ') || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value.split(',').map(s => s.trim()) })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="url"
                    placeholder="GitHub URL"
                    value={projectForm.github || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />
                <input
                    type="url"
                    placeholder="Live URL"
                    value={projectForm.live || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />

                {/* Icon Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                    <select
                        value={projectForm.icon || 'Folder'}
                        onChange={(e) => setProjectForm({ ...projectForm, icon: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                    >
                        {iconOptions.map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                        ))}
                    </select>
                </div>

                {/* Gradient Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gradient</label>
                    <select
                        value={projectForm.gradient || gradientOptions[0]}
                        onChange={(e) => setProjectForm({ ...projectForm, gradient: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                    >
                        {gradientOptions.map((grad, i) => (
                            <option key={i} value={grad}>{grad}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="text"
                    placeholder="Icon Color (e.g., text-orange-100)"
                    value={projectForm.iconColor || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, iconColor: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-pumpkin focus:outline-none"
                />

                <div className="flex gap-2">
                    <button
                        onClick={onSave}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pumpkin hover:bg-pumpkin-dark text-white rounded-lg transition-colors"
                    >
                        <Save size={16} />
                        {editIndex !== null ? 'Update' : 'Add'}
                    </button>
                    {editIndex !== null && (
                        <button
                            onClick={() => {
                                setProjectForm({});
                                setEditIndex(null);
                            }}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-4">Current Projects</h3>
                {projects.map((project, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-bold text-white">{project.title}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-pumpkin/20 text-pumpkin rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 mt-2">Icon: {project.icon} | Gradient: {project.gradient.substring(0, 30)}...</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setProjectForm(project);
                                        setEditIndex(index);
                                    }}
                                    className="p-2 hover:bg-slate-700 rounded text-pumpkin transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(index)}
                                    className="p-2 hover:bg-slate-700 rounded text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
