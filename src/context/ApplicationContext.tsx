import { createContext, useState } from "react";
import { Result, Sentence } from "../types/structure";
import { SENTENCE_SORT_ID } from "../components/tools/SentenceSearchPage";

export const initialSentenceSearchParams = {
    selectedSentence: 0,
    filteredSentences: [],
    sortOption: SENTENCE_SORT_ID,
    randomKey: 0
}

export interface ApplicationContextProviderProps {
    nlpResult: Result | null
    inputText: string
    sentenceSearchParameters: SentenceSearchProps
    updateNlpResult: (nlpResult: Result) => void
    updateInputText: (text: string) => void
    updateSentenceSearchParameters: (text: SentenceSearchProps) => void
}

export interface SentenceSearchProps {
    selectedSentence: number,
    filteredSentences: Sentence[],
    sortOption: number,
    randomKey: number
}

export const ApplicationContext = createContext<ApplicationContextProviderProps>({
    nlpResult: null,
    inputText: "",
    sentenceSearchParameters: initialSentenceSearchParams,
    updateNlpResult: () => {return null},
    updateInputText: () => {return ""},
    updateSentenceSearchParameters: () => initialSentenceSearchParams
});

export function ApplicationContextProvider( {children}: any): any {
    const [nlpResult, setNlpResult] = useState<Result | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [sentenceSearchParameters, setSentenceSearchParameters] 
        = useState<SentenceSearchProps>(initialSentenceSearchParams)

    const updateNlpResult = (nlpResult: Result): void => {
        setNlpResult(nlpResult);
    }

    const updateInputText = (inputText: string): void => {
        setInputText(inputText);
    }

    const updateSentenceSearchParameters = (sentenceSearchParameters: SentenceSearchProps): void => {
        setSentenceSearchParameters(sentenceSearchParameters)
    }

    const provider: ApplicationContextProviderProps = {
        nlpResult,
        inputText,
        sentenceSearchParameters,
        updateNlpResult,
        updateInputText,
        updateSentenceSearchParameters
    };

    return (
        <ApplicationContext.Provider value={provider}>
            {children}
        </ApplicationContext.Provider>
    );
}
