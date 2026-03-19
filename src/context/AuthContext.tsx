import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  role: 'regular' | 'business' | 'admin';
  businessApproved?: boolean;  // undefined for non-business
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;  // For approval updates
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Persist auth to localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser) as User;
      setUser(parsed);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    }
  }, [user]);

  const login = (userData: Partial<User>) => {
    const fullUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email || 'user@example.com',
      role: userData.role!,
      businessApproved: userData.role === 'business' ? false : undefined,
      name: userData.name,
    };
    setUser(fullUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};