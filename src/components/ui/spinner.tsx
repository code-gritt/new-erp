import { LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FullScreenLoaderProps {
    message?: string;
}

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn('size-10 animate-spin', className)}
            {...props}
        />
    );
}

export function SpinnerCustom() {
    return (
        <div className="flex items-center gap-4">
            <Spinner />
        </div>
    );
}

export function FullScreenLoader({ message = 'Loading...' }: FullScreenLoaderProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
                <SpinnerCustom />
                <p className="text-lg font-medium animate-pulse">{message}</p>
            </div>
        </div>
    );
}
