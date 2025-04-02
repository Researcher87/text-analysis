import { useContext } from "react"
import { LanguageContext } from "../../context/LanguageContext"
import { ApplicationContext } from "../../context/ApplicationContext"
import { applicationStrings } from "../../static/applicationStrings"
import { Form } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import { getCooccurrences } from "../../service/AnalyticsHelper"

interface TableData {
    word: string
    frequency: number
}

export const LEFT_COOCCURRENCE = 0
export const RIGHT_COOCCURRENCE = 1

function CooccurrencePage() {
    const { language } = useContext(LanguageContext)
    const { nlpResult, cooccurrenceParameters, updateCooccurrenceParameters } = useContext(ApplicationContext)

    if(!nlpResult) {
        return <div>{applicationStrings.message_no_result[language]}</div>
    }

    const updateFilter = (filter: string) => {
        const newParams = { ...cooccurrenceParameters, filter }
        updateCooccurrenceParameters(newParams)
    }

    const changeOption = (option: number) => {
        const newParams = { ...cooccurrenceParameters, option }
        updateCooccurrenceParameters(newParams)
    }

    const cooccurrences = getCooccurrences(nlpResult, cooccurrenceParameters.filter, cooccurrenceParameters.option)

    const tableData: TableData[] = []
    
    cooccurrences.forEach((value, key) => {
        tableData.push({
            word: key,
            frequency: value,
        })
    })

    const columns = [
        {
            dataField: "word",
            text: "N1",
            sort: true
        }, {
            dataField: "frequency",
            text: "N2",
            sort: true
        }
    ];

    const renderFilterForm = () => {
        return <div className="d-flex flex-row align-items-left mb-3 mt-3">
            <input className="border border-gray-300 rounded resize-none w-25 flex-row align-items-left"
                value={cooccurrenceParameters.filter}
                onChange={(e) => updateFilter(e.target.value)}
            />
            <Form>
                <div key={"form-sentencesearch-filter"} className="d-flex flex-row">
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_cooccurrences_left[language]}
                        checked={cooccurrenceParameters.option === LEFT_COOCCURRENCE}
                        onChange={() => changeOption(LEFT_COOCCURRENCE)}
                    />
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_cooccurrences_right[language]}
                        checked={cooccurrenceParameters.option === RIGHT_COOCCURRENCE}
                        onChange={() => changeOption(RIGHT_COOCCURRENCE)}
                    />
                   </div>
            </Form>
        </div>
    }

    return <div className="d-flex flex-column sentence-page justify-content-center" style={{ width: "80%" }}>
        <div className="d-flex flex-column justify-content-start filter-card">
            {renderFilterForm()}
        </div>
        <BootstrapTable bootstrap4
            keyField='id'
            data={tableData}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 10, sizePerPageList: [5, 10, 15] })}
        />
    </div>
}

export default CooccurrencePage