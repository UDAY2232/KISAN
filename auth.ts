export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  profileImage?: string;
  role: 'farmer' | 'buyer' | 'supplier';
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
    orderUpdates: boolean;
    priceAlerts: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  customization: {
    accentColor: string;
    fontSize: 'small' | 'medium' | 'large';
    backgroundImage?: string;
    backgroundOpacity: number;
    backgroundBlur: number;
    backgroundSchedule?: {
      enabled: boolean;
      images: string[];
      interval: number;
    };
  };
}

export interface UserStats {
  totalOrders: number;
  totalSales: number;
  totalSpent: number;
  totalEarned: number;
  joinDate: string;
  lastActivity: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'farmer' | 'buyer' | 'supplier';
  agreeToTerms: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}