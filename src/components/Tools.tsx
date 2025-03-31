import { Button } from "react-bootstrap";
import "./Tools.scss"
import { useContext, useState } from "react";
import { applicationStrings } from "../static/applicationStrings";
import { LanguageContext } from "../context/LanguageContext";
import SentenceSegmentationPage from "./tools/SentenceSegmentationPage";
import TechnicalInformationPage from "./tools/TechnicalInformationPage";

function Tools() {

    const PAGE_SENTENCE_SEGMENATION = 1;
    const PAGE_TECHNICAL = 10;

    const {language} = useContext(LanguageContext)
    const [activePage, setActivePage] = useState<number>(PAGE_SENTENCE_SEGMENATION);


    const renderPage = () => {
        switch(activePage) {
            case PAGE_SENTENCE_SEGMENATION:
                return <SentenceSegmentationPage />
            case PAGE_TECHNICAL:
                return <TechnicalInformationPage />
            default:
                return "Unknown page"
        }
    }

    return <div className="d-flex flex-row">
        <div className="sidebar">
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_SENTENCE_SEGMENATION}
                    onClick={() => {setActivePage(PAGE_SENTENCE_SEGMENATION)}}
                    variant={'link'}>
                {applicationStrings.menuitem_tools_sentences[language]}
            </Button>
            <Button className={"btn btn-link sidebar-button"}
                    active={activePage === PAGE_TECHNICAL}
                    onClick={() => {setActivePage(PAGE_TECHNICAL)}}
                    variant={'link'}>
                {applicationStrings.menuitem_tools_technical[language]}
            </Button>
        </div>
        <div>
            {renderPage()}
        </div>
    </div>

}

export default Tools;