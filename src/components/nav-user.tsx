'use client';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect, useRef, useState } from 'react';
import { CreditCard, LogOut, BellDot, CircleUser, Building2, EllipsisVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { RootState } from '@/app/store';

export function NavUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user);
    const [status, setStatus] = useState<'online' | 'idle'>('online');
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    if (!user) return null;

    const displayName = user.username || 'User';
    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const companyInfo = `${user.companyName || 'Unknown Company'} • ${user.divisionName || 'N/A'}`;

    const resetIdleTimer = () => {
        setStatus('online');
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = setTimeout(() => setStatus('idle'), 10_000);
    };

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
        events.forEach((event) => window.addEventListener(event, resetIdleTimer));
        resetIdleTimer();
        return () => {
            events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/auth/sign-in-2');
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                        >
                            <div className="relative">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarFallback className="rounded-lg bg-linear-to-br from-orange-500 to-amber-600 text-white text-xs font-bold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`absolute bottom-0 right-0 h-3 w-3.5 rounded-full ring-4 ring-sidebar transition-colors ${
                                        status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                                    }`}
                                    title={status === 'online' ? 'Online' : 'Away'}
                                >
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                </div>
                            </div>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{displayName}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                            <EllipsisVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-64 rounded-xl"
                        side="top"
                        align="start"
                        sideOffset={8}
                        alignOffset={-52}
                    >
                        <DropdownMenuLabel className="p-0">
                            <div className="flex items-center gap-3 p-3">
                                <Avatar className="h-12 w-12 rounded-lg">
                                    <AvatarFallback className="rounded-lg bg-linear-to-br from-orange-500 to-amber-600 text-white font-bold text-lg">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1">
                                    <p className="text-sm font-semibold">{displayName}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                    <div className="flex items-center gap-1.5 mt-1 text-xs text-orange-600 dark:text-orange-400">
                                        <Building2 className="h-3 w-3" />
                                        <span className="font-medium">{companyInfo}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div
                                            className={`h-2 w-2 rounded-full animate-pulse ${
                                                status === 'online'
                                                    ? 'bg-emerald-500'
                                                    : 'bg-amber-500'
                                            }`}
                                        />
                                        <span className="text-xs font-medium capitalize text-muted-foreground">
                                            {status === 'online' ? 'Active now' : 'Away'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link
                                    to="/settings/user"
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <CircleUser className="h-4 w-4" />
                                    <span>Profile Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    to="/settings/billing"
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <CreditCard className="h-4 w-4" />
                                    <span>Billing</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    to="/settings/notifications"
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <BellDot className="h-4 w-4" />
                                    <span>Notifications</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950/50"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
