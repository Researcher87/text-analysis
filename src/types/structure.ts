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
    wordCount: number,
    sentenceType: number
    words: Token[]
}

export interface Token {
    wordId: number,
    position: number,
    environment: number[]
}

export interface Word {
    id: number,
    word: string,
    sentences: number[]
}

export const SENTENCE_TYPE_DECLARATIVE = 0
export const SENTENCE_TYPE_QUESTION = 1
export const SENTENCE_TYPE_IMPERATIVE = 2