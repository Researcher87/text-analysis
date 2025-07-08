import BootstrapTable from "react-bootstrap-table-next";
import { Sentence, SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_QUOTE_DECLARATIVE, SENTENCE_TYPE_QUOTE_IMPERATIVE, SENTENCE_TYPE_QUOTE_QUESTION, SENTENCE_TYPE_QUOTE_UNKNOWN } from "../../types/structure";
import { getAllParagraphs, getAllSentences } from "../../service/AnalyticsHelper";
import { applicationStrings } from "../../static/applicationStrings";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import SentencePositionChart from "./SentencePositionChart";

function CorpusStatistics() {

    const { language } = useContext(LanguageContext)
    const { nlpResult } = useContext(ApplicationContext)

    if(!nlpResult) {
        return <div className="no-result">{applicationStrings.message_no_result[language]}</div>
    }

    const paragraphs = getAllParagraphs(nlpResult).length
    const sentences = getAllSentences(nlpResult)
    const wordCount = nlpResult.wordCount
    const sentenceCount = sentences.length

    const dataStructure = [
        {
            key: applicationStrings.table_key_paragraphs[language], 
            value: paragraphs
        },
        {
            key: applicationStrings.table_key_sentences[language], 
            value: sentenceCount
        },
        {
            key: applicationStrings.table_key_words[language], 
            value: wordCount
        },
        {
            key: applicationStrings.table_key_sentences_per_paragraph[language], 
            value: (sentenceCount / paragraphs).toFixed(1)
        },
        {
            key: applicationStrings.table_key_words_per_paragraph[language], 
            value: (wordCount / paragraphs).toFixed(1)
        },
        {
            key: applicationStrings.table_key_words_per_sentence[language], 
            value: (wordCount / sentenceCount).toFixed(1)
        },
        {
            key: applicationStrings.table_key_unique_words[language], 
            value: nlpResult.words.size
        },
        {
            key: applicationStrings.table_key_unique_words_ratio[language], 
            value: (nlpResult.words.size / wordCount).toFixed(2)
        },
    ];

    const typeDeclarative = sentences.filter(sentence => sentence.sentenceType === SENTENCE_TYPE_DECLARATIVE 
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_DECLARATIVE)
    const typeQuestion = sentences.filter(sentence => sentence.sentenceType === SENTENCE_TYPE_QUOTE_QUESTION 
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_QUESTION)
    const typeImperative = sentences.filter(sentence => sentence.sentenceType === SENTENCE_TYPE_QUOTE_IMPERATIVE 
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_IMPERATIVE)
    const typeUnknown = sentences.filter(sentence => sentence.sentenceType === SENTENCE_TYPE_QUOTE_UNKNOWN
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_UNKNOWN)
    const typeSpeech = sentences.filter(sentence => sentence.sentenceType === SENTENCE_TYPE_QUOTE_DECLARATIVE
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_QUESTION
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_IMPERATIVE
            || sentence.sentenceType === SENTENCE_TYPE_QUOTE_UNKNOWN)

    const renderSentendceType = (filteredSentences: Sentence[]): number => {
        if( !filteredSentences) {
            return 0
        } else {
            return filteredSentences.length
        }
    }

    const dataSentenceTypes = [
        {
            key: applicationStrings.table_key_corpusstat_sentence_declarative[language], 
            value: renderSentendceType(typeDeclarative)
        },
        {
            key: applicationStrings.table_key_corpusstat_sentence_question[language],
            value: renderSentendceType(typeQuestion)
        },
        {
            key: applicationStrings.table_key_corpusstat_sentence_imperative[language],
            value: renderSentendceType(typeImperative)
        },
        {
            key: applicationStrings.table_key_corpusstat_sentence_unknown[language],
            value: renderSentendceType(typeUnknown)
        },
        {
            key: applicationStrings.table_key_corpusstat_sentence_speech[language],
            value: renderSentendceType(typeSpeech)
        },
    ]

    const columns = [{
      dataField: "key",
      text: "Key",
    }, {
      dataField: "value",
      text: "Value",
    }];

    return <div className="d-flex flex-column sentence-page justify-content-center" style={{width: "80%"}}>
       <div className="heading">{applicationStrings.label_corpus_statistics_structure[language]}</div>
       <BootstrapTable key="sec1" keyField='key' data={ dataStructure } columns={ columns } />
       <div className="heading">{applicationStrings.label_corpus_statistics_sentencetypes[language]}</div>
       <BootstrapTable key="sec2" keyField='key' data={ dataSentenceTypes } columns={ columns } />
    </div>

}

export default CorpusStatistics