'use client';

import * as React from 'react';
import {
    FileText,
    DollarSign,
    CreditCard,
    Wallet,
    ShoppingCart,
    Package,
    Building2,
    Briefcase,
    Shield,
    CheckSquare,
    MessageCircle,
    LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { logout } from '@/features/auth/authSlice';

const PRIORITY_APPS = [
    {
        title: 'Tasks',
        url: '/tasks',
        icon: CheckSquare,
        isPriority: true,
    },
    {
        title: 'Chat',
        url: '/chat',
        icon: MessageCircle,
        isPriority: true,
    },
];

const getErpModules = (role: string) => {
    const finance = [
        { title: 'General Ledger', url: '/modules/gl', icon: FileText },
        { title: 'Account Receivables', url: '/modules/ar', icon: DollarSign },
        { title: 'Account Payables', url: '/modules/ap', icon: CreditCard },
        { title: 'Cash Management', url: '/modules/cash', icon: Wallet },
    ];

    const operations = [
        { title: 'Sales', url: '/modules/sales', icon: ShoppingCart },
        { title: 'Purchase', url: '/modules/purchase', icon: Package },
        { title: 'Inventory', url: '/modules/inventory', icon: Package },
        { title: 'Fixed Assets', url: '/modules/assets', icon: Building2 },
        { title: 'Project Costing', url: '/modules/projects', icon: Briefcase },
    ];

    const admin = role === 'admin' ? [{ title: 'System Admin', url: '/admin', icon: Shield }] : [];

    return [...finance, ...operations, ...admin];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state: any) => state.auth || {});
    const role = user?.role || 'employee';

    const modules = isAuthenticated ? getErpModules(role) : [];

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/auth/sign-in-2');
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to={isAuthenticated ? '/dashboard-3' : '/'}>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/eBiz_ms-logo.svg"
                                        alt="Logo"
                                        className="h-10 w-auto dark:brightness-0 dark:invert"
                                    />
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-6">
                {/* PRIORITY APPS – Always at the top, highlighted */}
                {PRIORITY_APPS.length > 0 && (
                    <div className="px-3">
                        <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Quick Access
                        </div>
                        {PRIORITY_APPS.map((item) => (
                            <SidebarMenu key={item.url}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        className="w-full justify-start font-medium text-foreground hover:bg-accent/80 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                                    >
                                        <Link to={item.url}>
                                            <item.icon className="mr-3 h-5 w-5 text-primary" />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        ))}
                    </div>
                )}

                {/* ALL MODULES – Single clean group */}
                {modules.length > 0 && (
                    <NavMain
                        label="Modules"
                        items={modules.map((mod) => ({
                            title: mod.title,
                            url: mod.url,
                            icon: mod.icon,
                        }))}
                    />
                )}
            </SidebarContent>

            <SidebarFooter>
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}

// 'use client';

// import * as React from 'react';
// import {
//     LayoutPanelLeft,
//     LayoutDashboard,
//     Mail,
//     CheckSquare,
//     MessageCircle,
//     Calendar,
//     Shield,
//     AlertTriangle,
//     Settings,
//     HelpCircle,
//     CreditCard,
//     LayoutTemplate,
//     Users,
//     LucideLayoutPanelTop,
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Logo } from '@/components/logo';
// import { SidebarNotification } from '@/components/sidebar-notification';

// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from '@/components/ui/sidebar';

