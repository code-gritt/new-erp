import { BaseLayout } from '@/components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useId, useRef, useEffect } from 'react';
import {
    FileText,
    Package,
    DollarSign,
    ShoppingCart,
    Factory,
    BarChart3,
    Settings,
    Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard3 = () => {
    const {
        user,
        company = 'Acme Corp',
        department = 'Finance',
    } = useSelector((state: any) => state.auth || {});
    const firstName = user?.name?.split(' ')[0] || 'User';
    const role = user?.role || 'employee';
    const [active, setActive] = useState<any>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    const modules = [
        {
            title: 'General Ledger',
            description: 'Chart of accounts & journals',
            icon: <FileText className="w-8 h-8" />,
            path: '/modules/gl',
            favorite: true,
            color: 'bg-blue-500',
        },
        {
            title: 'Account Receivables',
            description: 'Customer invoices & receipts',
            icon: <DollarSign className="w-8 h-8" />,
            path: '/modules/ar',
            favorite: true,
            color: 'bg-green-500',
        },
        {
            title: 'Account Payables',
            description: 'Vendor bills & payments',
            icon: <ShoppingCart className="w-8 h-8" />,
            path: '/modules/ap',
            favorite: true,
            color: 'bg-purple-500',
        },
        {
            title: 'Cash Management',
            description: 'Bank reconciliation & cash flow',
            icon: <DollarSign className="w-8 h-8" />,
            path: '/modules/cash',
            favorite: false,
            color: 'bg-yellow-500',
        },
        {
            title: 'Sales',
            description: 'Sales orders & delivery',
            icon: <FileText className="w-8 h-8" />,
            path: '/modules/sales',
            favorite: true,
            color: 'bg-pink-500',
        },
        {
            title: 'Purchase',
            description: 'Purchase orders & receipts',
            icon: <ShoppingCart className="w-8 h-8" />,
            path: '/modules/purchase',
            favorite: false,
            color: 'bg-indigo-500',
        },
        {
            title: 'Inventory',
            description: 'Stock control & movements',
            icon: <Package className="w-8 h-8" />,
            path: '/modules/inventory',
            favorite: true,
            color: 'bg-red-500',
        },
        {
            title: 'Fixed Assets',
            description: 'Asset register & depreciation',
            icon: <Factory className="w-8 h-8" />,
            path: '/modules/assets',
            favorite: false,
            color: 'bg-teal-500',
        },
        {
            title: 'Project Costing',
            description: 'Job costing & profitability',
            icon: <BarChart3 className="w-8 h-8" />,
            path: '/modules/projects',
            favorite: false,
            color: 'bg-orange-500',
        },
        ...(role === 'admin'
            ? [
                  {
                      title: 'System Admin',
                      description: 'Users, roles & system settings',
                      icon: <Settings className="w-8 h-8" />,
                      path: '/admin',
                      favorite: false,
                      color: 'bg-gray-600',
                  },
              ]
            : []),
    ];

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
        if (active) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    return (
        <BaseLayout title="Dashboard3" description="Welcome to your admin dashboard">
            <div className="p-6 space-y-12">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome back, {firstName}!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Managing <span className="font-semibold">{company}</span> • {department}
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {modules.map((card) => (
                            <motion.div
                                layoutId={`card-${card.title}-${id}`}
                                key={card.title}
                                onClick={() => setActive(card)}
                                className="group relative cursor-pointer"
                            >
                                <motion.div className="p-8 rounded-2xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                                    <div
                                        className={`w-20 h-20 ${card.color} rounded-2xl flex items-center justify-center text-white mb-6`}
                                    >
                                        {card.icon}
                                    </div>
                                    <motion.h3
                                        layoutId={`title-${card.title}-${id}`}
                                        className="text-xl font-semibold text-foreground"
                                    >
                                        {card.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`desc-${card.title}-${id}`}
                                        className="text-muted-foreground mt-2"
                                    >
                                        {card.description}
                                    </motion.p>
                                    {card.favorite && (
                                        <Star className="absolute top-4 right-4 w-5 h-5 text-yellow-500 fill-current" />
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </ul>
                </div>

                <AnimatePresence>
                    {active && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-40"
                                onClick={() => setActive(null)}
                            />
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <motion.div
                                    layoutId={`card-${active.title}-${id}`}
                                    ref={ref}
                                    className="max-w-2xl w-full bg-card rounded-3xl shadow-2xl overflow-hidden"
                                >
                                    <motion.div
                                        className={`h-64 ${active.color} flex items-center justify-center text-white`}
                                    >
                                        {active.icon}
                                    </motion.div>

                                    <div className="p-8 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <motion.h3
                                                    layoutId={`title-${active.title}-${id}`}
                                                    className="text-3xl font-bold"
                                                >
                                                    {active.title}
                                                </motion.h3>
                                                <motion.p
                                                    layoutId={`desc-${active.title}-${id}`}
                                                    className="text-lg text-muted-foreground mt-2"
                                                >
                                                    {active.description}
                                                </motion.p>
                                            </div>
                                            {active.favorite && (
                                                <Star className="w-8 h-8 text-yellow-500 fill-current" />
                                            )}
                                        </div>

                                        <div className="space-y-4 text-muted-foreground">
                                            <p>
                                                This module gives you full access to{' '}
                                                <strong>{active.title}</strong> features.
                                                {role === 'admin' && active.title === 'System Admin'
                                                    ? ' You have elevated privileges to manage users, roles, and system settings.'
                                                    : ' Navigate through the sidebar or use the favorites section for quick access.'}
                                            </p>
                                            <p className="text-sm">
                                                Last accessed:{' '}
                                                <span className="font-medium">
                                                    Today at 2:34 PM
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Button asChild size="lg" className="flex-1">
                                                <Link to={active.path}>Open Module</Link>
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
            </div>
        </BaseLayout>
    );
};

export default Dashboard3;
