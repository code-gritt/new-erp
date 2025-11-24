'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CommandSearch } from '@/components/command-search';
import { ModeToggle } from '@/components/mode-toggle';

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
            <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
                <div className="flex w-full items-center gap-1 px-4 py-3 lg:gap-2 lg:px-6">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />

                    {/* Welcome Message — exactly like Fine Foods */}
                    <div className="flex-1">
                        <div className="text-sm font-medium">
                            Welcome back,{' '}
                            <span className="font-bold text-primary">{firstName}!</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Managing <span className="font-medium">{company}</span> • {department}
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-2">
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
                        <Button variant="ghost" size="sm" className="font-medium">
                            Logout
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
            </header>
            <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}
