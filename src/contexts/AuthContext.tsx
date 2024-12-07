import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthUser } from '@/types/user';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  createUser: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const defaultAdmin: AuthUser = {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        permissions: {
          canManageUsers: true,
          canManageEquipment: true,
          canManageMaintenance: true,
          canViewReports: true
        }
      };
      localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as AuthUser[];
    const foundUser = users.find((u) => 
      u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${username}!`,
      });
      return true;
    }
    
    toast({
      title: "Erreur de connexion",
      description: "Nom d'utilisateur ou mot de passe incorrect",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (!user) return false;

    const users = JSON.parse(localStorage.getItem('users') || '[]') as AuthUser[];
    const userIndex = users.findIndex((u) => u.id === user.id);
    const currentUser = users[userIndex];

    if (userIndex === -1 || currentUser.password !== oldPassword) {
      toast({
        title: "Erreur",
        description: "Ancien mot de passe incorrect",
        variant: "destructive",
      });
      return false;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    toast({
      title: "Succès",
      description: "Mot de passe modifié avec succès",
    });
    return true;
  };

  const createUser = (username: string, password: string): boolean => {
    if (!user || user.role !== 'admin') {
      toast({
        title: "Erreur",
        description: "Seul un administrateur peut créer de nouveaux utilisateurs",
        variant: "destructive",
      });
      return false;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]') as AuthUser[];
    if (users.some((u) => u.username === username)) {
      toast({
        title: "Erreur",
        description: "Ce nom d'utilisateur existe déjà",
        variant: "destructive",
      });
      return false;
    }

    const newUser: AuthUser = {
      id: users.length + 1,
      username,
      password,
      role: 'user',
      permissions: {
        canManageUsers: false,
        canManageEquipment: false,
        canManageMaintenance: false,
        canViewReports: false
      }
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    toast({
      title: "Succès",
      description: "Nouvel utilisateur créé avec succès",
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};