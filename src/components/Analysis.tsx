import { Button } from "react-bootstrap";
import { applicationStrings } from "../static/applicationStrings";
import CorpusStatistics from "./analysis/CorpusStatisticsPage";
import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { ApplicationContext } from "../context/ApplicationContext";
import WordFrequencyTable from "./analysis/WordFrequencyPage";
import SentenceLengthChart from "./analysis/SentenceLengthChart";
import ParagraphLengthChart from "./analysis/ParagraphLengthChart";
import WordLengthChart from "./analysis/WordLengthChart";
import CooccurrencePage from "./analysis/CooccurrencePage";
import WordOccurrencePage from "./analysis/WordOccurrencePage";
import SentencePositionChart from "./analysis/SentencePositionChart";
import TechnicalInformationPage from "./analysis/TechnicalInformationPage";
import SentenceSegmentationPage from "./analysis/SentenceSegmentationPage";

function Analysis() {

    const PAGE_CORPUS_STATISTICS = 1;
    const PAGE_WORD_FREQUENCY = 2;
    const PAGE_CHART_SENTENCE_LENGTH = 3;
    const PAGE_CHART_WORD_LENGTH = 4;
    const PAGE_CHART_PARAGRAPH_LENGTH = 5;
    const PAGE_CHART_COOCCURRENCE = 6;
    const PAGE_CHART_WORDOCCURRENCE = 7;
    const PAGE_CHART_SENTENCE_POSITION = 8;
    const PAGE_SENTENCE_SEGMENATION = 9;
    const PAGE_TECHNICAL = 10;

    const {language} = useContext(LanguageContext)
    const [activePage, setActivePage] = useState<number>(PAGE_CORPUS_STATISTICS);

    const { nlpResult } = useContext(ApplicationContext)

    if(!nlpResult) {
        return <div className="no-result">{applicationStrings.message_no_result[language]}</div>
    }

    const renderPage = () => {
        switch(activePage) {
            case PAGE_CORPUS_STATISTICS:
                return <CorpusStatistics />
            case PAGE_WORD_FREQUENCY:
                    return <WordFrequencyTable/>
            case PAGE_CHART_SENTENCE_LENGTH:
                    return <SentenceLengthChart/>
            case PAGE_CHART_WORD_LENGTH:
                    return <WordLengthChart/>
            case PAGE_CHART_PARAGRAPH_LENGTH:
                    return <ParagraphLengthChart/>
            case PAGE_CHART_COOCCURRENCE:
                    return <CooccurrencePage/>
            case PAGE_CHART_WORDOCCURRENCE:
                    return <WordOccurrencePage/>
            case PAGE_CHART_SENTENCE_POSITION:
                    return <SentencePositionChart/>
            case PAGE_SENTENCE_SEGMENATION:
                    return <SentenceSegmentationPage/>
            case PAGE_TECHNICAL:
                    return <TechnicalInformationPage/>
            default:
                return "Unknown page"
        }
    }

    return <div className="d-flex flex-row">
        <div className="d-flex flex-column sidebar">
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CORPUS_STATISTICS}
                    onClick={() => {setActivePage(PAGE_CORPUS_STATISTICS)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_corpus_statistics[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_WORD_FREQUENCY}
                    onClick={() => {setActivePage(PAGE_WORD_FREQUENCY)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_word_frequency[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_SENTENCE_SEGMENATION}
                    onClick={() => {setActivePage(PAGE_SENTENCE_SEGMENATION)}}
                    variant={'link'}>
                {applicationStrings.menuitem_tools_sentences[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CHART_WORDOCCURRENCE}
                    onClick={() => {setActivePage(PAGE_CHART_WORDOCCURRENCE)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_word_occurrence[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CHART_COOCCURRENCE}
                    onClick={() => {setActivePage(PAGE_CHART_COOCCURRENCE)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_cooccurrences[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CHART_SENTENCE_LENGTH}
                    onClick={() => {setActivePage(PAGE_CHART_SENTENCE_LENGTH)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_sentence_length[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CHART_WORD_LENGTH}
                    onClick={() => {setActivePage(PAGE_CHART_WORD_LENGTH)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_word_length[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CHART_PARAGRAPH_LENGTH}
                    onClick={() => {setActivePage(PAGE_CHART_PARAGRAPH_LENGTH)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_paragraph_length[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_CHART_SENTENCE_POSITION}
                    onClick={() => {setActivePage(PAGE_CHART_SENTENCE_POSITION)}}
                    variant={'link'}>
                {applicationStrings.menuitem_analysis_sentence_position[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_TECHNICAL}
                    onClick={() => {setActivePage(PAGE_TECHNICAL)}}
                    variant={'link'}>
                {applicationStrings.menuitem_tools_technical[language]}
            </Button>
        </div>
        <div className="w-100">
            {renderPage()}
        </div>
    </div>


}

export default Analysis;