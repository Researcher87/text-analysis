import { createContext, useState } from "react";
import { Result } from "../types/structure";
import { SENTENCE_SORT_ID } from "../components/tools/SentenceSegmentationPage";
import { SENTENCE_POSITION_ABSOLUTE } from "../components/analysis/SentencePositionChart";

export const initialSentenceSearchParams: SentenceSearchProps = {
    selectedSentence: 0,
    sortOption: SENTENCE_SORT_ID,
    randomKey: 0,
    filterText: "",
    filterVariant: 0,
    filterCaseSensitive: false
}

export const initialWordFrequencyParams: WordFrequencyProps = {
    filter: "",
    filterVariant: 0,
    sortOption: 0
}

export const initialCooccurrenceProps: CooccurrenceProps = {
    filter: "",
    option: 0
}

export const initialChartOptions: ChartOptionsProps = {
    wordLengthSelection: 0,
    wordOccurrenceText: "",
    sentencePositionText: "",
    sentencePositionOption: SENTENCE_POSITION_ABSOLUTE
}

export interface ApplicationContextProviderProps {
    nlpResult: Result | null
    inputText: string
    sentenceSearchParameters: SentenceSearchProps
    wordFrequencyParameters: WordFrequencyProps
    chartOptionParameters: ChartOptionsProps
    cooccurrenceParameters: CooccurrenceProps
    updateNlpResult: (nlpResult: Result) => void
    updateInputText: (text: string) => void
    updateSentenceSearchParameters: (props: SentenceSearchProps) => void
    updateWordFrequencyParameters: (props: WordFrequencyProps) => void
    updateChartOptionParameters: (props: ChartOptionsProps) => void
    updateCooccurrenceParameters: (props: CooccurrenceProps) => void
}

export interface SentenceSearchProps {
    selectedSentence: number,
    sortOption: number,
    randomKey: number,
    filterText: string,
    filterVariant: number
    filterCaseSensitive: boolean
}

export interface WordFrequencyProps {
    filter: string,
    filterVariant: number,
    sortOption: number
}

export interface CooccurrenceProps {
    filter: string,
    option: number
}

export interface ChartOptionsProps {
    wordLengthSelection: number,
    wordOccurrenceText: string,
    sentencePositionText: string,
    sentencePositionOption: number
}

export const ApplicationContext = createContext<ApplicationContextProviderProps>({
    nlpResult: null,
    inputText: "",
    sentenceSearchParameters: initialSentenceSearchParams,
    wordFrequencyParameters: initialWordFrequencyParams,
    chartOptionParameters: initialChartOptions,
    cooccurrenceParameters: initialCooccurrenceProps,
    updateNlpResult: () => {return null},
    updateInputText: () => {return ""},
    updateSentenceSearchParameters: () => initialSentenceSearchParams,
    updateWordFrequencyParameters: () => initialWordFrequencyParams,
    updateChartOptionParameters: () => initialChartOptions,
    updateCooccurrenceParameters: () => initialCooccurrenceProps
});

export function ApplicationContextProvider( {children}: any): any {
    const [nlpResult, setNlpResult] = useState<Result | null>(null);
    const [inputText, setInputText] = useState<string>("");

    const [sentenceSearchParameters, setSentenceSearchParameters] 
        = useState<SentenceSearchProps>(initialSentenceSearchParams)

    const [wordFrequencyParameters, setWordFrequencyParameters] 
        = useState<WordFrequencyProps>(initialWordFrequencyParams)

    const [cooccurrenceParameters, setCooccurrenceParameters] 
        = useState<CooccurrenceProps>(initialCooccurrenceProps)

    const [chartOptionParameters, setChartOptionParameters] 
        = useState<ChartOptionsProps>(initialChartOptions)

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

    const updateCooccurrenceParameters = (cooccurrenceParameters: CooccurrenceProps): void => {
        setCooccurrenceParameters(cooccurrenceParameters)
    }

    const updateChartOptionParameters = (chartOptionsParameters: ChartOptionsProps): void => {
        setChartOptionParameters(chartOptionsParameters)
    }

    const provider: ApplicationContextProviderProps = {
        nlpResult,
        inputText,
        sentenceSearchParameters,
        wordFrequencyParameters,
        chartOptionParameters,
        cooccurrenceParameters,
        updateNlpResult,
        updateInputText,
        updateSentenceSearchParameters,
        updateWordFrequencyParameters,
        updateChartOptionParameters,
        updateCooccurrenceParameters
    };

    return (
        <ApplicationContext.Provider value={provider}>
            {children}
        </ApplicationContext.Provider>
    );
}
