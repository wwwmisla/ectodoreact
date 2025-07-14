import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

async function apiLogin(email, senha) {
    const res = await fetch(`http://localhost:3001/usuarios?email=${email}&senha=${senha}`);
    if (!res.ok) throw new Error("Erro no servidor");
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("app_user");
        
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        setIsLoading(false);
    }, []); 

    const login = async (email, senha) => {
        try {
            const userFound = await apiLogin(email, senha);
            if (userFound) {
                const { senha, ...userToStore } = userFound;
                localStorage.setItem("app_user", JSON.stringify(userToStore));
                setUsuario(userToStore);
                setIsAuthenticated(true);
                navigate("/home");
            } else {
                showNotification('Email ou senha incorretos!', 'error');
            }
        } catch (error) {
            console.error("Falha no login:", error);
            showNotification('Ocorreu um erro no servidor. Tente novamente mais tarde.', 'error');
        }
    };

    const logout = () => {
        localStorage.removeItem("app_user");
        setUsuario(null);
        setIsAuthenticated(false);
        navigate("/login");
    };
    
    const showNotification = (message, severity = 'error') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return;
        setNotification({ ...notification, open: false });
    };

    const value = { isAuthenticated, usuario, isLoading, login, logout, showNotification };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
            
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};