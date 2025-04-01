import { Wordpress } from "react-bootstrap-icons";
import { FILTER_VARIANT_FREE, FILTER_VARIANT_WORDS } from "../src/components/tools/SentenceSegmentationPage";
import { tokenize } from "../src/service/segmentation/tokenization";
import { filterSentences } from "../src/service/SentenceFilter";
import { Sentence } from "../src/types/structure";

describe('Tests the search filter.', () => {

    const sampleSentece = "Es war einmal ein Vater, der hatte sieben Söhne."

    test('free search filter, case-insensitive.', () => {
        const sentence = makeSentenceObject(sampleSentece)
  
        // Positive test:
        const search1 = filterSentences([sentence], ",", FILTER_VARIANT_FREE, false)
        const search2 = filterSentences([sentence], "ein", FILTER_VARIANT_FREE, false)
        const search3 = filterSentences([sentence], "Ein", FILTER_VARIANT_FREE, false)

        expect(search1.length).toBe(1)
        expect(search2.length).toBe(1)
        expect(search3.length).toBe(1)

        // Negative test:
        const search4 = filterSentences([sentence], "?", FILTER_VARIANT_FREE, false)
        const search5 = filterSentences([sentence], "einmals", FILTER_VARIANT_FREE, false)

        expect(search4.length).toBe(0)
        expect(search5.length).toBe(0)
    });

    test('free search filter, case-sensitive.', () => {
        const sentence = makeSentenceObject(sampleSentece)
  
        // Positive test:
        const search1 = filterSentences([sentence], "Vater", FILTER_VARIANT_FREE, true)
        const search2 = filterSentences([sentence], "vater", FILTER_VARIANT_FREE, true)

        expect(search1.length).toBe(1)
        expect(search2.length).toBe(0)
    });

    test('word search filter with 1 word, case-insensitive.', () => {
        const sentence = makeSentenceObject(sampleSentece)
  
        // Positive test:
        const search1 = filterSentences([sentence], "Vater", FILTER_VARIANT_WORDS, false)
        const search2 = filterSentences([sentence], "vater", FILTER_VARIANT_WORDS, false)

        expect(search1.length).toBe(1)
        expect(search2.length).toBe(1)


        // Negative test:
        const search3 = filterSentences([sentence], "hat", FILTER_VARIANT_WORDS, false)
        const search4 = filterSentences([sentence], "mal", FILTER_VARIANT_WORDS, false)
        
        expect(search3.length).toBe(0)
        expect(search4.length).toBe(0)
    });

    test('word search filter with 1 word, case-sensitive.', () => {
        const sentence = makeSentenceObject(sampleSentece)
  
        const search1 = filterSentences([sentence], "Vater", FILTER_VARIANT_WORDS, true)
        const search2 = filterSentences([sentence], "vater", FILTER_VARIANT_WORDS, true)

        expect(search1.length).toBe(1)
        expect(search2.length).toBe(0)
    });


    test('word search filter with 2 words, case-sensitive.', () => {
        const sentence = makeSentenceObject(sampleSentece)
  
        // Positive examples:
        const search1 = filterSentences([sentence], "Vater, einmal", FILTER_VARIANT_WORDS, false)
        const search2 = filterSentences([sentence], "vater, einmal", FILTER_VARIANT_WORDS, false)

        expect(search1.length).toBe(1)
        expect(search2.length).toBe(1)

        // Negative examples:
        const search3 = filterSentences([sentence], "Vater, mal", FILTER_VARIANT_WORDS, false)
        const search4 = filterSentences([sentence], "Vater, mal", FILTER_VARIANT_WORDS, false)
        const search5 = filterSentences([sentence], "Vater, einmal, falsch", FILTER_VARIANT_WORDS, false)
        
        expect(search3.length).toBe(0)
        expect(search4.length).toBe(0)
        expect(search5.length).toBe(0)
    });


    test('word search filter with 2 words, case-insensitive.', () => {
        const sentence = makeSentenceObject(sampleSentece)
  
        // Positive examples:
        const search1 = filterSentences([sentence], "Vater, einmal", FILTER_VARIANT_WORDS, true)
        const search2 = filterSentences([sentence], "vater, einmal", FILTER_VARIANT_WORDS, true)

        expect(search1.length).toBe(1)
        expect(search2.length).toBe(0)
    });


    function makeSentenceObject(sampleSentece: string): Sentence {
        const words = tokenize(sampleSentece)

        return {
            id: 1,
            sentence: sampleSentece,
            sentenceType: 0,
            words: words,
            wordCount: Wordpress.length
        }
    }
})