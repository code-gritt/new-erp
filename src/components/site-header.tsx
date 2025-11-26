'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CommandSearch } from '@/components/command-search';
import { ModeToggle } from '@/components/mode-toggle';
import { NavUser } from './nav-user';
import { BellIcon, Badge } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import type { RootState } from '@/app/store';

export function SiteHeader() {
    const [searchOpen, setSearchOpen] = React.useState(false);

    const user = useSelector((state: RootState) => state.auth.user);
    const companyName = user?.companyName;
    const divisionName = user?.divisionName;

    const displayCompany = companyName || 'Loading...';
    const displayDivision = divisionName || 'Loading...';

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const NotificationMenu = ({ notificationCount = 3 }: { notificationCount?: number }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <BellIcon className="h-4 w-4" />
                    {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs font-bold">
                            {notificationCount > 9 ? '9+' : notificationCount}
                        </Badge>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <p className="text-sm font-medium">New message received</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <p className="text-sm font-medium">System update available</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <p className="text-sm font-medium">Weekly report ready</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/settings/notifications" className="w-full">
                        View all notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="flex w-full items-center gap-4 px-3 sm:px-4 lg:px-6">
                    <SidebarTrigger className="-ml-1 size-8" />

                    <div className="flex flex-1 items-center gap-3 min-w-0">
                        <div className="hidden sm:block flex-1 min-w-0">
                            <div className="text-xs font-medium text-muted-foreground truncate">
                                {displayCompany} • {displayDivision}
                            </div>
                            {user?.userId && (
                                <div className="text-xs text-muted-foreground/80 truncate mt-0.5">
                                    Logged in as{' '}
                                    <span className="font-semibold">{user.userId}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="text-xs">
                                User Logs
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs font-bold">
                                {user?.userId || 'USER'}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                                Approve
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                                My Pockets
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                                Dashboard
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                                Help?
                            </Button>
                        </div>

                        <NotificationMenu notificationCount={3} />
                        <ModeToggle />
                        <NavUser />
                    </div>
                </div>
            </header>

            <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}
