'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import type { ModuleDetailModalProps } from '@/types/dashboard';

export function ModuleDetailModal({ module, onClose }: ModuleDetailModalProps) {
    if (!module) return null;

    return (
        <AnimatePresence>
            {module && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                            className="max-w-lg w-full"
                        >
                            <div className="bg-background/96 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                                <div className={`h-56 ${module.color} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-linear-to-br from-black/40 via-black/20 to-transparent" />
                                    <div className="flex h-full items-center justify-center">
                                        <div className="scale-[3.8] text-white opacity-95 drop-shadow-2xl">
                                            {module.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-7">
                                    <div className="space-y-3">
                                        <h2 className="text-3xl font-bold text-foreground tracking-tight">
                                            {module.module_name}
                                        </h2>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            {module.module_description}
                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="flex-1 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-shadow"
                                        >
                                            <Link to={module.path}>Open Module</Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="lg"
                                            onClick={onClose}
                                            className="rounded-xl"
                                        >
                                            Close
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
