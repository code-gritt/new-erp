'use client';

import { BaseLayout } from '@/components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
    IconHome,
    IconUser,
    IconSettings,
    IconFolderOpen,
    IconDownload,
    IconFileText,
    IconTrash,
} from '@tabler/icons-react';

type UserRole = 'admin' | 'sales_manager' | 'hr_manager' | 'employee';

interface Module {
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
    roles: UserRole[];
}

const dockItems = [
    { title: 'Dashboard', icon: <IconHome className="h-full w-full" />, href: '/dashboard' },
    { title: 'Files', icon: <IconFolderOpen className="h-full w-full" />, href: '/files' },
    { title: 'Downloads', icon: <IconDownload className="h-full w-full" />, href: '/downloads' },
    { title: 'Documents', icon: <IconFileText className="h-full w-full" />, href: '/documents' },
    { title: 'Trash', icon: <IconTrash className="h-full w-full" />, href: '/trash' },
    { title: 'Profile', icon: <IconUser className="h-full w-full" />, href: '/profile' },
    { title: 'Settings', icon: <IconSettings className="h-full w-full" />, href: '/settings' },
];

const modules: Module[] = [
    {
        title: 'General Ledger',
        description: 'Chart of accounts & journals',
        icon: <FileText className="w-9 h-9" />,
        path: '/modules/gl',
        color: 'bg-blue-500',
        roles: ['admin', 'sales_manager', 'employee'],
    },
    {
        title: 'Account Receivables',
        description: 'Customer invoices & receipts',
        icon: <DollarSign className="w-9 h-9" />,
        path: '/modules/ar',
        color: 'bg-green-500',
        roles: ['admin', 'sales_manager'],
    },
    {
        title: 'Account Payables',
        description: 'Vendor bills & payments',
        icon: <ShoppingCart className="w-9 h-9" />,
        path: '/modules/ap',
        color: 'bg-purple-500',
        roles: ['admin'],
    },
    {
        title: 'Cash Management',
        description: 'Bank reconciliation & cash flow',
        icon: <DollarSign className="w-9 h-9" />,
        path: '/modules/cash',
        color: 'bg-yellow-500',
        roles: ['admin'],
    },
    {
        title: 'Sales',
        description: 'Sales orders & delivery',
        icon: <FileText className="w-9 h-9" />,
        path: '/modules/sales',
        color: 'bg-pink-500',
        roles: ['admin', 'sales_manager'],
    },
    {
        title: 'Purchase',
        description: 'Purchase orders & receipts',
        icon: <ShoppingCart className="w-9 h-9" />,
        path: '/modules/purchase',
        color: 'bg-indigo-500',
        roles: ['admin'],
    },
    {
        title: 'Inventory',
        description: 'Stock control & movements',
        icon: <Package className="w-9 h-9" />,
        path: '/modules/inventory',
        color: 'bg-red-500',
        roles: ['admin', 'employee'],
    },
    {
        title: 'Fixed Assets',
        description: 'Asset register & depreciation',
        icon: <Factory className="w-9 h-9" />,
        path: '/modules/assets',
        color: 'bg-teal-500',
        roles: ['admin'],
    },
    {
        title: 'Project Costing',
        description: 'Job costing & profitability',
        icon: <BarChart3 className="w-9 h-9" />,
        path: '/modules/projects',
        color: 'bg-orange-500',
        roles: ['admin'],
    },
    {
        title: 'Human Resources',
        description: 'Employee records, payroll & leave',
        icon: <Users className="w-9 h-9" />,
        path: '/modules/hr',
        color: 'bg-cyan-500',
        roles: ['admin', 'hr_manager'],
    },
    {
        title: 'System Admin',
        description: 'Users, roles, permissions & audit logs',
        icon: <Settings className="w-9 h-9" />,
        path: '/admin',
        color: 'bg-gray-600',
        roles: ['admin'],
    },
];

export default function Dashboard() {
    const { role = 'employee' } = useSelector((state: any) => state.auth?.user || {});
    const [active, setActive] = useState<Module | null>(null);

    const visibleModules = modules.filter((m) => m.roles.includes(role as UserRole));

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
        if (active) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [active]);

    return (
        <BaseLayout title="" description="">
            <div className="min-h-screen bg-background pt-12 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {visibleModules.map((module) => (
                            <motion.div
                                key={module.title}
                                onClick={() => setActive(module)}
                                className="group cursor-pointer"
                                whileHover={{ y: -5, scale: 1 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <div
                                    className="relative p-8 rounded-3xl bg-background/70 backdrop-blur-xl border border-white/10 
                                shadow-lg hover:shadow-2xl hover:bg-background/90 
                                transition-all duration-300 flex flex-col items-center text-center h-full"
                                >
                                    <div
                                        className={`w-20 h-20 ${module.color} rounded-3xl flex items-center justify-center text-white 
                                  shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                                    >
                                        {module.icon}
                                    </div>

                                    <div className="mt-6 space-y-2">
                                        <h3 className="font-semibold text-foreground text-base tracking-tight">
                                            {module.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground/80 leading-snug px-2">
                                            {module.description}
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
                                className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                                onClick={() => setActive(null)}
                            />

                            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.94, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: 30 }}
                                    transition={{ type: 'spring', damping: 32, stiffness: 380 }}
                                    className="max-w-lg w-full pointer-events-auto"
                                >
                                    <div className="bg-background/96 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden">
                                        <div
                                            className={`h-52 ${active.color} relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-linear-to-br from-white/30 to-transparent opacity-60" />
                                            <div className="absolute inset-0 bg-black/10" />
                                            <div className="flex h-full items-center justify-center">
                                                <div className="scale-[2.8] text-white drop-shadow-xl">
                                                    {active.icon}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-9 space-y-8">
                                            <div className="space-y-3">
                                                <h3 className="text-3xl font-semibold text-foreground tracking-tight">
                                                    {active.title}
                                                </h3>
                                                <p className="text-muted-foreground text-base leading-relaxed">
                                                    {active.description}
                                                </p>
                                            </div>

                                            <div className="text-sm space-y-2 text-muted-foreground/90">
                                                <p>
                                                    Access level:{' '}
                                                    <span className="font-medium text-foreground capitalize">
                                                        {role.replace('_', ' ')}
                                                    </span>
                                                </p>
                                                <p>
                                                    Last opened:{' '}
                                                    <span className="font-medium text-foreground">
                                                        Today at 3:42 PM
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <Button
                                                    asChild
                                                    size="lg"
                                                    className="flex-1 rounded-xl font-medium text-base"
                                                >
                                                    <Link to={active.path}>Open Module</Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="lg"
                                                    onClick={() => setActive(null)}
                                                    className="rounded-xl"
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
