import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  FileBadge,
  Code2,
  Award,
  Building2,
  LogOut,
  ChevronLeft
} from 'lucide-react';

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview',        exact: true  },
  { to: '/admin/projects',       icon: Briefcase,       label: 'Projects'       },
  { to: '/admin/certifications', icon: FileBadge,       label: 'Certifications' },
  { to: '/admin/skills',         icon: Code2,           label: 'Skills'         },
  { to: '/admin/badges',         icon: Award,           label: 'Badges'         },
  { to: '/admin/internships',    icon: Building2,       label: 'Experience'     },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-screen sticky top-0 flex flex-col shrink-0">
      {/* Brand */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-lg"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
        >
          S
        </div>
        <div>
          <h2 className="text-sm font-bold text-white leading-tight">Portfolio CMS</h2>
          <p className="text-[11px] text-gray-500 mt-0.5">by Sara</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {links.map(({ to, icon: Icon, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800 space-y-0.5">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
        >
          <ChevronLeft size={17} />
          Back to Site
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