// const data = {
//     user: {
//         name: 'ShadcnStore',
//         email: 'store@example.com',
//         avatar: '',
//     },
//     navGroups: [
//         {
//             label: 'Dashboards',
//             items: [
//                 {
//                     title: 'Dashboard 1',
//                     url: '/dashboard',
//                     icon: LayoutDashboard,
//                 },
//                 {
//                     title: 'Dashboard 2',
//                     url: '/dashboard-2',
//                     icon: LayoutPanelLeft,
//                 },
//                 {
//                     title: 'Dashboard 3',
//                     url: '/dashboard-3',
//                     icon: LucideLayoutPanelTop,
//                 },
//             ],
//         },
//         {
//             label: 'Apps',
//             items: [
//                 {
//                     title: 'Mail',
//                     url: '/mail',
//                     icon: Mail,
//                 },
//                 {
//                     title: 'Tasks',
//                     url: '/tasks',
//                     icon: CheckSquare,
//                 },
//                 {
//                     title: 'Chat',
//                     url: '/chat',
//                     icon: MessageCircle,
//                 },
//                 {
//                     title: 'Calendar',
//                     url: '/calendar',
//                     icon: Calendar,
//                 },
//                 {
//                     title: 'Users',
//                     url: '/users',
//                     icon: Users,
//                 },
//             ],
//         },
//         {
//             label: 'Pages',
//             items: [
//                 {
//                     title: 'Landing',
//                     url: '/landing',
//                     target: '_blank',
//                     icon: LayoutTemplate,
//                 },
//                 {
//                     title: 'Auth Pages',
//                     url: '#',
//                     icon: Shield,
//                     items: [
//                         {
//                             title: 'Sign In 1',
//                             url: '/auth/sign-in',
//                         },
//                         {
//                             title: 'Sign In 2',
//                             url: '/auth/sign-in-2',
//                         },
//                         {
//                             title: 'Sign In 3',
//                             url: '/auth/sign-in-3',
//                         },
//                         {
//                             title: 'Sign Up 1',
//                             url: '/auth/sign-up',
//                         },
//                         {
//                             title: 'Sign Up 2',
//                             url: '/auth/sign-up-2',
//                         },
//                         {
//                             title: 'Sign Up 3',
//                             url: '/auth/sign-up-3',
//                         },
//                         {
//                             title: 'Forgot Password 1',
//                             url: '/auth/forgot-password',
//                         },
//                         {
//                             title: 'Forgot Password 2',
//                             url: '/auth/forgot-password-2',
//                         },
//                         {
//                             title: 'Forgot Password 3',
//                             url: '/auth/forgot-password-3',
//                         },
//                     ],
//                 },
//                 {
//                     title: 'Errors',
//                     url: '#',
//                     icon: AlertTriangle,
//                     items: [
//                         {
//                             title: 'Unauthorized',
//                             url: '/errors/unauthorized',
//                         },
//                         {
//                             title: 'Forbidden',
//                             url: '/errors/forbidden',
//                         },
//                         {
//                             title: 'Not Found',
//                             url: '/errors/not-found',
//                         },
//                         {
//                             title: 'Internal Server Error',
//                             url: '/errors/internal-server-error',
//                         },
//                         {
//                             title: 'Under Maintenance',
//                             url: '/errors/under-maintenance',
//                         },
//                     ],
//                 },
//                 {
//                     title: 'Settings',
//                     url: '#',
//                     icon: Settings,
//                     items: [
//                         {
//                             title: 'User Settings',
//                             url: '/settings/user',
//                         },
//                         {
//                             title: 'Account Settings',
//                             url: '/settings/account',
//                         },
//                         {
//                             title: 'Plans & Billing',
//                             url: '/settings/billing',
//                         },
//                         {
//                             title: 'Appearance',
//                             url: '/settings/appearance',
//                         },
//                         {
//                             title: 'Notifications',
//                             url: '/settings/notifications',
//                         },
//                         {
//                             title: 'Connections',
//                             url: '/settings/connections',
//                         },
//                     ],
//                 },
//                 {
//                     title: 'FAQs',
//                     url: '/faqs',
//                     icon: HelpCircle,
//                 },
//                 {
//                     title: 'Pricing',
//                     url: '/pricing',
//                     icon: CreditCard,
//                 },
//             ],
//         },
//     ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//     return (
//         <Sidebar {...props}>
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link to="/dashboard">
//                                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
//                                     <Logo size={24} className="text-current" />
//                                 </div>
//                                 <div className="grid flex-1 text-left text-sm leading-tight">
//                                     <span className="truncate font-medium">ShadcnStore</span>
//                                     <span className="truncate text-xs">Admin Dashboard</span>
//                                 </div>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>
//             <SidebarContent>
//                 {data.navGroups.map((group) => (
//                     <NavMain key={group.label} label={group.label} items={group.items} />
//                 ))}
//             </SidebarContent>
//             <SidebarFooter>
//                 <SidebarNotification />
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }
