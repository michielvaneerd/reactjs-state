import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function useAuth() {
    const [isAuth, setIsAuth] = useState(false);
    return { isAuth, setIsAuth };
}
