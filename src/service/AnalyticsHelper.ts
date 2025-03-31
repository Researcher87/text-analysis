import { SENTENCE_SORT_ID, SENTENCE_SORT_LEXICOGRAPHIC } from "../components/tools/SentenceSearchPage";
import { Result, Sentence } from "../types/structure";

/**
 * Returns all sentences in the NLP result set (corpus).
 * @param result The NLP result set.
 * @returns A list of all sentence objects in the result set.
 */
export function getAllSentences(result: Result): Sentence[] {
    const sentences: Sentence[] = [];

    result.documents.forEach(document => {
        document.paragraphs.forEach(paragraph => {
            paragraph.sentences.forEach(sentenceObj => sentences.push(sentenceObj))
        })
    })

    return sentences;
}


/**
 * Sorts a list of sentences by a specified sort option.
 * @param sentences A list of sentences.
 * @param sortOption The sort option key.
 * @param randomKey Possibly a random key (only used for random search).
 * @returns The sorted list of sentences.
 */
export function sortSentences(sentences: Sentence[], sortOption: number, randomKey?: number): Sentence[] {
    switch(sortOption) {
        case SENTENCE_SORT_ID:
            return sentences.sort((a, b) => a.id - b.id )
        case SENTENCE_SORT_LEXICOGRAPHIC:
                return sentences.sort((a, b) => a.sentence.localeCompare(b.sentence))
        default:
            return randomSort(sentences, randomKey ?? 1)        
    }
}


/**
 * Creates a randomly sorted list of sentences based on a random key, which will
 * produce the exact same result for a given (fixed) set of sentences.
 * 
 * Implementation: Two index variables of a specific (high) leap value which 
 * consecutively run through the sentence list and move the sentences on that
 * index to the result set.
 * 
 * @param sentences A list of sentence objects.
 * @param key The random key (> 0)
 */
 export function randomSort(sentences: Sentence[], key: number): Sentence[] {
    if(sentences.length <= 2) {
        return sentences;
    }

    const result: Sentence[] = []

    const leapValue1 = Math.round(sentences.length / 2) + 100 + key;
    const leapValue2 = Math.round(sentences.length / 3) + key;

    let index1 = leapValue1;
    let index2 = leapValue2;

    while(sentences.length >= 1) {
        while(index1 >= sentences.length) {
            index1 -= sentences.length;
        }

        const sentence = sentences[index1]
        result.push(sentence)
        sentences.splice(index1, 1)
        index1 += leapValue1

        while(index2 >= sentences.length) {
            index2 -= sentences.length;
        }

        const sentence2 = sentences[index2]
        result.push(sentence2)
        sentences.splice(index2, 1)
        index2 += leapValue2
    }

    return result;
}