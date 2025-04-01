import BootstrapTable from "react-bootstrap-table-next";
import { Result } from "../../types/structure";
import { getAllParagraphs, getAllSentences } from "../../service/AnalyticsHelper";
import { applicationStrings } from "../../static/applicationStrings";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function CorpusStatistics(props: {nlpResult: Result}) {
    const result = props.nlpResult

    const { language } = useContext(LanguageContext)

    const paragraphs = getAllParagraphs(result).length
    const sentences = getAllSentences(result).length
    const wordCount = result.wordCount

    const data = [
        {
            key: applicationStrings.table_key_paragraphs[language], 
            value: paragraphs
        },
        {
            key: applicationStrings.table_key_sentences[language], 
            value: sentences
        },
        {
            key: applicationStrings.table_key_words[language], 
            value: wordCount
        },
        {
            key: applicationStrings.table_key_sentences_per_paragraph[language], 
            value: (sentences / paragraphs).toFixed(1)
        },
        {
            key: applicationStrings.table_key_words_per_paragraph[language], 
            value: (wordCount / paragraphs).toFixed(1)
        },
        {
            key: applicationStrings.table_key_words_per_sentence[language], 
            value: (wordCount / sentences).toFixed(1)
        },
        {
            key: applicationStrings.table_key_unique_words[language], 
            value: result.words.size
        },
    ];

    const columns = [{
      dataField: "key",
      text: "Key",
    }, {
      dataField: "value",
      text: "Value",
    }];

    return <div className="d-flex flex-column sentence-page justify-content-center" style={{width: "80%"}}>
       <BootstrapTable keyField='id' data={ data } columns={ columns } />
    </div>

}

export default CorpusStatistics