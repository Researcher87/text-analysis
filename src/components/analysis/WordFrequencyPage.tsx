import { useContext } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator";
import { LanguageContext } from "../../context/LanguageContext"
import { Result, Word } from "../../types/structure";
import { Form } from "react-bootstrap";
import { applicationStrings } from "../../static/applicationStrings";
import { ApplicationContext } from "../../context/ApplicationContext";

const FILTER_VARIANT_STARTSWITH = 0
const FILTER_VARIANT_CONTAINS = 1
const FILTER_VARIANT_ENDSWITH = 2
const FILTER_VARIANT_EQUALS = 3
const FILTER_VARIANT_REGEX = 4

interface TableData {
    id: number
    word: string
    frequency: number
    wordLength: number
    firstAppearance: number
}

function WordFrequencyTable() {

    const { language } = useContext(LanguageContext)
    const { wordFrequencyParameters, updateWordFrequencyParameters } = useContext(ApplicationContext)
    const { nlpResult } = useContext(ApplicationContext)

    if (!nlpResult) {
        return <div className="no-result">{applicationStrings.message_no_result[language]}</div>
    }

    const updateFilter = (filter: string) => {
        const newParams = { ...wordFrequencyParameters, filter }
        updateWordFrequencyParameters(newParams)
    }

    const changeFilterVariant = (filterVariant: number) => {
        const newParams = { ...wordFrequencyParameters, filterVariant }
        updateWordFrequencyParameters(newParams)
    }

    const sortByFrequency = (words: Word[]) => {
        return words.sort((a, b) => b.sentences.length - a.sentences.length);
    }

    function isValidRegex(pattern: string) {
        try {
            new RegExp(pattern);
            return true; 
        } catch (e) {
            return false; // Invalid Regex
        }
    }

    let filteredList = [...nlpResult.words.values()]
    const filter = wordFrequencyParameters.filter

    if (filter) {
        filteredList = filteredList.filter(word => {
            switch (wordFrequencyParameters.filterVariant) {
                case FILTER_VARIANT_STARTSWITH:
                    return word.word.startsWith(filter)
                case FILTER_VARIANT_CONTAINS:
                    return word.word.includes(filter)
                case FILTER_VARIANT_ENDSWITH:
                    return word.word.endsWith(filter)
                case FILTER_VARIANT_EQUALS:
                    return word.word === filter
                case FILTER_VARIANT_REGEX:
                    if(!isValidRegex(filter)) {
                        return false;
                    }
                    return word.word.match(filter)
                default:
                    return true
            }
        })
    }

    const wordList = sortByFrequency(filteredList);

    const tableData: TableData[] = wordList.map((word, id) => {
        return {
            id: id + 1,
            word: word.word,
            frequency: word.sentences.length,
            wordLength: word.word.length,
            firstAppearance: word.sentences[0]
        }
    })

    const columns = [{
        dataField: "id",
        text: "",
        headerStyle: () => {
            return { width: "6ch" };
        },
    }, {
        dataField: "word",
        text: applicationStrings.table_key_word[language],
        sort: true
    }, {
        dataField: "frequency",
        text: applicationStrings.table_key_frequency[language],
        headerStyle: () => {
            return { width: "13ch" };
        },
        sort: true
    }, {
        dataField: "wordLength",
        text: applicationStrings.table_key_length[language],
        headerStyle: () => {
            return { width: "10ch" };
        },
        sort: true
    }, {
        dataField: "firstAppearance",
        text: applicationStrings.table_key_first_appearance[language],
        headerStyle: () => {
            return { width: "16ch" };
        },
        sort: true
    },
    ];

    const renderFilterForm = () => {
        return <div className="d-flex flex-row align-items-left mb-3 mt-3">
            <input className="border border-gray-300 rounded resize-none w-25 flex-row align-items-left"
                value={wordFrequencyParameters.filter}
                onChange={(e) => updateFilter(e.target.value)}
            />
            <Form>
                <div key={"form-sentencesearch-filter"} className="d-flex flex-row">
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_filter_startswith[language]}
                        checked={wordFrequencyParameters.filterVariant === FILTER_VARIANT_STARTSWITH}
                        onChange={() => changeFilterVariant(FILTER_VARIANT_STARTSWITH)}
                    />
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_filter_contains[language]}
                        checked={wordFrequencyParameters.filterVariant === FILTER_VARIANT_CONTAINS}
                        onChange={() => changeFilterVariant(FILTER_VARIANT_CONTAINS)}
                    />
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_filter_endsWith[language]}
                        checked={wordFrequencyParameters.filterVariant === FILTER_VARIANT_ENDSWITH}
                        onChange={() => changeFilterVariant(FILTER_VARIANT_ENDSWITH)}
                    />
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_filter_equals[language]}
                        checked={wordFrequencyParameters.filterVariant === FILTER_VARIANT_EQUALS}
                        onChange={() => changeFilterVariant(FILTER_VARIANT_EQUALS)}
                    />
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings.label_filter_regex[language]}
                        checked={wordFrequencyParameters.filterVariant === FILTER_VARIANT_REGEX}
                        onChange={() => changeFilterVariant(FILTER_VARIANT_REGEX)}
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

export default WordFrequencyTable