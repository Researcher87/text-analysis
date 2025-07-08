import {
  Document,
  Paragraph,
  Result,
  SentenceSegmentationResult,
  Word,
} from "../types/structure";
import {
  getSentenceType,
  segmentSentence,
} from "./segmentation/sentence-segmentation";
import { tokenize } from "./segmentation/tokenization";

export function analyseText(text: string, language: string): Result {
  const start = performance.now()

  const textParagraphs = splitIntoParagraphs(text);
  const paragraphs: Paragraph[] = [];
  let wordCount = 0;

  const paragraphCounter = 1;
  let sentenceCounter = 0;

  const wordMap = new Map<string, Word>();

  function addWord(word: string, sentenceId: number) {
    word = word.trim().toLocaleLowerCase()
    if (wordMap.has(word)) {
      const wordObject = wordMap.get(word);
      wordObject?.sentences.push(sentenceId)
    } else {
      const wordObject: Word = {
        id: wordMap.size,
        word,
        sentences: [],
      };
      wordObject.sentences.push(sentenceId);
      wordMap.set(word, wordObject);
    }
  }

  let discardedSentences: string[] = []

  textParagraphs.forEach((paragraph) => {
    const segmentationResult: SentenceSegmentationResult = segmentSentence(paragraph, language);
    const resultSentences = segmentationResult.sentences
    discardedSentences = discardedSentences.concat(segmentationResult.discardedSentences)

    const paragraphObj: Paragraph = {
      id: paragraphCounter,
      sentences: resultSentences.map((sentence) => {
        const sentenceType = getSentenceType(sentence);
        sentenceCounter += 1;

        const words = tokenize(sentence, language);
        words.forEach(word => addWord(word, sentenceCounter))
        wordCount += words.length

        return {
          id: sentenceCounter,
          sentence: sentence,
          sentenceType: sentenceType,
          wordCount: words.length,
          words: words.map(word => word.trim()),
        };
      }),
    };

    paragraphs.push(paragraphObj);
  });

  const documents: Document[] = [];
  const document: Document = {
    id: 1,
    paragraphs: paragraphs,
  };

  documents.push(document);

  const end = performance.now()

  const result: Result = {
    documents: documents,
    wordCount,
    words: wordMap,
    metainfo: {
      processingTime: end - start,
      discardedSentences
    },
  };

  return result;
}

function splitIntoParagraphs(text: string) {
  return text
    .split(/\n+/) // Remove linebreaks
    .map((para) => para.trim())
    .filter((para) => para.length > 0);
}
