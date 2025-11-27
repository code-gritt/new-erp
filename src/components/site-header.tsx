'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CommandSearch } from '@/components/command-search';
import { ModeToggle } from '@/components/mode-toggle';
import { NavUser } from './nav-user';
import {
    Bell,
    Sparkles,
    ArrowRight,
    HelpCircle,
    FileText,
    CheckSquare,
    Wallet,
    LayoutDashboard,
} from 'lucide-react';
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
    const companyName = user?.companyName || 'Company';
    const divisionName = user?.divisionName || 'Division';

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

    const NotificationMenu = ({ count = 3 }: { count?: number }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-accent/80 transition-all"
                >
                    <Bell className="h-4 w-4" />
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {count > 9 ? '9+' : count}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                    <DropdownMenuLabel className="text-base font-bold">
                        Notifications
                    </DropdownMenuLabel>
                    <Button variant="ghost" size="sm" className="text-xs">
                        Mark all as read
                    </Button>
                </div>
                {['New approval request', 'Weekly report ready', 'System update complete'].map(
                    (item, i) => (
                        <DropdownMenuItem
                            key={i}
                            className="p-4 gap-3 hover:bg-accent/50 cursor-pointer"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <div className="flex-1">
                                <p className="font-medium text-sm">{item}</p>
                                <p className="text-xs text-muted-foreground">Just now</p>
                            </div>
                        </DropdownMenuItem>
                    )
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/notifications" className="justify-center font-medium text-primary">
                        View all notifications <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const QuickActions = () => (
        <div className="hidden lg:flex items-center gap-1 bg-accent/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50">
            {[
                { icon: FileText, label: 'User Logs' },
                { icon: CheckSquare, label: 'Approve' },
                { icon: Wallet, label: 'My Pockets' },
                { icon: LayoutDashboard, label: 'Dashboard' },
                { icon: HelpCircle, label: 'Help' },
            ].map((item, i) => (
                <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 gap-1.5 hover:bg-white/20 dark:hover:bg-black/20 transition-all cursor-pointer"
                >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                </Button>
            ))}
        </div>
    );

    return (
        <>
            <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 rounded-lg">
                <div className="flex w-full items-center justify-between px-4 lg:px-6">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="size-8 text-primary hover:scale-110 transition-transform" />

                        <div className="hidden sm:flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="text-sm font-bold text-foreground tracking-tight">
                                        {companyName} • {divisionName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <QuickActions />

                    <div className="flex items-center gap-2">
                        <NotificationMenu count={3} />
                        <ModeToggle />
                        <NavUser />
                    </div>
                </div>
            </header>

            <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}
