import { Project } from './types';

export const defaultProjects: Project[] = [
    {
        title: 'AmortizePro',
        description: 'Loan Amortization Calculator.',
        tags: ['Django 5.2', 'HTML', 'TailwindCSS', 'Python 3.13'],
        github: 'https://github.com/sara020706/amortization-table',
        live: 'https://amortization-table.onrender.com/',
        gradient: 'from-orange-600 via-orange-500 to-amber-500',
        icon: 'Code2',
        iconColor: 'text-orange-100'
    },
    {
        title: 'Day-Wise',
        description: 'AI-Powered Task Scheduling Mobile App.',
        tags: ['React', 'TypeScript', 'Capacitor', 'Tailwind CSS'],
        github: 'https://github.com/sara020706/Day-Wise',
        live: 'https://github.com/sara020706/Day-Wise',
        gradient: 'from-orange-500 via-orange-600 to-orange-700',
        icon: 'Smartphone',
        iconColor: 'text-orange-100'
    },
    {
        title: 'Focus Sense',
        description: 'A beautiful, minimalist Pomodoro timer app built with React, Vite, and Capacitor for web and Android platforms.',
        tags: ['React 18 + TypeScript + Vite', 'Tailwind CSS', 'Lucide React', 'React Router', 'Capacitor', 'SQLite (Android) + IndexedDB (Web)', 'React Context + useReducer'],
        github: 'https://github.com/sara020706/focus-sense',
        live: 'https://github.com/sara020706/focus-sense',
        gradient: 'from-orange-500 via-orange-600 to-red-600',
        icon: 'Timer',
        iconColor: 'text-orange-100'
    },
    {
        title: 'Flames-By--Sara',
        description: 'A fun FLAMES game built with React, Vite, TailwindCSS, and Lucide icons. Enter two names, and discover your relationship compatibility — Friends, Love, Affection, Marriage, Enemy, or Sister 💕.',
        tags: ['React 18 (with Vite) ⚡', 'TailwindCSS 🎨', 'Lucide React (for icons) 🔥'],
        github: 'https://github.com/sara020706/Flames-By--Sara',
        live: 'https://flames-by-sara.vercel.app/',
        gradient: 'from-pink-500 via-orange-500 to-orange-600',
        icon: 'Heart',
        iconColor: 'text-pink-100'
    }
];
