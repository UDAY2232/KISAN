import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData } from '../types/auth';
import toast from 'react-hot-toast';

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// Mock user data for demonstration
const mockUser: User = {
  id: '1',
  username: 'john_farmer',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Smith',
  bio: 'Organic farmer with 15 years of experience',
  location: 'California, USA',
  website: 'https://johnsfarm.com',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  role: 'farmer',
  isVerified: true,
  createdAt: '2023-01-15T00:00:00Z',
  lastLogin: '2024-01-20T10:30:00Z',
  socialLinks: {
    facebook: 'https://facebook.com/johnsfarm',
    twitter: 'https://twitter.com/johnsfarm',
    instagram: 'https://instagram.com/johnsfarm',
  },
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
      orderUpdates: true,
      priceAlerts: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true,
    },
    customization: {
      accentColor: '#16a34a',
      fontSize: 'medium',
      backgroundOpacity: 0.1,
      backgroundBlur: 0,
    },
  },
  stats: {
    totalOrders: 45,
    totalSales: 128,
    totalSpent: 12450.00,
    totalEarned: 28900.00,
    joinDate: '2023-01-15',
    lastActivity: '2024-01-20',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, validate token with backend
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (credentials.email === 'john@example.com' && credentials.password === 'password') {
        localStorage.setItem('authToken', 'mock-jwt-token');
        dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
        toast.success('Welcome back!');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      toast.error(message);
    }
  };

  const signup = async (data: SignupData) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        ...mockUser,
        id: Date.now().toString(),
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('authToken', 'mock-jwt-token');
      dispatch({ type: 'AUTH_SUCCESS', payload: newUser });
      toast.success('Account created successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      toast.error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ type: 'UPDATE_USER', payload: data });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{
      state,
      login,
      signup,
      logout,
      updateUser,
      resetPassword,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}