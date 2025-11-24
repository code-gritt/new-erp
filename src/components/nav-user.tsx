'use client';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { RootState } from '@/app/store';

export function NavUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isMobile } = useSidebar();

    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return null;

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

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
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg bg-orange-500 text-white text-xs font-medium">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>

                            <EllipsisVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-64 rounded-xl"
                        side={isMobile ? 'top' : 'right'}
                        align="end"
                        sideOffset={8}
                    >
                        <DropdownMenuLabel className="p-0">
                            <div className="flex items-center gap-3 p-3">
                                <Avatar className="h-12 w-12 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg bg-linear-to-br from-orange-500 to-amber-600 text-white font-bold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1">
                                    <p className="text-sm font-semibold leading-tight">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                    <div className="flex items-center gap-1.5 mt-1 text-xs text-orange-600 dark:text-orange-400">
                                        <Building2 className="h-3 w-3" />
                                        <span className="font-medium">
                                            {user.company} • {user.department}
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
                            className="flex items-center gap-3 text-red-600 dark:text-red-400 font-medium cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/50"
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
