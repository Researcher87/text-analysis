import {
  Document,
  Paragraph,
  Result,
  Word,
} from "../types/structure";
import {
  getSentenceType,
  segmentSentence,
} from "./segmentation/sentence-segmentation";
import { tokenize } from "./segmentation/tokenization";

export function analyseText(text: string): Result {
  const textParagraphs = splitIntoParagraphs(text);
  const paragraphs: Paragraph[] = [];
  let wordCount = 0;

  const paragraphCounter = 1;
  let sentenceCounter = 0;

  const wordMap = new Map<string, Word>();

  function addWord(word: string, sentenceId: number) {
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

  textParagraphs.forEach((paragraph) => {
    const textSentences: string[] = segmentSentence(paragraph);

    const paragraphObj: Paragraph = {
      id: paragraphCounter,
      sentences: textSentences.map((sentence) => {
        const sentenceType = getSentenceType(sentence);
        sentenceCounter += 1;

        const words = tokenize(sentence);
        words.forEach(word => addWord(word, sentenceCounter))
        wordCount += words.length

        return {
          id: sentenceCounter,
          sentence: sentence,
          sentenceType: sentenceType,
          wordCount: words.length,
          words: words,
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

  const result: Result = {
    documents: documents,
    wordCount,
    words: wordMap,
    metainfo: {
      processingTime: 0,
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
