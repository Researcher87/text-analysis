import { getSentenceType } from "../../src/service/segmentation/sentence-segmentation";
import { SENTENCE_TYPE_DECLARATIVE, SENTENCE_TYPE_EXCLAMATORY, SENTENCE_TYPE_QUESTION, SENTENCE_TYPE_QUOTE_DECLARATIVE, SENTENCE_TYPE_QUOTE_EXCLAMATORY, SENTENCE_TYPE_QUOTE_QUESTION } from "../../src/types/structure";

describe('Tests the determination of the correct sentence type.', () => {
    test('determination of declarative sentences', () => {
      const sentence = `Das ist ein Aussagesatz.`
      const result = getSentenceType(sentence);
      expect(result).toBe(SENTENCE_TYPE_DECLARATIVE)
    });

    test('determination of question', () => {
        const sentence = `Ist das eine Frage?`
        const result = getSentenceType(sentence);
        expect(result).toBe(SENTENCE_TYPE_QUESTION)
      });

    test('determination of exclamatory sentence', () => {
        const sentence = `Das ist ein Ausrufesatz!`
        const result = getSentenceType(sentence);
        expect(result).toBe(SENTENCE_TYPE_EXCLAMATORY)
    });

    test('determination of quotation sentence (declarative)', () => {
        const sentence1 = `"Das ist schön."`
        const result1 = getSentenceType(sentence1);
        expect(result1).toBe(SENTENCE_TYPE_QUOTE_DECLARATIVE)

        const sentence2 = `Er sagte: "Das ist schön."`
        const result2 = getSentenceType(sentence2);
        expect(result2).toBe(SENTENCE_TYPE_QUOTE_DECLARATIVE)

        const sentence3 = `"Das ist schön", sagte er.`
        const result3 = getSentenceType(sentence3);
        expect(result3).toBe(SENTENCE_TYPE_QUOTE_DECLARATIVE)
    });

    test('determination of quotation sentence (question)', () => {
        const sentence = `"Ist das schön?"`
        const result = getSentenceType(sentence);
        expect(result).toBe(SENTENCE_TYPE_QUOTE_QUESTION)
    });

    test('determination of quotation sentence (exclamatory)', () => {
        const sentence = `"Das ist schön!"`
        const result = getSentenceType(sentence);
        expect(result).toBe(SENTENCE_TYPE_QUOTE_EXCLAMATORY)
    });

})