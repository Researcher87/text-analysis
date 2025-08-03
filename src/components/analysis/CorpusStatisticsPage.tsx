import BootstrapTable from "react-bootstrap-table-next";
import { Result, Sentence, SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_QUOTE_DECLARATIVE, SENTENCE_TYPE_QUOTE_IMPERATIVE, SENTENCE_TYPE_QUOTE_QUESTION, SENTENCE_TYPE_QUOTE_UNKNOWN, Word } from "../../types/structure";
import { getAllParagraphs, getAllSentences } from "../../service/AnalyticsHelper";
import { applicationStrings } from "../../static/applicationStrings";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { DataTableEntry } from "../../types/misc";

function CorpusStatistics() {

    const { language } = useContext(LanguageContext)
    const { nlpResult } = useContext(ApplicationContext)

    if (!nlpResult) {
        return <div className="no-result">{applicationStrings.message_no_result[language]}</div>
    }

    const paragraphs = getAllParagraphs(nlpResult)
    const sentences = getAllSentences(nlpResult)

    function getBasicDataStructure(nlpResult: Result): DataTableEntry[] {
        const wordCount = nlpResult.wordCount
        const sentenceCount = sentences.length
        const paragraphCount = paragraphs.length

        let characterCounterInWords = 0;
        sentences.forEach(sentence => {
            sentence.words.forEach(word => { 
                characterCounterInWords += word.length 
            })
        });
        const averageWordLength = characterCounterInWords / wordCount

        return [
            {
                key: applicationStrings.table_key_paragraphs[language],
                value: paragraphCount
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
                value: (sentenceCount / paragraphCount).toFixed(1)
            },
            {
                key: applicationStrings.table_key_words_per_paragraph[language],
                value: (wordCount / paragraphCount).toFixed(1)
            },
            {
                key: applicationStrings.table_key_words_per_sentence[language],
                value: (wordCount / sentenceCount).toFixed(1)
            },
            {
                key: applicationStrings.table_key_average_word_length[language],
                value: averageWordLength.toFixed(1)
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
    }

    function getDataParagraphs(): DataTableEntry[] {
        let shortestParagraph = Number.MAX_SAFE_INTEGER;
        let longestParagraph = 0;
        let totalWordCount = 0;

        paragraphs.forEach(paragraph => {
            const wordCount = paragraph.sentences.reduce((words, sentence) => {
                return words += sentence.wordCount
            }, 0)

            totalWordCount += wordCount;

            if (wordCount < shortestParagraph) {
                shortestParagraph = wordCount;
            }
            if (wordCount > longestParagraph) {
                longestParagraph = wordCount;
            }
        })

        const averageLength = totalWordCount / paragraphs.length

        return [
            {
                key: applicationStrings.table_key_corpusstat_paragraph_longest[language],
                value: `${longestParagraph} ${applicationStrings.table_key_words[language]}`
            },
            {
                key: applicationStrings.table_key_corpusstat_paragraph_shortest[language],
                value: `${shortestParagraph} ${applicationStrings.table_key_words[language]}`
            },
            {
                key: applicationStrings.table_key_corpusstat_paragraph_average[language],
                value: `${averageLength.toFixed(1)} ${applicationStrings.table_key_words[language]}`
            }
        ]
    }

    function getDataSentences(): DataTableEntry[] {
        let shortestSentece = Number.MAX_SAFE_INTEGER;
        let longestSentence = 0;
        let totalWordCount = 0;

        sentences.forEach(sentence => {
            if (sentence.wordCount < shortestSentece) {
                shortestSentece = sentence.wordCount;
            }
            if (sentence.wordCount > longestSentence) {
                longestSentence = sentence.wordCount;
            }
            totalWordCount += sentence.wordCount;
        })

        const averageSentenceLength = totalWordCount / sentences.length

        return [
            {
                key: applicationStrings.table_key_corpusstat_sentence_longest[language],
                value: `${longestSentence} ${applicationStrings.table_key_words[language]}`
            },
            {
                key: applicationStrings.table_key_corpusstat_sentence_shortest[language],
                value: `${shortestSentece} ${applicationStrings.table_key_words[language]}`
            },
            {
                key: applicationStrings.table_key_corpusstat_sentence_average[language],
                value: `${averageSentenceLength.toFixed(1)} ${applicationStrings.table_key_words[language]}`
            }
        ]
    }


    function getDataSentenceTypes(): DataTableEntry[] {
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
            if (!filteredSentences) {
                return 0
            } else {
                return filteredSentences.length
            }
        }

        return [
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
    }

    const dataStructure = getBasicDataStructure(nlpResult)
    const dataParagraphs = getDataParagraphs()
    const dataSentences = getDataSentences()
    const dataSentenceTypes = getDataSentenceTypes()

    const columns = [{
        dataField: "key",
        text: applicationStrings.label_key[language],
    }, {
        dataField: "value",
        text: applicationStrings.label_value[language],
    }];

    return <div className="d-flex flex-column sentence-page justify-content-center" style={{ width: "80%" }}>
        <div className="heading">{applicationStrings.label_corpus_statistics_structure[language]}</div>
        <BootstrapTable key="sec1" keyField='key' data={dataStructure} columns={columns} />
        <div className="heading">{applicationStrings.label_corpus_statistics_paragraphs[language]}</div>
        <BootstrapTable key="sec2" keyField='key' data={dataParagraphs} columns={columns} />
        <div className="heading">{applicationStrings.label_corpus_statistics_sentences[language]}</div>
        <BootstrapTable key="sec3" keyField='key' data={dataSentences} columns={columns} />
        <div className="heading">{applicationStrings.label_corpus_statistics_sentencetypes[language]}</div>
        <BootstrapTable key="sec4" keyField='key' data={dataSentenceTypes} columns={columns} />
    </div>

}

export default CorpusStatistics