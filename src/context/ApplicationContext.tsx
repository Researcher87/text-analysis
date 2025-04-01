import { createContext, useState } from "react";
import { Result, Sentence } from "../types/structure";
import { SENTENCE_SORT_ID } from "../components/tools/SentenceSearchPage";
import WordFrequencyTable from "../components/analysis/WordFrequencyPage";

export const initialSentenceSearchParams: SentenceSearchProps = {
    selectedSentence: 0,
    filteredSentences: [],
    sortOption: SENTENCE_SORT_ID,
    randomKey: 0
}

export const initialWordFrequencyParams: WordFrequencyProps = {
    filter: "",
    filterVariant: 0,
    sortOption: 0
}

export interface ApplicationContextProviderProps {
    nlpResult: Result | null
    inputText: string
    sentenceSearchParameters: SentenceSearchProps
    wordFrequencyParameters: WordFrequencyProps
    updateNlpResult: (nlpResult: Result) => void
    updateInputText: (text: string) => void
    updateSentenceSearchParameters: (props: SentenceSearchProps) => void
    updateWordFrequencyParameters: (props: WordFrequencyProps) => void
}

export interface SentenceSearchProps {
    selectedSentence: number,
    filteredSentences: Sentence[],
    sortOption: number,
    randomKey: number
}

export interface WordFrequencyProps {
    filter: string,
    filterVariant: number,
    sortOption: number
}

export const ApplicationContext = createContext<ApplicationContextProviderProps>({
    nlpResult: null,
    inputText: "",
    sentenceSearchParameters: initialSentenceSearchParams,
    wordFrequencyParameters: initialWordFrequencyParams,
    updateNlpResult: () => {return null},
    updateInputText: () => {return ""},
    updateSentenceSearchParameters: () => initialSentenceSearchParams,
    updateWordFrequencyParameters: () => initialWordFrequencyParams
});

export function ApplicationContextProvider( {children}: any): any {
    const [nlpResult, setNlpResult] = useState<Result | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [sentenceSearchParameters, setSentenceSearchParameters] 
        = useState<SentenceSearchProps>(initialSentenceSearchParams)

    const [wordFrequencyParameters, setWordFrequencyParameters] 
        = useState<WordFrequencyProps>(initialWordFrequencyParams)

    const updateNlpResult = (nlpResult: Result): void => {
        setNlpResult(nlpResult);
    }

    const updateInputText = (inputText: string): void => {
        setInputText(inputText);
    }

    const updateSentenceSearchParameters = (sentenceSearchParameters: SentenceSearchProps): void => {
        setSentenceSearchParameters(sentenceSearchParameters)
    }

    const updateWordFrequencyParameters = (wordFrequencyParameters: WordFrequencyProps): void => {
        setWordFrequencyParameters(wordFrequencyParameters)
    }

    const provider: ApplicationContextProviderProps = {
        nlpResult,
        inputText,
        sentenceSearchParameters,
        wordFrequencyParameters,
        updateNlpResult,
        updateInputText,
        updateSentenceSearchParameters,
        updateWordFrequencyParameters
    };

    return (
        <ApplicationContext.Provider value={provider}>
            {children}
        </ApplicationContext.Provider>
    );
}
