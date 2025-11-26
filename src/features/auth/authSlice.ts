import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type UserRole = 'admin' | 'sales_manager' | 'hr_manager' | 'employee';

export interface User {
    userId: string;
    username: string;
    email: string;
    role: UserRole;
    companyId: string;
    companyName: string;
    divisionId: string;
    divisionName: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (
        {
            token,
            user,
        }: {
            token: string;
            user: {
                userId: string;
                username: string;
                email: string;
                role: UserRole;
                companyId: string;
                companyName: string;
                divisionId: string;
                divisionName: string;
            };
        },
        { rejectWithValue }
    ) => {
        try {
            return { token, user };
        } catch (err) {
            return rejectWithValue('Session failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = (action.payload as string) || 'Login failed';
            });
    },
});

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['user', 'token', 'isAuthenticated'],
};

export const { logout } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
