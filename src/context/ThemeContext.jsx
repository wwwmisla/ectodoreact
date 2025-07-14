import { createContext, useMemo, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const [mode, setMode] = useState(storedTheme);

    useEffect(() => {
        localStorage.setItem('theme', mode);

        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            background: {
                                default: '#f5fafd',
                            },
                            primary: {
                                main: '#17A2B8',
                            },
                            // text: {
                            //     primary: '#0c2d36',
                            // },
                        }
                        : {
                            background: {
                                default: '#0b1416',
                            },
                            primary: {
                                main: '#17A2B8',
                            },
                            // text: {
                            //     primary: '#e0f7fa',
                            // },
                        }),
                },
                typography: {
                    fontFamily: 'Roboto, sans-serif',
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
