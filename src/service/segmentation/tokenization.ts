/**
 * Extracts the words of a sentence
 * @param sentence A sentence (or any text).
 * @returns A list of words, stripped off by all kinds of sentence marks.
 */
export function tokenize(sentence: string): string[] {
    // Remove all unnecessary sentence marks.
    const cleanedSentence = sentence.replace(/[.,;?!"':*()«»]+/g, "")

    // Split by space
    const words = cleanedSentence.split(/\s+/).filter(word => word.length > 0);
    return words;
}