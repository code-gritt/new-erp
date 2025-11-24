import { LoginForm2 } from './components/login-form-2';

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        <LoginForm2 />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/11583.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
