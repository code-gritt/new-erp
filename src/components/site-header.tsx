'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CommandSearch } from '@/components/command-search';
import { ModeToggle } from '@/components/mode-toggle';
import { LogOut } from 'lucide-react';

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
            <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex w-full items-center px-3 sm:px-4 lg:px-6">
                    <SidebarTrigger className="-ml-1 size-8" />

                    <Separator orientation="vertical" className="mx-3 h-6" />

                    {/* Welcome Message — now responsive & safe */}
                    <div className="hidden sm:block flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                            Welcome back,{' '}
                            <span className="font-bold text-primary">{firstName}!</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                            Managing <span className="font-medium">{company}</span> • {department}
                        </div>
                    </div>

                    <div className="sm:hidden flex-1 min-w-0 pl-2">
                        <div className="text-sm font-semibold truncate">
                            Hi, <span className="text-primary">{firstName}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">Fine Foods ERP</div>
                    </div>

                    <div className="flex items-center gap-1 ml-auto">
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

                        <Button variant="ghost" size="sm" className="gap-2">
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>

                        <ModeToggle />
                    </div>
                </div>
            </header>

            <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}
