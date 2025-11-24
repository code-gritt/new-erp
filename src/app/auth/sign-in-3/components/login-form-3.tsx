'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/features/auth/authSlice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import type { AppDispatch } from '@/app/store';

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

// Zod schema for validation
const loginSchema = z.object({
    username: z.string().min(1, 'Username or email is required').max(50, 'Username too long'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export default function LoginForm3() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(false);

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

        setLoading(true);
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

        if (foundEmail) {
            try {
                await dispatch(
                    login({ email: foundEmail, password: 'password', company, department })
                ).unwrap();
                toast.success('Login successful');
                navigate('/dashboard');
            } catch (error) {
                toast.error('Login failed');
            }
        } else {
            toast.error('User not found');
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <Card className="overflow-hidden">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-center mb-2">
                                    <a href="/" className="flex items-center gap-2 font-medium">
                                        <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                                            <Logo size={24} />
                                        </div>
                                        <span className="text-xl">Enterprise Portal</span>
                                    </a>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-muted-foreground text-balance">
                                        {step === 1
                                            ? 'Enter your email/username and password'
                                            : 'Select your company and department'}
                                    </p>
                                </div>

                                {step === 1 ? (
                                    <>
                                        <div className="grid gap-3">
                                            <Label htmlFor="username">Username / Email</Label>
                                            <Input
                                                id="username"
                                                placeholder="admin@enterprise.com or Sarah"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                autoFocus
                                            />
                                            {errors.username && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.username}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            {errors.password && (
                                                <p className="text-red-500 text-sm">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        <Button className="w-full" onClick={handleContinue}>
                                            Continue
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-5">
                                            <div>
                                                <Label>Company</Label>
                                                <Select value={company} onValueChange={setCompany}>
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
                                                    disabled={!company}
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
                                                    size="lg"
                                                    className="flex-1"
                                                    onClick={() => setStep(1)}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    size="lg"
                                                    className="flex-1"
                                                    onClick={handleLogin}
                                                    disabled={!company || !department || loading}
                                                >
                                                    {loading ? 'Signing in...' : 'Sign In'}
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="bg-muted relative hidden md:block">
                            <img
                                src="https://ui.shadcn.com/placeholder.svg"
                                alt="Enterprise"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.95] dark:invert"
                            />
                        </div>
                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Try: <code className="font-mono">admin@enterprise.com</code> or{' '}
                    <code className="font-mono">Sarah</code> → password: <strong>password</strong>
                </p>
            </div>
        </div>
    );
}
