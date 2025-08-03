import { applicationStrings } from "../static/applicationStrings";

/**
 * Returns a text from the application strings file. A placeholder is used in case that an illegal key or language 
 * is passed.
 * @param textKey The text key.
 * @param language The language (de, en).
 * @returns The text retrieved from the application strings file.
 */
export function getText(textKey: string, language: string): string {
    if(language !== "de" && language !== "en") {
        console.warn(`Illegal language used for getting text with key '${textKey}'. Language key = ${language}`)
        return `[illegal language: ${language}]`
    }

    const entry = applicationStrings[textKey]
    if(entry === undefined) {
        console.warn(`Unknown text key: ${textKey}`)
        return `[missing key: ${textKey}]`
    } else {
        return entry[language]
    }
}