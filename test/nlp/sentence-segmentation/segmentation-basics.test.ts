import { expect } from "@jest/globals";
import { segmentSentence } from "../../../src/service/segmentation/sentence-segmentation";

describe('Tests basic forms of sentence segmentation (general, not language-specific).', () => {

  const language = "de"

  test('simple segmentation on two common sentences.', () => {
    const satz = `Das ist ein Satz. Das ist noch ein Satz.`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(2)
    expect(result.sentences[0]).toBe("Das ist ein Satz.")
    expect(result.sentences[1]).toBe("Das ist noch ein Satz.")
  });

  test('simple segmentation on three common sentences.', () => {
    const satz = `Das ist ein Satz. Das ist noch ein Satz. Und noch einer.`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(3)
    expect(result.sentences[0]).toBe("Das ist ein Satz.")
    expect(result.sentences[1]).toBe("Das ist noch ein Satz.")
    expect(result.sentences[2]).toBe("Und noch einer.")
  });

  test('simple segmentation on common sentences with additional note.', () => {
    const satz = `Das ist ein Satz. Das ist noch ein Satz. Und noch einer. (dpa)`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(3)
    expect(result.sentences[0]).toBe("Das ist ein Satz.")
    expect(result.sentences[1]).toBe("Das ist noch ein Satz.")
    expect(result.sentences[2]).toBe("Und noch einer.")
  });

  test('segmentation on common different sentence types.', () => {
    const satz = `Das ist ein Satz. Was für ein Satz? Ein kurzer Satz! (dpa)`
    const result = segmentSentence(satz, language);
    
    expect(result.sentences.length).toBe(3)
    expect(result.sentences[0]).toBe("Das ist ein Satz.")
    expect(result.sentences[1]).toBe("Was für ein Satz?")
    expect(result.sentences[2]).toBe("Ein kurzer Satz!")
  });

  test('segmentation with German quotes (question).', () => {
    const satz = `Es regnete. "Sollten wir warten?"`
    const result = segmentSentence(satz, language);
    
    expect(result.sentences.length).toBe(2)
    expect(result.sentences[0]).toBe("Es regnete.")
    expect(result.sentences[1]).toBe("\"Sollten wir warten?\"")
  });

  test('segmentation with German quotes (mixed).', () => {
    const satz = `Es regnete. "Sollten wir warten?" Ich sah ihn an. "Ich denke schon", antwortete er.`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(4)
    expect(result.sentences[0]).toBe("Es regnete.")
    expect(result.sentences[1]).toBe("\"Sollten wir warten?\"")
    expect(result.sentences[2]).toBe("Ich sah ihn an.")
    expect(result.sentences[3]).toBe("\"Ich denke schon\", antwortete er.")
  });

  test('segmentation with German quotes (mixed 2).', () => {
    const satz = `Es regnete. "Das hat uns noch gefehlt", meinte er. "Was denn?" "Na das blöde Wetter." Er war sauer.`
    const result = segmentSentence(satz, language);
    
    expect(result.sentences.length).toBe(5)
    expect(result.sentences[0]).toBe("Es regnete.")
    expect(result.sentences[1]).toBe("\"Das hat uns noch gefehlt\", meinte er.")
    expect(result.sentences[2]).toBe("\"Was denn?\"")
    expect(result.sentences[3]).toBe("\"Na das blöde Wetter.\"")
    expect(result.sentences[4]).toBe("Er war sauer.")
  });

  test('segmentation with complex quote', () => {
    const satz = `"Worauf wartest du? Es ist grün."`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(2)
    expect(result.sentences[0]).toBe("\"Worauf wartest du?")
    expect(result.sentences[1]).toBe("Es ist grün.\"")
  });

  test('segmentation with an expected discarded sentence', () => {
    const satz = `Und so endet die Geschichte. (Patrick, 1987)`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(1)
    expect(result.discardedSentences.length).toBe(1)
    expect(result.sentences[0]).toBe("Und so endet die Geschichte.")
    expect(result.discardedSentences[0]).toBe("(Patrick, 1987)")
  });

  test('segmentation with an expected discarded sentence wihtin quotes', () => {
    const satz = `"Und so endet die Geschichte. (Patrick, 1987)"`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(1)
    expect(result.discardedSentences.length).toBe(1)
    expect(result.sentences[0]).toBe("\"Und so endet die Geschichte.")
    expect(result.discardedSentences[0]).toBe("(Patrick, 1987)")
  });

})
