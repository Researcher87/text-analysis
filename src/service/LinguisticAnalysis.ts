import { Document, Paragraph, SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_QUOTE_UNKNOWN, SENTENCE_TYPE_EXCLAMATORY, SENTENCE_TYPE_QUESTION, SENTENCE_TYPE_UNKNOWN } from "../types/structure";
import { segmentSentence } from "./segmentation/sentence-segmentation";

export function analyseText(text: string) {

    const textParagraphs = splitIntoParagraphs(text);
    const paragraphs: Paragraph[] = []

    const paragraphCounter = 1;

    textParagraphs.forEach(paragraph => {
        const textSentences: string[] = segmentSentence(paragraph);

        const paragraphObj: Paragraph = {
            id: paragraphCounter,
            sentences: textSentences.map((sentence, id) => { 
                
                let sentenceType = SENTENCE_TYPE_UNKNOWN;
                
                if(sentence.length > 2) {
                    if(sentence.endsWith(".")) {
                        sentenceType = SENTENCE_TYPE_DECLARATIVE;
                    } else if(sentence.endsWith("?")) {
                        sentenceType = SENTENCE_TYPE_QUESTION;
                    } else if(sentence.endsWith("!")) {
                        sentenceType = SENTENCE_TYPE_EXCLAMATORY;
                    } else if(sentence.endsWith("!")) {

                    }
                }

                return {
                    id: id,
                    sentence: sentence,
                    sentenceType: 0,
                    wordCount: 0,
                    words: []
                }
            })
        }
    });


    const document: Document = {
        id: 1,
        paragraphs: []
    }



}



function splitIntoParagraphs(text: string) {
    return text
        .split(/\n+/)                       // Remove linebreaks
        .map(para => para.trim())           
        .filter(para => para.length > 0);   
}