import React, {createContext, useState} from "react";
import { LANGUAGE_DE, LANGUAGE_EN } from "../constants/Language";

export interface LanguageProviderProps {
    language: string
    userLanguageChange: (selectedLanguage: string) => void
}

export const LanguageContext = createContext<LanguageProviderProps>({
    language: "en",
    userLanguageChange: () => {return "en"}
});

export function LanguageProvider( {children}: any): any {
    const userLanguage = navigator.language;

    const preferredLanguage = userLanguage === "de" || userLanguage === "de-DE" ? LANGUAGE_DE : LANGUAGE_EN
    const [language, setLanguage] = useState(preferredLanguage);

    const userLanguageChange = (selectedLanaguage: string): void => {
        const newLanguage = selectedLanaguage ? selectedLanaguage : LANGUAGE_EN
        setLanguage(newLanguage);
    }

    const provider: LanguageProviderProps = {
        language,
        userLanguageChange
    };

    return (
        <LanguageContext.Provider value={provider}>
            {children}
        </LanguageContext.Provider>
    );
}