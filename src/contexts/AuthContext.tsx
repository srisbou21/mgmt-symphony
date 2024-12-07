import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
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

  // Initialiser avec un utilisateur admin par défaut si aucun utilisateur n'existe
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      const defaultAdmin = {
        id: 1,
        username: 'admin',
        password: 'admin123',
        isAdmin: true
      };
      localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => 
      u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
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

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);

    if (userIndex === -1 || users[userIndex].password !== oldPassword) {
      toast({
        title: "Erreur",
        description: "Ancien mot de passe incorrect",
        variant: "destructive",
      });
      return false;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    setUser(users[userIndex]);
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    
    toast({
      title: "Succès",
      description: "Mot de passe modifié avec succès",
    });
    return true;
  };

  const createUser = (username: string, password: string): boolean => {
    if (!user?.isAdmin) {
      toast({
        title: "Erreur",
        description: "Seul un administrateur peut créer de nouveaux utilisateurs",
        variant: "destructive",
      });
      return false;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: User) => u.username === username)) {
      toast({
        title: "Erreur",
        description: "Ce nom d'utilisateur existe déjà",
        variant: "destructive",
      });
      return false;
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
      isAdmin: false
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