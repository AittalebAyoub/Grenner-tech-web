import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage doit être utilisé dans un LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Récupérer la langue sauvegardée ou utiliser 'fr' par défaut
    const [locale, setLocale] = useState(() => {
        return localStorage.getItem('language') || 'fr';
    });

    // Sauvegarder la langue dans localStorage quand elle change
    useEffect(() => {
        localStorage.setItem('language', locale);
    }, [locale]);

    const changeLanguage = (newLocale) => {
        setLocale(newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};