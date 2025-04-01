import { useContext, useEffect, useState } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator";
import { LanguageContext } from "../../context/LanguageContext"
import { Result, Word } from "../../types/structure";
import { Form } from "react-bootstrap";
import { applicationStrings } from "../../static/applicationStrings";
import { ApplicationContext } from "../../context/ApplicationContext";
import { SENTENCE_SORT_RANDOM } from "../tools/SentenceSearchPage";
import { numericLiteral } from "@babel/types";
import { number, string } from "yargs";

const WF_OPTION_FREQUENCY = 0
const WF_OPTION_ID = 1
const WF_OPTION_LEXICOGRAPHIC = 2

const FILTER_VARIANT_STARTSWITH = 0
const FILTER_VARIANT_CONTAINS = 1
const FILTER_VARIANT_ENDSWITH = 2
const FILTER_VARIANT_EQUALS = 3
const FILTER_VARIANT_REGEX = 4

interface TableData {
    id: number
    word: string
    frequency: number
}

function WordFrequencyTable(props: { nlpResult: Result }) {
    const result = props.nlpResult

    const { language } = useContext(LanguageContext)
    const { wordFrequencyParameters, updateWordFrequencyParameters } = useContext(ApplicationContext)

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

    let filteredList = [...result.words.values()]
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
            frequency: word.sentences.length
        }
    })

    const columns = [{
        dataField: "id",
        text: "No.",
        headerStyle: () => {
            return { width: "12ch" };
        },
    }, {
        dataField: "word",
        text: "Word",
        sort: true
    }, {
        dataField: "frequency",
        text: "Frequency",
        headerStyle: () => {
            return { width: "20ch" };
        },
        sort: true
    },
    ];

    console.log("Re-render", tableData)

    return <div className="d-flex flex-column sentence-page justify-content-center" style={{ width: "80%" }}>
        <div className="d-flex flex-row align-items-left mb-3 mt-3">
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
        <BootstrapTable bootstrap4
            keyField='id'
            data={tableData}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 10, sizePerPageList: [5, 10, 15] })}
        />
    </div>

}

export default WordFrequencyTable