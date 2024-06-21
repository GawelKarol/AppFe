// src/contexts/UserContext.tsx

import React, {createContext, ReactNode, useContext, useState} from 'react';

interface UserContextType {
    role: string;
    setRole: (role: string) => void;
    name: string;
    setName: (role: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [role, setRole] = useState<string>('');
    const [name, setName] = useState<string>('');

    return (
        <UserContext.Provider value={{role, setRole, name, setName}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
