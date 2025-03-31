import { randomSort } from "../src/service/AnalyticsHelper";
import { Sentence } from "../src/types/structure";


describe('Tests the random sentence sorting.', () => {

    const sentences: Sentence[] = [
      {id: 1, sentence: "No 1.", wordCount: 0, words: [], sentenceType: 0},
      {id: 2, sentence: "No 2.", wordCount: 0, words: [], sentenceType: 0},
      {id: 3, sentence: "No 3.", wordCount: 0, words: [], sentenceType: 0},
      {id: 4, sentence: "No 4.", wordCount: 0, words: [], sentenceType: 0},
      {id: 5, sentence: "No 5.", wordCount: 0, words: [], sentenceType: 0},
      {id: 6, sentence: "No 6.", wordCount: 0, words: [], sentenceType: 0},
      {id: 7, sentence: "No 7.", wordCount: 0, words: [], sentenceType: 0},
      {id: 8, sentence: "No 8.", wordCount: 0, words: [], sentenceType: 0},
      {id: 9, sentence: "No 9.", wordCount: 0, words: [], sentenceType: 0},
      {id: 10, sentence: "No 10.", wordCount: 0, words: [], sentenceType: 0}
    ]

    test('should produce the same output on a given set of sentences using the same key.', () => {
      const result1 = randomSort(sentences, 15)
      const result2 = randomSort(sentences, 15)
  
      expect(result1.length).toBe(10)
      expect(result2.length).toBe(10)

      expect(result1[0].id).toBe(result2[0].id)
      expect(result1[1].id).toBe(result2[0].id)
      expect(result1[5].id).toBe(result2[5].id)
      expect(result1[9].id).toBe(result2[9].id)
    });

});