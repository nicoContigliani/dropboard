import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/lib/features/auth/authSlice';
import uploadsReducer from '@/lib/features/uploads/uploadsSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        uploads: uploadsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;