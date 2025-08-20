// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   } | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     loginSuccess(
//       state,
//       action: PayloadAction<{
//         user: { id: string; name: string; email: string };
//         token: string;
//       }>
//     ) {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.error = null;
//     },
//     loginFailure(state, action: PayloadAction<string>) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     registerStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     registerSuccess(state) {
//       state.loading = false;
//       state.error = null;
//     },
//     registerFailure(state, action: PayloadAction<string>) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//     },
//   },
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   registerStart,
//   registerSuccess,
//   registerFailure,
//   logout,
// } = authSlice.actions;

// export default authSlice.reducer;



// lib/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = '';
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    registerSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = '';
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = '';
      localStorage.removeItem('auth');
    },
    clearError: (state) => {
      state.error = '';
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;