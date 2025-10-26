import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
     themeMode: ThemeMode
     setThemeMode: (mode: ThemeMode) => void
     currentTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
     const systemColorScheme = useRNColorScheme()
     const [themeMode, setThemeModeState] = useState<ThemeMode>('system')

     const setThemeMode = (mode: ThemeMode) => {
          setThemeModeState(mode)
          console.log('Theme mode set to:', mode)
     }

     // Calculate current effective theme
     const currentTheme: 'light' | 'dark' =
          themeMode === 'system' ? (systemColorScheme ?? 'light') : themeMode

     return (
          <ThemeContext.Provider value={{ themeMode, setThemeMode, currentTheme }}>
               {children}
          </ThemeContext.Provider>
     )
}

export function useTheme() {
     const context = useContext(ThemeContext)
     if (context === undefined) {
          throw new Error('useTheme must be used within a ThemeProvider')
     }
     return context
}
