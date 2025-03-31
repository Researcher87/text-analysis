export interface Result {
    documents: Document[],
    words: Map<String, Word>,
    metainfo: MetaInformation
}

export interface Document {
    id: number,
    paragraphs: Paragraph[]
}

export interface Paragraph {
    id: number
    sentences: Sentence[]
}

export interface Sentence {
    id: number,
    sentence: string,
    wordCount: number,
    sentenceType: number
    words: string[]
}

export interface Word {
    id: number,
    word: string,
    sentences: number[]
}

export interface MetaInformation {
    processingTime: number,
}

export const SENTENCE_TYPE_UNKNOWN = 0
export const SENTENCE_TYPE_DECLARATIVE = 1
export const SENTENCE_TYPE_QUESTION = 2
export const SENTENCE_TYPE_EXCLAMATORY = 3
export const SENTENCE_TYPE_QUOTE_DECLARATIVE = 10
export const SENTENCE_TYPE_QUOTE_QUESTION = 11
export const SENTENCE_TYPE_QUOTE_EXCLAMATORY = 12
export const SENTENCE_TYPE_QUOTE_UNKNOWN = 13