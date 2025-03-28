import { Document, Paragraph } from "../types/structure";

export function analyseText(text: string) {
    const natural = require('natural');

    const textParagraphs = splitIntoParagraphs(text);
    const paragraphs: Paragraph[] = []

    const paragraphCounter = 1;

    textParagraphs.forEach(paragraph => {
        const sentencetokenizer = new natural.SentenceTokenizer();
        const textSentences: string[] = sentencetokenizer.tokenize();

        textSentences.forEach(element => {
            console.log(" -- " + element)
        });

        const paragraphObj: Paragraph = {
            id: paragraphCounter,
            sentences: []
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