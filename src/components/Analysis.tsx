import { Button } from "react-bootstrap";
import { applicationStrings } from "../static/applicationStrings";
import CorpusStatistics from "./analysis/CorpusStatisticsPage";
import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { ApplicationContext } from "../context/ApplicationContext";
import WordFrequencyTable from "./analysis/WordFrequencyPage";

function Analysis() {

    const PAGE_CORPUS_STATISTICS = 1;
    const PAGE_WORD_FREQUENCY = 2;

    const {language} = useContext(LanguageContext)
    const [activePage, setActivePage] = useState<number>(PAGE_CORPUS_STATISTICS);

    const { nlpResult } = useContext(ApplicationContext)

    if(!nlpResult) {
        return <div>{applicationStrings.message_no_result[language]}</div>
    }

    const renderPage = () => {
        switch(activePage) {
            case PAGE_CORPUS_STATISTICS:
                return <CorpusStatistics nlpResult={nlpResult}/>
            case PAGE_WORD_FREQUENCY:
                    return <WordFrequencyTable nlpResult={nlpResult}/>
            default:
                return "Unknown page"
        }
    }

    return <div className="d-flex flex-row">
        <div className="sidebar">
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
        </div>
        <div className="w-100">
            {renderPage()}
        </div>
    </div>


}

export default Analysis;