import { cn } from '@/lib/utils';
import { IconLayoutNavbarCollapse } from '@tabler/icons-react';
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: readonly { title: string; icon: React.ReactNode; href: string }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: readonly { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn('relative block md:hidden', className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <a
                                    href={item.href}
                                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg"
                                >
                                    <div className="h-6 w-6 text-foreground/80">{item.icon}</div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 shadow-lg hover:bg-primary/20 transition-all"
            >
                <IconLayoutNavbarCollapse className="h-6 w-6 text-primary" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: readonly { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {
    let mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                'mx-auto hidden h-16 items-end gap-4 rounded-3xl bg-background/70 backdrop-blur-2xl border border-border/50 px-6 pb-2 shadow-2xl md:flex',
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
}: {
    mouseX: MotionValue<number>;
    title: string;
    icon: React.ReactNode;
    href: string;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [48, 88, 48]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [48, 88, 48]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [28, 48, 28]);
    let heightTransformIcon = useTransform(distance, [-150, 0, 150], [28, 48, 28]);

    let width = useSpring(widthTransform, { stiffness: 150, damping: 15 });
    let height = useSpring(heightTransform, { stiffness: 150, damping: 15 });
    let widthIcon = useSpring(widthTransformIcon, { stiffness: 150, damping: 15 });
    let heightIcon = useSpring(heightTransformIcon, { stiffness: 150, damping: 15 });

    const [hovered, setHovered] = useState(false);

    return (
        <a href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative flex aspect-square items-center justify-center rounded-3xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: '-50%' }}
                            animate={{ opacity: 1, y: 0, x: '-50%' }}
                            exit={{ opacity: 0, y: 2, x: '-50%' }}
                            className="absolute -top-10 left-1/2 w-fit -translate-x-1/2 rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 px-3 py-1.5 text-sm font-medium text-foreground shadow-xl"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center text-foreground/80"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </a>
    );
}
