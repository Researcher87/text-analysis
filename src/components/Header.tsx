import {Link} from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import { PATH_ANALYSIS, PATH_HOME, PATH_IMPORT } from '../constants/Paths';
import "./Header.scss"

function Header() {

    function readerLanguageButtons() {
        return <Form>
                <div key={"form-radio"} className="d-flex flex-row mb-3">
                    Sprache:
                    <Form.Check // prettier-ignore
                        id={"form-radio-en"}
                        type={"radio"}
                        label={"Englisch"}
                    />
                    <Form.Check
                        id={"form-radio-de"}
                        type={"radio"}
                        label={`Deutsch`}
                    />
                </div>
            </Form>
    }

    return (
        <div className="d-flex flex-column align-items-stretch header">
            <div className="d-flex justify-content-end">
                {readerLanguageButtons()}
            </div>
            <div className="">
                Text Analysis
            </div>
            <div className="d-flex justify-content-center align-items-end h-100">
                <Link to={PATH_HOME}>
                    <Button className={"btn btn-link header-button"}
                            value={PATH_HOME}
                            variant={'link'}>
                            Home
                    </Button>
                </Link>
                <Link to={PATH_IMPORT}>
                    <Button className={"btn btn-link header-button"}
                            value={PATH_IMPORT}
                            variant={'link'}>
                            Import
                    </Button>
                </Link>
                <Link to={PATH_ANALYSIS}>
                    <Button className={"btn btn-link header-button"}
                            value={PATH_ANALYSIS}
                            variant={'link'}>
                            Analysis
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Header;