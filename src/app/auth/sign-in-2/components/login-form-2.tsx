'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/features/auth/authSlice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { Check, ChevronRight } from 'lucide-react';
import type { AppDispatch } from '@/app/store';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const COMPANIES: Record<string, string[]> = {
    'Acme Corp': ['Finance', 'HR', 'Sales', 'IT', 'Operations'],
    'Stark Industries': ['R&D', 'Defense', 'Energy', 'AI'],
    'Wayne Enterprises': ['Security', 'Philanthropy', 'Gotham'],
    Oscorp: ['Genetics', 'Chemicals', 'Bio'],
};

const mockUsers = {
    'admin@enterprise.com': { name: 'John Admin', role: 'admin' },
    'sales@enterprise.com': { name: 'Sarah Sales', role: 'sales_manager' },
    'hr@enterprise.com': { name: 'Mike HR', role: 'hr_manager' },
    'user@enterprise.com': { name: 'Emma Employee', role: 'employee' },
};

const loginSchema = z.object({
    username: z.string().min(1, 'Username or email is required').max(50, 'Username too long'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export function LoginForm2({ className, ...props }: React.ComponentProps<'form'>) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [department, setDepartment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const departments = company ? COMPANIES[company] : [];

    const validateStep1 = () => {
        const result = loginSchema.safeParse({ username, password });
        if (!result.success) {
            const fieldErrors: typeof errors = {};
            result.error.issues.forEach((err) => {
                if (err.path[0] === 'username') fieldErrors.username = err.message;
                if (err.path[0] === 'password') fieldErrors.password = err.message;
            });
            setErrors(fieldErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleContinue = () => {
        if (validateStep1()) setStep(2);
    };

    const handleLogin = async () => {
        if (!company || !department) return;

        setIsLoading(true);

        const input = username.toLowerCase().trim();
        let foundEmail = null;

        for (const [email, user] of Object.entries(mockUsers)) {
            if (
                email.includes(input) ||
                user.name.toLowerCase().includes(input) ||
                email.split('@')[0] === input
            ) {
                foundEmail = email;
                break;
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (foundEmail) {
            try {
                await dispatch(
                    login({ email: foundEmail, password: 'password', company, department })
                ).unwrap();

                toast.success('Welcome back! Login successful', {
                    duration: 4000,
                });
                navigate('/dashboard-3');
            } catch {
                toast.error('Login failed. Please try again.', {
                    duration: 5000,
                });
            }
        } else {
            toast.error('User not found. Try "Sarah" or "admin@enterprise.com"', {
                duration: 5000,
            });
        }

        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6">
                        <LoadingSpinner size="lg" />
                        <p className="text-lg font-medium animate-pulse">Signing you in...</p>
                    </div>
                </div>
            )}

            <form
                className={cn(
                    'flex flex-col gap-6 max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700',
                    className
                )}
                onSubmit={(e) => e.preventDefault()}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your credentials to continue
                    </p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 w-full">
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <div
                            className={cn(
                                'flex w-10 h-10 items-center justify-center rounded-full font-medium transition-all duration-300',
                                step >= 1
                                    ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20'
                                    : 'bg-muted text-muted-foreground'
                            )}
                        >
                            {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                        </div>
                        <p className="text-xs font-medium text-center mt-1">Credentials</p>
                    </div>

                    <div
                        className={cn(
                            'h-0.5 flex-1 transition-all duration-500',
                            step >= 2 ? 'bg-primary' : 'bg-muted'
                        )}
                    />

                    <div className="flex flex-col items-center gap-1 flex-1">
                        <div
                            className={cn(
                                'flex w-10 h-10 items-center justify-center rounded-full font-medium transition-all duration-300',
                                step >= 2
                                    ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20'
                                    : 'bg-muted text-muted-foreground'
                            )}
                        >
                            2
                        </div>
                        <p className="text-xs font-medium text-center mt-1">Company & Dept</p>
                    </div>
                </div>

                {step === 1 ? (
                    <>
                        <div className="grid gap-4">
                            <Label htmlFor="username">Username / Email</Label>
                            <Input
                                id="username"
                                placeholder="admin@enterprise.com or Sarah"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                disabled={isLoading}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username}</p>
                            )}
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>

                        <Button
                            className="w-full mt-2"
                            onClick={handleContinue}
                            disabled={isLoading}
                        >
                            Continue <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="space-y-5">
                            <div>
                                <Label>Company</Label>
                                <Select
                                    value={company}
                                    onValueChange={setCompany}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full mt-2">
                                        <SelectValue placeholder="Select company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(COMPANIES).map((c) => (
                                            <SelectItem key={c} value={c}>
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Department</Label>
                                <Select
                                    value={department}
                                    onValueChange={setDepartment}
                                    disabled={!company || isLoading}
                                >
                                    <SelectTrigger className="w-full mt-2">
                                        <SelectValue
                                            placeholder={
                                                company
                                                    ? 'Select department'
                                                    : 'Choose company first'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((d) => (
                                            <SelectItem key={d} value={d}>
                                                {d}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setStep(1)}
                                    disabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleLogin}
                                    disabled={!company || !department || isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </>
    );
}
