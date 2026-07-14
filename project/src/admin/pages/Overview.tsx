import React from 'react';
import { NavLink } from 'react-router-dom';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { Briefcase, FileBadge, Code2, Award, Building2, ExternalLink, RefreshCw } from 'lucide-react';

export default function Overview() {
  const { data, isLoading, refetch, dataUpdatedAt } = usePortfolioData();

  const stats = [
    { label: 'Projects', icon: Briefcase, count: data?.projects?.length ?? '—', to: '/admin/projects', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Certifications', icon: FileBadge, count: data?.certificates?.length ?? '—', to: '/admin/certifications', color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Skills', icon: Code2, count: data?.skills?.length ?? '—', to: '/admin/skills', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Badges', icon: Award, count: data?.badges?.length ?? '—', to: '/admin/badges', color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Experience', icon: Building2, count: data?.experience?.length ?? '—', to: '/admin/internships', color: 'text-rose-400', bg: 'bg-rose-400/10' },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Overview</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Content last synced: {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '—'}
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <NavLink
              key={stat.label}
              to={stat.to}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all hover:-translate-y-0.5 group"
            >
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={20} className={stat.color} />
              </div>
              <div className={`text-3xl font-black ${stat.color} mb-0.5`}>{stat.count}</div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </NavLink>
          );
        })}
      </div>

      {/* Quick Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">How it works</h2>
        <ol className="space-y-3 text-sm text-gray-400">
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</span>
            <span>Click any section in the sidebar to manage that content type (Projects, Certifications, etc.).</span>
          </li>
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</span>
            <span>Add, edit, or delete entries using the forms. When you click <strong className="text-white">Save</strong>, the changes are committed directly to your GitHub repository.</span>
          </li>
          <li className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</span>
            <span>Your public portfolio automatically reflects the new content — no code changes needed.</span>
          </li>
        </ol>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
        >
          <ExternalLink size={14} /> View Live Portfolio
        </a>
      </div>
    </div>
  );
}
