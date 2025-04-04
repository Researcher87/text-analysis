import {Link} from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import { PATH_ANALYSIS, PATH_HOME, PATH_IMPORT } from '../constants/Paths';
import "./Header.scss"
import "./../App.scss"
import { applicationStrings } from '../static/applicationStrings';
import { useContext } from 'react';
import {useLocation} from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { LANGUAGE_DE, LANGUAGE_EN } from '../constants/Language';

function Header() {

    const {language, userLanguageChange} = useContext(LanguageContext)
    const location = useLocation();

    let activePath = location.pathname && location.pathname !== "/" ? location.pathname : PATH_HOME
    if (activePath.endsWith("/") && activePath.length > 1) {
        activePath = activePath.substring(0, activePath.length - 1)
    }

    const readerLanguageButtons = () => {
        return <Form>
                <div key={"form-radio"} className="d-flex flex-row">
                    <div className="app-label">
                        {applicationStrings.label_language[language]}:
                    </div>
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_language_en[language]}
                        checked={language === LANGUAGE_EN}
                        onChange={() => changeLanguage("en")}
                    />
                    <Form.Check
                        id={"form-radio-de"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        checked={language === LANGUAGE_DE}
                        label={applicationStrings.label_language_de[language]}
                        onChange={() => changeLanguage("de")}
                    />
                </div>
            </Form>
    }

    const changeLanguage = (value: string): void => {
        userLanguageChange(value)
    }

    return (
        <div className="d-flex flex-column align-items-stretch header">
            <div className="d-flex justify-content-end language-panel">
                {readerLanguageButtons()}
            </div>
            <div className="">
                Text Analysis
            </div>
            <div className="d-flex justify-content-center align-items-end h-100">
                <Link to={PATH_HOME}>
                    <Button className={"btn btn-link header-button"}
                            active={activePath === PATH_HOME}
                            value={PATH_HOME}
                            variant={'link'}>
                            {applicationStrings.menu_home[language]}
                    </Button>
                </Link>
                <Link to={PATH_IMPORT}>
                    <Button className={"btn btn-link header-button"}
                            active={activePath === PATH_IMPORT}
                            value={PATH_IMPORT}
                            variant={'link'}>
                            {applicationStrings.menu_import[language]}
                    </Button>
                </Link>
                <Link to={PATH_ANALYSIS}>
                    <Button className={"btn btn-link header-button"}
                            active={activePath === PATH_ANALYSIS}
                            value={PATH_ANALYSIS}
                            variant={'link'}>
                            {applicationStrings.menu_analysis[language]}
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;