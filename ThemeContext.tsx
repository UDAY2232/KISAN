import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  actualTheme: 'light' | 'dark';
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  backgroundImage?: string;
  backgroundOpacity: number;
  backgroundBlur: number;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setAccentColor: (color: string) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  setBackgroundImage: (image?: string) => void;
  setBackgroundOpacity: (opacity: number) => void;
  setBackgroundBlur: (blur: number) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const defaultBackgrounds = [
  'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
  'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
  'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg',
  'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg',
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { state: authState, updateUser } = useAuth();
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColorState] = useState('#16a34a');
  const [fontSize, setFontSizeState] = useState<'small' | 'medium' | 'large'>('medium');
  const [backgroundImage, setBackgroundImageState] = useState<string | undefined>();
  const [backgroundOpacity, setBackgroundOpacityState] = useState(0.1);
  const [backgroundBlur, setBackgroundBlurState] = useState(0);

  useEffect(() => {
    if (authState.user?.preferences) {
      const prefs = authState.user.preferences;
      setThemeState(prefs.theme);
      setAccentColorState(prefs.customization.accentColor);
      setFontSizeState(prefs.customization.fontSize);
      setBackgroundImageState(prefs.customization.backgroundImage);
      setBackgroundOpacityState(prefs.customization.backgroundOpacity);
      setBackgroundBlurState(prefs.customization.backgroundBlur);
    }
  }, [authState.user]);

  useEffect(() => {
    const updateActualTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setActualTheme(systemTheme);
      } else {
        setActualTheme(theme);
      }
    };

    updateActualTheme();
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateActualTheme);
      return () => mediaQuery.removeEventListener('change', updateActualTheme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', actualTheme === 'dark');
    document.documentElement.style.setProperty('--accent-color', accentColor);
    
    const fontSizeMap = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.setProperty('--base-font-size', fontSizeMap[fontSize]);
  }, [actualTheme, accentColor, fontSize]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    if (authState.user) {
      updateUser({
        preferences: {
          ...authState.user.preferences,
          theme: newTheme,
        },
      });
    }
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    if (authState.user) {
      updateUser({
        preferences: {
          ...authState.user.preferences,
          customization: {
            ...authState.user.preferences.customization,
            accentColor: color,
          },
        },
      });
    }
  };

  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSizeState(size);
    if (authState.user) {
      updateUser({
        preferences: {
          ...authState.user.preferences,
          customization: {
            ...authState.user.preferences.customization,
            fontSize: size,
          },
        },
      });
    }
  };

  const setBackgroundImage = (image?: string) => {
    setBackgroundImageState(image);
    if (authState.user) {
      updateUser({
        preferences: {
          ...authState.user.preferences,
          customization: {
            ...authState.user.preferences.customization,
            backgroundImage: image,
          },
        },
      });
    }
  };

  const setBackgroundOpacity = (opacity: number) => {
    setBackgroundOpacityState(opacity);
    if (authState.user) {
      updateUser({
        preferences: {
          ...authState.user.preferences,
          customization: {
            ...authState.user.preferences.customization,
            backgroundOpacity: opacity,
          },
        },
      });
    }
  };

  const setBackgroundBlur = (blur: number) => {
    setBackgroundBlurState(blur);
    if (authState.user) {
      updateUser({
        preferences: {
          ...authState.user.preferences,
          customization: {
            ...authState.user.preferences.customization,
            backgroundBlur: blur,
          },
        },
      });
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      actualTheme,
      accentColor,
      fontSize,
      backgroundImage,
      backgroundOpacity,
      backgroundBlur,
      setTheme,
      setAccentColor,
      setFontSize,
      setBackgroundImage,
      setBackgroundOpacity,
      setBackgroundBlur,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}