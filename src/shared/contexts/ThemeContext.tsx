import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from '@emotion/react';
import { DarkTheme, LightTheme } from '../themes';
import { Box } from "@mui/system";

interface IThemeContextData{ //dados entro do contexto do tema //serve para definir quais propriedades estou compartiçhando no contexto
    //Definindo as propriedades do tema para compartilhar no contexto
    themeName: 'light' | 'dark'; //definindo essas propriedades que serão os nomes dos temas
    toggleTheme: () => void; //vai alternar os tema
}

//Esse contexto "ThemeContext" tem as propriedades que foram definidas na interface "IThemeContextData"
const ThemeContext = createContext({} as IThemeContextData); //criando um contexto a aprtir do próprio react //O "as" serve para dizer que esse contexto é o contexto de IThemeContextData

export const useAppThemeContext = () => { //Criando Hook customizado para que por padrão toda vez que eu chamar a função useContext, ele vai retonar as propriedades do ThemeContext
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => { //Criando componente, Tipando ele e passando o filho dele como props nesse caso são as páginas

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light'); //criando estado e tipando como <'light' | 'dark'>

    const toggleTheme = useCallback(() => { //O useCallback armazena funções
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light'); //Faz a troca do nome do tema
    }, []);

    //Quando o themeName mudar de nome, ele vai retornar o tema claro ou o escuro
    const theme = useMemo(() => { //O useMemo armazena valores

        if(themeName === 'light') return LightTheme;

        return DarkTheme;
        
    }, [themeName]);

    return(
        //Usando componente que foi criado usando o createContext() que vai pover as propriedades da interface
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    { children }
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}