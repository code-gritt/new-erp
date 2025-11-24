import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type UserRole = 'admin' | 'sales_manager' | 'hr_manager' | 'employee';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    company: string;
    department: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const mockUsers: Record<string, User> = {
    'admin@enterprise.com': {
        id: '1',
        name: 'John Admin',
        email: 'admin@enterprise.com',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        company: 'Acme Corp',
        department: 'Executive',
    },
    'sales@enterprise.com': {
        id: '2',
        name: 'Sarah Sales',
        email: 'sales@enterprise.com',
        role: 'sales_manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sales',
        company: 'Acme Corp',
        department: 'Sales',
    },
    'hr@enterprise.com': {
        id: '3',
        name: 'Mike HR',
        email: 'hr@enterprise.com',
        role: 'hr_manager',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hr',
        company: 'Acme Corp',
        department: 'Human Resources',
    },
    'user@enterprise.com': {
        id: '4',
        name: 'Emma Employee',
        email: 'user@enterprise.com',
        role: 'employee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
        company: 'Acme Corp',
        department: 'Operations',
    },
};

export const login = createAsyncThunk(
    'auth/login',
    async (
        {
            email,
            password,
            company,
            department,
        }: { email: string; password: string; company: string; department: string },
        { rejectWithValue }
    ) => {
        await new Promise((r) => setTimeout(r, 400));

        const user = mockUsers[email.toLowerCase()];
        if (!user || password !== 'password') {
            return rejectWithValue('Invalid credentials');
        }

        return { ...user, company, department };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, isAuthenticated: false } as AuthState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'isAuthenticated'],
};

export const { logout } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
