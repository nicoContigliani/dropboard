import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/features/auth/authSlice';
import uploadsReducer from '@/lib/features/uploads/uploadsSlice'
import companiesReducer from '@/lib/features/companies/companiesSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        uploads: uploadsReducer,
        companies: companiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;