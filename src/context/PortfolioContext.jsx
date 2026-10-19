import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/defaultPortfolioData';
import { API_BASE_URL, STORAGE_KEY, AUTH_KEY, THEME_KEY, fetchPublicPortfolio } from '../services/apiClient';
import { mergePortfolioData } from '../services/portfolioDataMerge';
import { uploadFile } from '../services/uploadService';
import { usePortfolioActions } from './usePortfolioActions';

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [accentTheme, setAccentTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) return savedTheme;
    } catch (e) {
      // ignore
    }
    return 'emerald';
  });

  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load local storage:', e);
    }
    return defaultPortfolioData;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', accentTheme);
    try {
      localStorage.setItem(THEME_KEY, accentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [accentTheme]);

  const [authToken, setAuthToken] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) || null;
    } catch (e) {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Public Portfolio Data from Core PHP API on Mount
  useEffect(() => {
    async function initPortfolio() {
      const apiData = await fetchPublicPortfolio();
      if (apiData) {
        setPortfolioData(mergePortfolioData(apiData));
      }
    }
    initPortfolio();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch (e) {
      console.error(e);
    }
  }, [portfolioData]);

  // Admin Login Authentication Handler
  const adminLogin = async (username, password) => {
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();

      if (res.ok && json.status === 'success') {
        setAuthToken(json.token);
        setAdminUser(json.user);
        localStorage.setItem(AUTH_KEY, json.token);
        return true;
      } else {
        setAuthError(json.message || 'Invalid username or password.');
        return false;
      }
    } catch (e) {
      // Local demo fallback if PHP local server is not active
      const fallbackPass = import.meta.env.VITE_ADMIN_FALLBACK_PASSWORD || '';
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || '';
      const demoToken = import.meta.env.VITE_DEMO_SESSION_TOKEN || 'demo_admin_session_token_12345';
      if ((username.toLowerCase() === 'sami' || username === 'admin' || username === adminEmail) && password === fallbackPass) {
        setAuthToken(demoToken);
        setAdminUser({ username: 'Sami', role: 'admin' });
        localStorage.setItem(AUTH_KEY, demoToken);
        return true;
      } else {
        setAuthError('Invalid credentials. Please enter valid admin password.');
        return false;
      }
    }
  };

  const adminLogout = () => {
    setAuthToken(null);
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const resetToDefaults = () => {
    setPortfolioData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    return true;
  };

  const handleUploadFile = (file) => uploadFile(file, authToken);

  const actions = usePortfolioActions(portfolioData, setPortfolioData, authToken);

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        authToken,
        adminUser,
        authError,
        isAdminOpen,
        setIsAdminOpen,
        adminLogin,
        adminLogout,
        resetToDefaults,
        accentTheme,
        setAccentTheme,
        isLoading,
        uploadFile: handleUploadFile,
        ...actions,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
