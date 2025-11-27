'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOutsideClick } from '@/hooks/use-outside-click';
import type { ModuleDetailModalProps } from '@/types/dashboard';
import { X } from 'lucide-react';
import React, { useRef } from 'react';

export function ModuleDetailModal({ module, onClose }: ModuleDetailModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useOutsideClick(modalRef as React.RefObject<Element>, onClose);

    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!module) return null;

    const handleOpenModule = () => {
        onClose();
        window.location.href = module.path;
    };

    return (
        <AnimatePresence>
            {module && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.92, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 30 }}
                            transition={{
                                type: 'spring',
                                damping: 32,
                                stiffness: 380,
                                mass: 0.9,
                            }}
                            className="relative max-w-lg w-full"
                        >
                            <div className="bg-background/96 backdrop-blur-3xl rounded-3xl shadow-2xl overflow-hidden border border-border/60">
                                <div className={`h-64 ${module.color} relative overflow-hidden`}>
                                    <button
                                        onClick={onClose}
                                        className="absolute top-5 right-5 z-10 rounded-full bg-white/10 backdrop-blur-md p-2 hover:bg-white/20 transition-all"
                                    >
                                        <X className="h-5 w-5 text-white" />
                                    </button>

                                    <div className="flex h-full items-center justify-center">
                                        <div className="scale-[4.2] text-white opacity-95 drop-shadow-2xl">
                                            {module.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-foreground tracking-tight">
                                            {module.module_name}
                                        </h2>
                                        <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                                            {module.module_description}
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            onClick={handleOpenModule}
                                            size="lg"
                                            className="flex-1 rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 h-12"
                                        >
                                            Open Module
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
