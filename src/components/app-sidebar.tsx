'use client';

import * as React from 'react';
import {
    LayoutDashboard,
    FileText,
    DollarSign,
    CreditCard,
    Wallet,
    ShoppingCart,
    Package,
    Building2,
    Briefcase,
    Shield,
    Settings,
    LayoutPanelLeft,
    LucideLayoutPanelTop,
    Mail,
    CheckSquare,
    MessageCircle,
    Calendar,
    Users,
    LayoutTemplate,
    AlertTriangle,
    HelpCircle,
    LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '@/components/logo';
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

const demoNavGroups = [
    {
        label: 'Dashboards',
        items: [
            { title: 'Dashboard 1', url: '/dashboard', icon: LayoutDashboard },
            { title: 'Dashboard 2', url: '/dashboard-2', icon: LayoutPanelLeft },
            { title: 'Dashboard 3', url: '/dashboard-3', icon: LucideLayoutPanelTop },
        ],
    },
    {
        label: 'Apps',
        items: [
            { title: 'Mail', url: '/mail', icon: Mail },
            { title: 'Tasks', url: '/tasks', icon: CheckSquare },
            { title: 'Chat', url: '/chat', icon: MessageCircle },
            { title: 'Calendar', url: '/calendar', icon: Calendar },
            { title: 'Users', url: '/users', icon: Users },
        ],
    },
    {
        label: 'Pages',
        items: [
            { title: 'Landing', url: '/landing', target: '_blank', icon: LayoutTemplate },
            {
                title: 'Auth Pages',
                url: '#',
                icon: Shield,
                items: [
                    /* ...your existing */
                ],
            },
            {
                title: 'Errors',
                url: '#',
                icon: AlertTriangle,
                items: [
                    /* ...your existing */
                ],
            },
            {
                title: 'Settings',
                url: '#',
                icon: Settings,
                items: [
                    /* ...your existing */
                ],
            },
            { title: 'FAQs', url: '/faqs', icon: HelpCircle },
            { title: 'Pricing', url: '/pricing', icon: CreditCard },
        ],
    },
];

const getErpNavGroups = (role: string) => {
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

    return [
        { label: 'Finance', items: finance },
        { label: 'Operations', items: operations },
        ...(admin.length ? [{ label: 'Administration', items: admin }] : []),
    ];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state: any) => state.auth || {});
    const role = user?.role || 'employee';

    const navGroups = isAuthenticated ? getErpNavGroups(role) : demoNavGroups;

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
                            <Link to={isAuthenticated ? '/dashboard' : '/'}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Logo size={24} />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {isAuthenticated ? 'Fine Foods ERP' : 'ShadcnStore'}
                                    </span>
                                    <span className="truncate text-xs">
                                        {isAuthenticated
                                            ? 'Advanced Bakery Solutions'
                                            : 'Admin Dashboard'}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {navGroups.map((group) => (
                    <NavMain key={group.label} label={group.label} items={group.items} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="gap-2 cursor-pointer"
                >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
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
