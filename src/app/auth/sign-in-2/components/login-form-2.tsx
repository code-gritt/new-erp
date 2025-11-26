'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, type UserRole } from '@/features/auth/authSlice';
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
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpinnerCustom } from '@/components/ui/spinner';
import { useMutation } from '@apollo/client';
import type { AppDispatch } from '@/app/store';
import { LOGIN_MUTATION } from '@/graphql/mutations/login';
import { SELECT_COMPANY_DIVISION } from '@/graphql/mutations/selectCompanyDivision';
import type { Company } from '@/types/auth';

export function LoginForm2({ className, ...props }: React.ComponentProps<'form'>) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [loginToken, setLoginToken] = useState<string>('');
    const [loginData, setLoginData] = useState<any>(null);

    const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
    const [selectMutation, { loading: selectLoading }] = useMutation(SELECT_COMPANY_DIVISION);

    const isLoading = loginLoading || selectLoading;

    const selectedCompanyData = companies.find((c) => c.company_id === selectedCompany);
    const divisions = selectedCompanyData?.divisions || [];

    const handleContinue = async () => {
        if (!userId || !password) {
            toast.error('Please enter User ID and Password');
            return;
        }

        try {
            const { data } = await loginMutation({
                variables: { userId: userId.toUpperCase(), password },
            });

            if (data?.login?.token) {
                const token = data.login.token;
                setLoginToken(token);
                setLoginData(data.login);
                setCompanies(data.login.user.companies);
                setStep(2);
                toast.success(data.login.message || 'Login successful');
            }
        } catch (err: any) {
            toast.error(err.message || 'Invalid credentials');
        }
    };

    const handleSignIn = async () => {
        if (!selectedCompany || !selectedDivision) {
            toast.error('Please select Company and Division');
            return;
        }

        try {
            const { data } = await selectMutation({
                variables: {
                    userId: loginData.user.userId,
                    companyId: selectedCompany,
                    divId: selectedDivision,
                },
                context: {
                    headers: {
                        Authorization: `Bearer ${loginToken}`,
                    },
                },
            });

            if (data?.selectCompanyDivision?.token) {
                const sessionToken = data.selectCompanyDivision.token;

                dispatch(
                    login({
                        token: sessionToken,
                        user: {
                            userId: loginData.user.userId,
                            username: loginData.user.username,
                            email: loginData.user.email,
                            role: 'admin' as UserRole,
                            companyId: selectedCompany,
                            companyName: selectedCompanyData?.company_name.trim() || 'N/A',
                            divisionId: selectedDivision,
                            divisionName:
                                divisions.find((d) => d.div_id === selectedDivision)?.div_name ||
                                'N/A',
                        },
                    })
                );

                toast.success('Welcome! Session started.');
                navigate('/dashboard-3');
            }
        } catch (err: any) {
            console.error('Select company error:', err);
            toast.error(err.message || 'Failed to start session');
        }
    };

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6">
                        <SpinnerCustom />
                        <p className="text-lg font-medium animate-pulse">
                            {loginLoading ? 'Authenticating...' : 'Starting session...'}
                        </p>
                    </div>
                </div>
            )}

            <form
                className={cn(
                    'flex flex-col gap-6 max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl/30 border border-gray-200 dark:border-gray-700',
                    className
                )}
                onSubmit={(e) => e.preventDefault()}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">
                        Sign in to access your ERP system
                    </p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 w-full">
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <div
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center font-medium',
                                step >= 1 ? 'bg-primary text-white' : 'bg-muted'
                            )}
                        >
                            {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                        </div>
                        <p className="text-xs mt-1">Credentials</p>
                    </div>
                    <div className={cn('h-0.5 flex-1', step >= 2 ? 'bg-primary' : 'bg-muted')} />
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <div
                            className={cn(
                                'w-10 h-10 rounded-full flex items-center justify-center font-medium',
                                step >= 2 ? 'bg-primary text-white' : 'bg-muted'
                            )}
                        >
                            2
                        </div>
                        <p className="text-xs mt-1">Company & Division</p>
                    </div>
                </div>

                {step === 1 ? (
                    <>
                        <div className="space-y-4">
                            <div>
                                <Label>User ID</Label>
                                <Input
                                    placeholder="Enter User ID (e.g., SUPER)"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button onClick={handleContinue} className="w-full" disabled={isLoading}>
                            Continue <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="space-y-5">
                            <div>
                                <Label>Company</Label>
                                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((c) => (
                                            <SelectItem key={c.company_id} value={c.company_id}>
                                                {c.company_name.trim()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Division</Label>
                                <Select
                                    value={selectedDivision}
                                    onValueChange={setSelectedDivision}
                                    disabled={!selectedCompany}
                                >
                                    <SelectTrigger className="mt-2">
                                        <SelectValue
                                            placeholder={
                                                selectedCompany
                                                    ? 'Select division'
                                                    : 'Choose company first'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {divisions.map((d) => (
                                            <SelectItem key={d.div_id} value={d.div_id}>
                                                {d.div_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    disabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSignIn}
                                    disabled={!selectedCompany || !selectedDivision || isLoading}
                                    className="flex-1"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </>
    );
}
