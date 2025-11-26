'use client';

import { BaseLayout } from '@/components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FloatingDock } from '@/components/ui/floating-dock';
import { useQuery } from '@apollo/client';
import { GET_USER_MODULES } from '@/graphql/queries/getUserModules';
import {
    FileText,
    DollarSign,
    ShoppingCart,
    Package,
    Factory,
    BarChart3,
    Settings,
    Users,
} from 'lucide-react';
import {
    IconHome,
    IconUser,
    IconSettings,
    IconDownload,
    IconFileText,
    IconFolderOpen,
    IconTrash,
} from '@tabler/icons-react';

const dockItems = [
    { title: 'Dashboard', icon: <IconHome className="h-full w-full" />, href: '/dashboard' },
    { title: 'Files', icon: <IconFolderOpen className="h-full w-full" />, href: '/files' },
    { title: 'Downloads', icon: <IconDownload className="h-full w-full" />, href: '/downloads' },
    { title: 'Documents', icon: <IconFileText className="h-full w-full" />, href: '/documents' },
    { title: 'Trash', icon: <IconTrash className="h-full w-full" />, href: '/trash' },
    { title: 'Profile', icon: <IconUser className="h-full w-full" />, href: '/profile' },
    { title: 'Settings', icon: <IconSettings className="h-full w-full" />, href: '/settings' },
];

const iconMap: Record<string, React.ReactNode> = {
    FileText: <FileText className="w-9 h-9" />,
    DollarSign: <DollarSign className="w-9 h-9" />,
    ShoppingCart: <ShoppingCart className="w-9 h-9" />,
    Package: <Package className="w-9 h-9" />,
    Factory: <Factory className="w-9 h-9" />,
    BarChart3: <BarChart3 className="w-9 h-9" />,
    Settings: <Settings className="w-9 h-9" />,
    Users: <Users className="w-9 h-9" />,
};

const colorMap: Record<string, string> = {
    'General Ledger': 'bg-blue-500',
    'Accounts Receivable': 'bg-green-500',
    'Accounts Payable': 'bg-purple-500',
    'Cash Management': 'bg-yellow-600',
    Sales: 'bg-pink-500',
    Purchase: 'bg-indigo-500',
    'Stock Control': 'bg-red-500',
    'Fixed Assets': 'bg-teal-500',
    'Job Costing': 'bg-orange-500',
    'HR & Payroll Module': 'bg-cyan-500',
    'System Administration': 'bg-gray-600',
};

export default function Dashboard() {
    const [active, setActive] = useState<any>(null);
    const { token } = useSelector((state: any) => state.auth);

    const { data, loading, error } = useQuery(GET_USER_MODULES, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        skip: !token,
    });

    const modules = (data?.getUserModules || [])
        .filter((m: any) => m.access === 'Y')
        .map((m: any) => ({
            ...m,
            icon: iconMap[m.icon] || <FileText className="w-9 h-9" />,
            color: colorMap[m.module_name] || 'bg-gray-500',
            path: '/modules/placeholder',
        }));

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg">Loading your modules...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                <p>Failed to load modules. Please try again.</p>
            </div>
        );
    }

    return (
        <BaseLayout title="Dashboard" description="Your ERP modules">
            <div className="min-h-screen bg-background pt-8 pb-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {modules.map((module: any) => (
                            <motion.div
                                key={module.module_id}
                                onClick={() => setActive(module)}
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

                <AnimatePresence>
                    {active && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                                onClick={() => setActive(null)}
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                    className="max-w-lg w-full"
                                >
                                    <div className="bg-background/96 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                                        <div
                                            className={`h-56 ${active.color} relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-linear-to-br from-black/30 to-transparent" />
                                            <div className="flex h-full items-center justify-center">
                                                <div className="scale-[3.5] text-white opacity-90">
                                                    {active.icon}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 space-y-6">
                                            <div>
                                                <h3 className="text-3xl font-bold text-foreground">
                                                    {active.module_name}
                                                </h3>
                                                <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                                                    {active.module_description}
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                <Button
                                                    asChild
                                                    size="lg"
                                                    className="flex-1 rounded-xl font-medium"
                                                >
                                                    <Link to={active.path}>Open Module</Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="lg"
                                                    onClick={() => setActive(null)}
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

                <div className="fixed inset-x-0 bottom-8 z-40 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <FloatingDock items={dockItems} />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
