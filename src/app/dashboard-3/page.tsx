import { BaseLayout } from '@/components/layouts/base-layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Home,
    FileText,
    Package,
    DollarSign,
    Users,
    ShoppingCart,
    Factory,
    BarChart3,
    Settings,
    Star,
    ChevronRight,
} from 'lucide-react';

const Dashboard3 = () => {
    const {
        user,
        company = 'Acme Corp',
        department = 'Finance',
    } = useSelector((state: any) => state.auth || {});
    const firstName = user?.name?.split(' ')[0] || 'User';
    const role = user?.role || 'employee';

    const modules = [
        {
            name: 'Dashboard',
            icon: <Home className="w-4 h-4" />,
            path: '/dashboard',
            favorite: true,
        },
        {
            name: 'Sales',
            icon: <FileText className="w-4 h-4" />,
            path: '/modules/sales',
            favorite: true,
        },
        {
            name: 'Inventory',
            icon: <Package className="w-4 h-4" />,
            path: '/modules/inventory',
            favorite: true,
        },
        { name: 'Finance', icon: <DollarSign className="w-4 h-4" />, path: '/modules/finance' },
        { name: 'HR & Payroll', icon: <Users className="w-4 h-4" />, path: '/modules/hr' },
        {
            name: 'Procurement',
            icon: <ShoppingCart className="w-4 h-4" />,
            path: '/modules/procurement',
        },
        {
            name: 'Manufacturing',
            icon: <Factory className="w-4 h-4" />,
            path: '/modules/manufacturing',
        },
        { name: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, path: '/modules/analytics' },
        ...(role === 'admin'
            ? [{ name: 'System Admin', icon: <Settings className="w-4 h-4" />, path: '/admin' }]
            : []),
    ];

    const favorites = modules.filter((m) => m.favorite);

    return (
        <BaseLayout title="Dashboard3" description="Welcome to your admin dashboard">
            <div className="p-6 space-y-8">
                {/* Welcome Header */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {firstName}!
                    </h1>
                    <p className="text-muted-foreground">
                        Managing <span className="font-medium">{company}</span> • {department}
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Company
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{company}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Department
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{department}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Role
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold capitalize">
                                {role.replace('_manager', '').replace('_', ' ')}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Favorites
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{favorites.length}</div>
                            <p className="text-xs text-muted-foreground">Quick access modules</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Favorites Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <h2 className="text-xl font-semibold">Your Favorite Modules</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {favorites.map((mod) => (
                            <Button
                                key={mod.name}
                                asChild
                                variant="outline"
                                className="h-24 justify-start text-left font-normal hover:bg-accent hover:text-accent-foreground transition-all"
                            >
                                <Link to={mod.path} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        {mod.icon}
                                        <span className="font-medium">{mod.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* All Modules */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">All Available Modules</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {modules.map((mod) => (
                            <Button
                                key={mod.name}
                                asChild
                                variant="ghost"
                                className="justify-start h-auto py-3 px-4 text-left font-normal hover:bg-accent/50"
                            >
                                <Link to={mod.path} className="flex items-center gap-3 w-full">
                                    {mod.icon}
                                    <span>{mod.name}</span>
                                    {mod.favorite && (
                                        <Star className="w-3.5 h-3.5 ml-auto text-yellow-500 fill-current" />
                                    )}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default Dashboard3;
