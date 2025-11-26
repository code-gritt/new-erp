'use client';

import { BaseLayout } from '@/components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { useQuery } from '@apollo/client';
import { GET_USER_MODULES } from '@/graphql/queries/getUserModules';
import {
    IconHome,
    IconFolderOpen,
    IconDownload,
    IconFileText,
    IconTrash,
    IconUser,
    IconSettings,
} from '@tabler/icons-react';
import * as LucideIcons from 'lucide-react';

import type { UserModule, ModuleCard } from '@/types/dashboard';
import { ModuleDetailModal } from './components/module-detail-modal';

const dockItems = [
    { title: 'Dashboard', icon: <IconHome className="h-full w-full" />, href: '/dashboard-3' },
    { title: 'Files', icon: <IconFolderOpen className="h-full w-full" />, href: '/files' },
    { title: 'Downloads', icon: <IconDownload className="h-full w-full" />, href: '/downloads' },
    { title: 'Documents', icon: <IconFileText className="h-full w-full" />, href: '/documents' },
    { title: 'Trash', icon: <IconTrash className="h-full w-full" />, href: '/trash' },
    { title: 'Profile', icon: <IconUser className="h-full w-full" />, href: '/profile' },
    { title: 'Settings', icon: <IconSettings className="h-full w-full" />, href: '/settings' },
] as const;

const getDynamicIcon = (iconName: string | null): React.ReactNode => {
    if (!iconName) return <LucideIcons.FileText className="w-9 h-9" />;

    const Icon = (LucideIcons as any)[iconName] as
        | React.ComponentType<{ className?: string }>
        | undefined;
    return Icon ? <Icon className="w-9 h-9" /> : <LucideIcons.FileText className="w-9 h-9" />;
};

const getDynamicColor = (iconName: string | null): string => {
    if (!iconName) return 'bg-gray-500';
    const n = iconName.toLowerCase();

    if (n.includes('dollar') || n.includes('cash')) return 'bg-emerald-500';
    if (n.includes('file') || n.includes('text')) return 'bg-blue-500';
    if (n.includes('shopping') || n.includes('cart')) return 'bg-pink-500';
    if (n.includes('package') || n.includes('box')) return 'bg-orange-500';
    if (n.includes('factory') || n.includes('building')) return 'bg-purple-500';
    if (n.includes('chart') || n.includes('bar') || n.includes('graph')) return 'bg-indigo-500';
    if (n.includes('users') || n.includes('people') || n.includes('team')) return 'bg-cyan-500';
    if (n.includes('settings') || n.includes('cog') || n.includes('gear')) return 'bg-gray-600';

    return 'bg-gray-500';
};

export default function Dashboard() {
    const [activeModule, setActiveModule] = useState<ModuleCard | null>(null);
    const { token } = useSelector((state: any) => state.auth);

    const { data, loading, error } = useQuery<{ getUserModules: UserModule[] }>(GET_USER_MODULES, {
        context: { headers: { Authorization: `Bearer ${token}` } },
        skip: !token,
    });

    const modules: ModuleCard[] = (data?.getUserModules || [])
        .filter((m): m is UserModule => m.access === 'Y')
        .map(
            (m): ModuleCard => ({
                ...m,
                icon: getDynamicIcon(m.icon),
                color: getDynamicColor(m.icon),
                path: m.front_end_url || '#',
            })
        );

    if (loading)
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg">Loading modules...</p>
            </div>
        );
    if (error)
        return (
            <div className="flex min-h-screen items-center justify-center text-red-500">
                <p>Failed to load modules.</p>
            </div>
        );

    return (
        <BaseLayout title="Dashboard" description="Your ERP modules">
            <div className="min-h-screen bg-background pt-8 pb-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {modules.map((module) => (
                            <motion.div
                                key={module.module_id}
                                onClick={() => setActiveModule(module)}
                                className="group cursor-pointer select-none"
                                whileHover={{ y: -8, scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <div className="relative p-6 rounded-3xl bg-background/70 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center text-center">
                                    <div
                                        className={`${module.color} w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}
                                    >
                                        {module.icon}
                                    </div>
                                    <div className="mt-5 space-y-2">
                                        <h3 className="font-semibold text-foreground text-base tracking-tight">
                                            {module.module_name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {module.module_description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="fixed inset-x-0 bottom-8 z-40 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <FloatingDock items={dockItems} />
                    </div>
                </div>

                <ModuleDetailModal module={activeModule} onClose={() => setActiveModule(null)} />
            </div>
        </BaseLayout>
    );
}
