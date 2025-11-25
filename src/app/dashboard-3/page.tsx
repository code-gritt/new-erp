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
            <div className="p-8 pt-12 min-h-screen bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {visibleModules.map((module) => (
                            <motion.div
                                layoutId={`card-${module.title}-${id}`}
                                key={module.title}
                                onClick={() => setActive(module)}
                                className="group cursor-pointer select-none"
                                whileHover={{ y: -8, scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <div className="flex flex-col items-center space-y-4 p-6 rounded-3xl hover:bg-accent/5 transition-all duration-300">
                                    <div
                                        className={`w-16 h-16 ${module.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-shadow`}
                                    >
                                        {module.icon}
                                    </div>

                                    <div className="text-center space-y-1">
                                        <h3 className="font-medium text-foreground text-sm tracking-tight">
                                            {module.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground opacity-80">
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
                                className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
                                onClick={() => setActive(null)}
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                                <motion.div
                                    layoutId={`card-${active.title}-${id}`}
                                    className="max-w-lg w-full bg-background/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
                                >
                                    <div
                                        className={`h-48 ${active.color} relative overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                                        <div className="flex items-center justify-center h-full">
                                            <div className="scale-125 text-white/90">
                                                {active.icon}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-foreground">
                                                {active.title}
                                            </h3>
                                            <p className="text-muted-foreground mt-1">
                                                {active.description}
                                            </p>
                                        </div>

                                        <div className="text-sm space-y-2 text-muted-foreground">
                                            <p>
                                                Role access:{' '}
                                                <span className="font-medium text-foreground capitalize">
                                                    {role.replace('_', ' ')}
                                                </span>
                                            </p>
                                            <p>
                                                Last opened:{' '}
                                                <span className="font-medium">
                                                    Today at 3:42 PM
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <Button asChild size="lg" className="flex-1 rounded-xl">
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
