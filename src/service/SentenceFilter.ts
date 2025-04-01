import { FILTER_VARIANT_FREE, FILTER_VARIANT_WORDS } from "../components/tools/SentenceSegmentationPage";
import { Sentence } from "../types/structure";

export function filterSentences(sentences: Sentence[], filterText: string, filterVariant: number,
    caseSensitive: boolean): Sentence[] {

    filterText = filterText.trim()
    if(filterText.length === 0) {
        return sentences
    }

    if(!caseSensitive) {
        filterText = filterText.toLocaleLowerCase()
    }

    if(filterVariant === FILTER_VARIANT_FREE) {
        return sentences.filter(sentence => {
            const sentenceText = caseSensitive ? sentence.sentence : sentence.sentence.toLocaleLowerCase()
            return sentenceText.includes(filterText)
        })
    }

    if(filterVariant === FILTER_VARIANT_WORDS) {
        let searchTerms = filterText.split(",")
        searchTerms = searchTerms.map(term => term.trim())

        return sentences.filter(sentence => {
            let foundAllSearchTerms = true
            searchTerms.forEach(searchTerm => {
                if(caseSensitive) {
                    if(!sentence.words.includes(searchTerm)) {
                        foundAllSearchTerms = false
                        return
                    }
                } else {
                    // First make pre-check on the sentence, then iterate through the words
                    if(sentence.sentence.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                        if(!sentence.words.find(word => word.toLocaleLowerCase() === searchTerm)) {
                            foundAllSearchTerms = false;
                            return;
                        }
                    } else {
                        foundAllSearchTerms = false;
                    }
                }
            })

            return foundAllSearchTerms
        })
    }

    return sentences;
}