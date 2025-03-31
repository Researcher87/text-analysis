import { Document, Paragraph, SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_QUOTE_UNKNOWN, SENTENCE_TYPE_EXCLAMATORY, SENTENCE_TYPE_QUESTION, SENTENCE_TYPE_UNKNOWN, Result } from "../types/structure";
import { getSentenceType, segmentSentence } from "./segmentation/sentence-segmentation";

export function analyseText(text: string): Result {

    const textParagraphs = splitIntoParagraphs(text);
    const paragraphs: Paragraph[] = []

    const paragraphCounter = 1;
    let sentenceCounter = 0;

    textParagraphs.forEach(paragraph => {
        const textSentences: string[] = segmentSentence(paragraph);

        const paragraphObj: Paragraph = {
            id: paragraphCounter,
            sentences: textSentences.map((sentence) => { 
                const sentenceType = getSentenceType(sentence)
                sentenceCounter +=1
                return {
                    id: sentenceCounter,
                    sentence: sentence,
                    sentenceType: sentenceType,
                    wordCount: 0,
                    words: []
                }
            })
        }

        paragraphs.push(paragraphObj)
    });

    const documents: Document[] = []
    const document: Document = {
        id: 1,
        paragraphs: paragraphs
    }

    documents.push(document)

    const result: Result = {
        documents: documents,
        words: [],
        metainfo: {
            processingTime: 0
        }
    }

    return result
}


function splitIntoParagraphs(text: string) {
    return text
        .split(/\n+/)                       // Remove linebreaks
        .map(para => para.trim())           
        .filter(para => para.length > 0);   
}