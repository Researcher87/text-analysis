import { SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_EXCLAMATORY, SENTENCE_TYPE_QUESTION, SENTENCE_TYPE_QUOTE_DECLARATIVE, SENTENCE_TYPE_QUOTE_EXCLAMATORY, SENTENCE_TYPE_QUOTE_QUESTION, SENTENCE_TYPE_UNKNOWN } from "../../types/structure";

const generalExceptions = ["Dr", "Mr", "Mrs", "Prof"];
const germanExceptions = ["Fr", "Gr", "Hr", "Kl"]
const allExceptions = [...new Set([...generalExceptions, ...germanExceptions])];

/**
 * Splits a text into its sentence objects.
 * @param text A text of an arbitrary length.
 * @returns A list of sentences.
 */
export function segmentSentence(inputText: string): string[] {
    let text = inputText.trim();
    const sentences: string[] = [];

    let cursor = 0;

    while(cursor < text.length + 4) {
        const currentCharacter = text.substring(cursor, cursor+1);
        const nextCharacter = text.substring(cursor+1, cursor+2);
        const nextNextCharacter = text.substring(cursor+2, cursor+3);
        const nextNextNextCharacter = text.substring(cursor+2, cursor+4);

        // Found potential end of sentence (. / ? / !)
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
                    allExceptions.forEach(exception => {
                        console.log(previousPart + " : " + exception)
                        if(previousPart.endsWith(" " + exception)) {
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
        }
    }

    // If not sentence was detected, the whole input will be considered to be one sentence (e.g. "Kapitel 1")
    if(sentences.length === 0) {
        sentences.push(inputText)
    }
    
    return sentences;
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
            sentenceType = SENTENCE_TYPE_EXCLAMATORY;
        } else {
            const lastCharacter = sentence.substring(sentence.length-1, sentence.length);
            if(isQuoteCharacter(lastCharacter)) {
                const previousCharacter = sentence.substring(sentence.length-2, sentence.length-1);
                if(previousCharacter === ".") {
                    sentenceType = SENTENCE_TYPE_QUOTE_DECLARATIVE;
                } else if(previousCharacter === "?") {
                    sentenceType = SENTENCE_TYPE_QUOTE_QUESTION;
                } else if(previousCharacter === "!") {
                    sentenceType = SENTENCE_TYPE_QUOTE_EXCLAMATORY;
                }
            }
        }
    }

    return sentenceType;
}

function endsWithSentenceMark(text: string): boolean {
    return text.endsWith(".") || text.endsWith("!") || text.endsWith("?")
}

function isUppercase(character: string): boolean {
    return character.toUpperCase() === character;
}

function isSentenceMark(character: string): boolean {
    return character === "." || character === "!" || character === "?"
}

function isQuoteCharacter(character: string): boolean {
    return character === "\"" || character === "»" || character === "«" || character === "'"
}