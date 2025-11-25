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
import React from 'react';
import { cn } from '@/lib/utils';

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

interface FocusModuleCardProps {
    module: Module;
    index: number;
    hovered: number | null;
    setHovered: (index: number | null) => void;
    onClick: () => void;
}

const FocusModuleCard = React.memo(
    ({
        module,
        index,
        hovered,
        setHovered,
        onClick,
        cardClassName = '',
    }: Omit<FocusModuleCardProps, 'layoutId'> & { cardClassName?: string }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={onClick}
            className={cn(
                'group relative cursor-pointer select-none transition-all duration-500 ease-out',
                hovered !== null && hovered !== index && 'blur-[2px] scale-[0.97] opacity-80'
            )}
        >
            <div
                className={cn(
                    'flex flex-col justify-between items-center p-6 rounded-3xl bg-background/70 backdrop-blur-xl border-white/8 hover:bg-background/90 hover:border-white/20 transition-all duration-300 h-full',
                    cardClassName
                )}
            >
                <div
                    className={`w-16 h-16 ${module.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                >
                    {module.icon}
                </div>

                <div className="text-center space-y-1.5 mt-4 flex-1 flex flex-col justify-end">
                    <h3 className="font-medium text-foreground text-sm tracking-tight">
                        {module.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 leading-tight px-2">
                        {module.description}
                    </p>
                </div>
            </div>
        </div>
    )
);

FocusModuleCard.displayName = 'FocusModuleCard';

const FocusCardsWrapper = ({
    cards,
    setActive,
    cardClassName,
}: {
    cards: Module[];
    setActive: React.Dispatch<React.SetStateAction<Module | null>>;
    cardClassName?: string;
}) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {cards.map((module, index) => (
                <FocusModuleCard
                    key={module.title}
                    module={module}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                    onClick={() => setActive(module)}
                    cardClassName={cardClassName}
                />
            ))}
        </div>
    );
};

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
                    <FocusCardsWrapper
                        cards={visibleModules}
                        setActive={setActive}
                        cardClassName="border border-gray-200/20 shadow-sm"
                    />
                </div>

                <AnimatePresence>
                    {active && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.32 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                                onClick={() => setActive(null)}
                            />

                            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.94, y: 24 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: 24 }}
                                    transition={{
                                        type: 'spring',
                                        damping: 32,
                                        stiffness: 380,
                                        mass: 0.9,
                                    }}
                                    className="pointer-events-auto max-w-lg w-full"
                                >
                                    <div
                                        className="bg-background/96 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden
                                    border border-white/20 
                                    ring-1 ring-white/10 
                                    supports-backdrop-filter:bg-background/90"
                                    >
                                        <div
                                            className={`h-48 ${active.color} relative overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-linear-to-br from-white/25 to-transparent opacity-70" />
                                            <div className="absolute inset-0 bg-black/5" />
                                            <div className="flex h-full items-center justify-center">
                                                <div className="scale-[2.3] text-white drop-shadow-md">
                                                    {active.icon}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-7">
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-semibold text-foreground tracking-tight">
                                                    {active.title}
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {active.description}
                                                </p>
                                            </div>

                                            <div className="text-sm space-y-2.5 text-muted-foreground/90">
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

                                            <div className="flex gap-3 pt-3">
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
