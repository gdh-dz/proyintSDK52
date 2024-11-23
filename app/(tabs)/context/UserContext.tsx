// context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir el tipo de datos del usuario
interface User {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
}

// Definir el tipo del contexto
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Definir el tipo de propiedades del proveedor, que incluye `children`
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Componente UserProvider con el tipo correcto para children
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Establecer un estado inicial con el tipo `User`
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    profileImage: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
