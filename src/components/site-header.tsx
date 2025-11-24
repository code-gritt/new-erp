'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CommandSearch, SearchTrigger } from '@/components/command-search';
import { ModeToggle } from '@/components/mode-toggle';
import { NavUser } from './nav-user';

export function SiteHeader() {
    const [searchOpen, setSearchOpen] = React.useState(false);
    const {
        user,
        company = 'FINE FOODS HEAD OFFICE',
        department = 'ADVANCED BAKERY SOLUTIONS',
    } = useSelector((state: any) => state.auth || {});
    const firstName = user?.name?.split(' ')[0] || 'User';

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

    return (
        <>
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="flex w-full items-center gap-4 px-3 sm:px-4 lg:px-6">
                    <SidebarTrigger className="-ml-1 size-8" />

                    <div className="flex flex-1 items-center gap-3 min-w-0">
                        <div className="hidden sm:block flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                                Welcome back,{' '}
                                <span className="font-bold text-primary">{firstName}!</span>
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                                {company} • {department}
                            </div>
                        </div>

                        <div className="sm:hidden text-sm font-semibold truncate">
                            Hi, <span className="text-primary">{firstName}</span>
                        </div>

                        <div className="hidden sm:block shrink-0">
                            <SearchTrigger onClick={() => setSearchOpen(true)} />
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="hidden lg:flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="text-xs">
                                User Logs
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs font-bold">
                                SUPER
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

                        <ModeToggle />
                        <NavUser />
                    </div>
                </div>
            </header>

            <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}
