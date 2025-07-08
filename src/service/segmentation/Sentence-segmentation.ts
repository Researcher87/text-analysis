import { LANGUAGE_DE } from "../../constants/Language";
import { SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_IMPERATIVE, SENTENCE_TYPE_QUESTION, SENTENCE_TYPE_QUOTE_DECLARATIVE, SENTENCE_TYPE_QUOTE_IMPERATIVE, SENTENCE_TYPE_QUOTE_QUESTION, SENTENCE_TYPE_UNKNOWN, SentenceSegmentationResult } from "../../types/structure";

const generalExceptions = [
    "Mr", "Mrs", "Ms", 
    "Prof", "Dr", "rer", "nat", "habil"
];
const germanExceptions = [
    "Fr", "Gr", "Hr", "Kl",
    "Feb", "Apr", "Aug", "Sep", "Okt", "Nov", "Dez",
    "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"
]
const englishExceptions = ["dep"]

/**
 * Splits a text into its sentence objects.
 * @param text A text of an arbitrary length.
 * @param language The language of the text (used for language-specfic segmentation).
 * @returns A result object containing the extracted and discarded (failed) sentences.
 */
export function segmentSentence(inputText: string, language: string): SentenceSegmentationResult {
    let text = inputText.trim();

    const sentences: string[] = [];
    let discardedSentences: string[] = [];

    let cursor = 0;

    while(cursor < text.length + 4) {
        const currentCharacter = text.substring(cursor, cursor+1);
        const nextCharacter = text.substring(cursor+1, cursor+2);
        const nextNextCharacter = text.substring(cursor+2, cursor+3);
        const nextNextNextCharacter = text.substring(cursor+2, cursor+4);

        // Found potential end of sentence (. / ? / ! / …)
        if(isSentenceMark(currentCharacter)) {

            // Sentence mark followed by space and upper case letter. Sample: Es ist spät. Ich gehe nach Hause.
            if(nextCharacter === " " && isUppercase(nextNextCharacter)) {

                // Sentence mark is a period. Careful! May be over-segmentation.
                if(currentCharacter === "." && cursor >= 2) {
                    const previousPart = text.substring(0, cursor);
                    const prevLastChar = previousPart.substring(previousPart.length-1, previousPart.length)
                    const prevPrevLastChar = previousPart.substring(previousPart.length-2, previousPart.length-1)

                    // Do not split on numbers, like 9. Sinfonie
                    if(prevLastChar.match("[0-9]")) {
                        cursor++;
                        continue;
                    }

                    // Do not split on single capital letters. Sample: Gestern kam A. Schmidt nach Leipzig.
                    if(prevPrevLastChar === " " && prevLastChar.match("[A-Z]")) {
                        cursor++;
                        continue;
                    }

                    // Do not split after certain words like Dr., Prof. and the like
                    let exceptionWord = false
                    getExceptionList(language).forEach(exception => {

                        if(previousPart.endsWith(" " + exception)) { // Example: Wir fragten Prof. Queck um Rat.
                            exceptionWord = true;
                            return;
                        } else if(previousPart === exception) { // Example: Prof. Queck erklärt die Welt.
                            exceptionWord = true;
                            return;
                        }
                    })

                    if(exceptionWord) {
                        cursor++;
                        continue;
                    }
                }

                const sentence = text.substring(0, cursor+1).trim();
                sentences.push(sentence);
                text = text.substring(cursor+1).trim();
                cursor = 0;
                continue;
            }

            // Sentence mark followed by quote mark. Sample: "Geht es dir nicht gut?" Er war sehr besorgt.
            if(isQuoteCharacter(nextCharacter)) {
                if(nextNextCharacter === " " && isUppercase(nextNextNextCharacter)) {
                    const sentence = text.substring(0, cursor+2).trim();
                    sentences.push(sentence);
                    text = text.substring(cursor+2).trim();
                    cursor = 0;
                    continue;
                }
            }

        }

        cursor += 1;
    }

    // Add the last sentence of the text (the remainder of the parsed text) to the sentences list.
    let remainder = text.trim()
    let lastCharacter = remainder.substring(remainder.length-1, remainder.length)
    if(endsWithSentenceMark(lastCharacter)) {
        sentences.push(remainder);
    } else if(isQuoteCharacter(lastCharacter) && remainder.length > 2) {
        remainder = remainder.substring(0, remainder.length-1)
        if(endsWithSentenceMark(remainder)) {
            sentences.push(text.trim());
        } else {
            discardedSentences.push(remainder)
        }
    } else {  // Sentence fragment won't be added to the list (ignored in subsequent process)
        discardedSentences.push(remainder)
    }

    // If no sentence was detected or rejected, the whole input will be considered to be one sentence (e.g. "Kapitel 1")
    if(sentences.length === 0) {
        sentences.push(inputText)
        discardedSentences = [] // In this case, we have no discarded sentences
    }
    
    return {sentences, discardedSentences};
}

/**
 * Specifies the sentence type of a given sentence.
 * @param sentence A sentence as string.
 * @returns The sentence type.
 */
export function getSentenceType(sentence: string): number {
    sentence = sentence.trim()
    let sentenceType = SENTENCE_TYPE_UNKNOWN

    if(sentence.length > 2) {
        if(sentence.endsWith(".")) {
            const firstChar = sentence.charAt(0)
            sentenceType = isQuoteCharacter(firstChar) 
                            ? SENTENCE_TYPE_QUOTE_DECLARATIVE 
                            : SENTENCE_TYPE_DECLARATIVE;
        } else if(sentence.endsWith("?")) {
            sentenceType = SENTENCE_TYPE_QUESTION;
        } else if(sentence.endsWith("!")) {
            sentenceType = SENTENCE_TYPE_IMPERATIVE;
        } else {
            const lastCharacter = sentence.substring(sentence.length-1, sentence.length);
            if(isQuoteCharacter(lastCharacter)) {
                const previousCharacter = sentence.substring(sentence.length-2, sentence.length-1);
                if(previousCharacter === "." || previousCharacter === "…") {
                    sentenceType = SENTENCE_TYPE_QUOTE_DECLARATIVE;
                } else if(previousCharacter === "?") {
                    sentenceType = SENTENCE_TYPE_QUOTE_QUESTION;
                } else if(previousCharacter === "!") {
                    sentenceType = SENTENCE_TYPE_QUOTE_IMPERATIVE;
                }
            }
        }
    }

    return sentenceType;
}

function endsWithSentenceMark(text: string): boolean {
    return text.endsWith(".") || text.endsWith("!") || text.endsWith("?") || text.endsWith("…")
}

function isUppercase(character: string): boolean {
    return character.toUpperCase() === character;
}

function isSentenceMark(character: string): boolean {
    return character === "." || character === "!" || character === "?" || character === "…"
}

function isQuoteCharacter(character: string): boolean {
    return character === "\"" || character === "»" || character === "«" || character === "'"
}

function getExceptionList(language: string): string[] {
    if(language === LANGUAGE_DE) {
        return [...new Set([...generalExceptions, ...germanExceptions])];
    } else {
        return [...new Set([...generalExceptions, ...englishExceptions])];
    }  
}