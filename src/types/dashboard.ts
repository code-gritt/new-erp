import type { ReactNode } from 'react';

export interface UserModule {
    module_id: string;
    module_name: string;
    module_description: string;
    front_end_url?: string;
    icon: string;
    access: string;
}

export interface ModuleCard {
    module_id: string;
    module_name: string;
    module_description: string;
    front_end_url?: string;
    icon: ReactNode;
    access: string;
    color: string;
    path: string;
}

export interface ModuleDetailModalProps {
    module: ModuleCard | null;
    onClose: () => void;
}
