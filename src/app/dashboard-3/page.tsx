'use client';

import { BaseLayout } from '@/components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useId, useEffect } from 'react';
import {
    FileText,
    DollarSign,
    ShoppingCart,
    Package,
    Factory,
    BarChart3,
    Settings,
    Star,
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
    favorite: boolean;
    color: string;
    roles: UserRole[];
}

const dockItems = [
    {
        title: 'Dashboard',
        icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/dashboard',
    },
    {
        title: 'Files',
        icon: <IconFolderOpen className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/files',
    },
    {
        title: 'Downloads',
        icon: <IconDownload className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/downloads',
    },
    {
        title: 'Documents',
        icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/documents',
    },
    {
        title: 'Trash',
        icon: <IconTrash className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/trash',
    },
    {
        title: 'Profile',
        icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/profile',
    },
    {
        title: 'Settings',
        icon: <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: '/settings',
    },
];

export default function Dashboard3() {
    const { role = 'employee' } = useSelector((state: any) => state.auth?.user || {});
    const [active, setActive] = useState<Module | null>(null);
    const id = useId();

    const modules: Module[] = [
        {
            title: 'General Ledger',
            description: 'Chart of accounts & journals',
            icon: <FileText className="w-8 h-8" />,
            path: '/modules/gl',
            favorite: true,
            color: 'bg-blue-500',
            roles: ['admin', 'sales_manager', 'employee'],
        },
        {
            title: 'Account Receivables',
            description: 'Customer invoices & receipts',
            icon: <DollarSign className="w-8 h-8" />,
            path: '/modules/ar',
            favorite: true,
            color: 'bg-green-500',
            roles: ['admin', 'sales_manager'],
        },
        {
            title: 'Account Payables',
            description: 'Vendor bills & payments',
            icon: <ShoppingCart className="w-8 h-8" />,
            path: '/modules/ap',
            favorite: true,
            color: 'bg-purple-500',
            roles: ['admin'],
        },
        {
            title: 'Cash Management',
            description: 'Bank reconciliation & cash flow',
            icon: <DollarSign className="w-8 h-8" />,
            path: '/modules/cash',
            favorite: false,
            color: 'bg-yellow-500',
            roles: ['admin'],
        },
        {
            title: 'Sales',
            description: 'Sales orders & delivery',
            icon: <FileText className="w-8 h-8" />,
            path: '/modules/sales',
            favorite: true,
            color: 'bg-pink-500',
            roles: ['admin', 'sales_manager'],
        },
        {
            title: 'Purchase',
            description: 'Purchase orders & receipts',
            icon: <ShoppingCart className="w-8 h-8" />,
            path: '/modules/purchase',
            favorite: false,
            color: 'bg-indigo-500',
            roles: ['admin'],
        },
        {
            title: 'Inventory',
            description: 'Stock control & movements',
            icon: <Package className="w-8 h-8" />,
            path: '/modules/inventory',
            favorite: true,
            color: 'bg-red-500',
            roles: ['admin', 'employee'],
        },
        {
            title: 'Fixed Assets',
            description: 'Asset register & depreciation',
            icon: <Factory className="w-8 h-8" />,
            path: '/modules/assets',
            favorite: false,
            color: 'bg-teal-500',
            roles: ['admin'],
        },
        {
            title: 'Project Costing',
            description: 'Job costing & profitability',
            icon: <BarChart3 className="w-8 h-8" />,
            path: '/modules/projects',
            favorite: false,
            color: 'bg-orange-500',
            roles: ['admin'],
        },
        {
            title: 'Human Resources',
            description: 'Employee records, payroll & leave',
            icon: <Users className="w-8 h-8" />,
            path: '/modules/hr',
            favorite: true,
            color: 'bg-cyan-500',
            roles: ['admin', 'hr_manager'],
        },
        {
            title: 'System Admin',
            description: 'Users, roles, permissions & audit logs',
            icon: <Settings className="w-8 h-8" />,
            path: '/admin',
            favorite: false,
            color: 'bg-gray-600',
            roles: ['admin'],
        },
    ];

    const visibleModules = modules.filter((module) => module.roles.includes(role as UserRole));

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
        if (active) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [active]);

    return (
        <BaseLayout title="" description="">
            <div className="p-6 pt-12 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {visibleModules.map((module) => (
                            <motion.div
                                layoutId={`card-${module.title}-${id}`}
                                key={module.title}
                                onClick={() => setActive(module)}
                                className="group relative cursor-pointer"
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                                    <div
                                        className={`w-20 h-20 ${module.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                                    >
                                        {module.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground">
                                        {module.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-sm">
                                        {module.description}
                                    </p>
                                    {module.favorite && (
                                        <Star className="absolute top-4 right-4 w-6 h-6 text-yellow-500 fill-current" />
                                    )}
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
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                                onClick={() => setActive(null)}
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                                <motion.div
                                    layoutId={`card-${active.title}-${id}`}
                                    className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl overflow-hidden"
                                >
                                    <div
                                        className={`h-64 ${active.color} flex items-center justify-center`}
                                    >
                                        <div className="scale-150 text-white opacity-90">
                                            {active.icon}
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-3xl font-bold text-foreground">
                                                    {active.title}
                                                </h3>
                                                <p className="text-lg text-muted-foreground mt-2">
                                                    {active.description}
                                                </p>
                                            </div>
                                            {active.favorite && (
                                                <Star className="w-10 h-10 text-yellow-500 fill-current" />
                                            )}
                                        </div>

                                        <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                This module is available to your role:{' '}
                                                <span className="font-semibold capitalize">
                                                    {role}
                                                </span>
                                            </p>
                                            <p className="text-sm">
                                                Last accessed:{' '}
                                                <span className="font-medium">Today, 3:42 PM</span>
                                            </p>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Button asChild size="lg" className="flex-1">
                                                <Link to={active.path}>Open {active.title}</Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                onClick={() => setActive(null)}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>

                <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <FloatingDock items={dockItems} />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}
