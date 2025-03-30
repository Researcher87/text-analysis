import { expect } from "@jest/globals";
import { segmentSentence } from "../../../src/service/segmentation/sentence-segmentation";

describe('Tests basic forms of sentence segmentation (general, not language-specific).', () => {
  test('simple segmentation on two common sentences.', () => {
    const satz = `Das ist ein Satz. Das ist noch ein Satz.`
    const result = segmentSentence(satz);

    expect(result.length).toBe(2)
    expect(result[0]).toBe("Das ist ein Satz.")
    expect(result[1]).toBe("Das ist noch ein Satz.")
  });

  test('simple segmentation on three common sentences.', () => {
    const satz = `Das ist ein Satz. Das ist noch ein Satz. Und noch einer.`
    const result = segmentSentence(satz);

    expect(result.length).toBe(3)
    expect(result[0]).toBe("Das ist ein Satz.")
    expect(result[1]).toBe("Das ist noch ein Satz.")
    expect(result[2]).toBe("Und noch einer.")
  });

  test('simple segmentation on common sentences with additional note.', () => {
    const satz = `Das ist ein Satz. Das ist noch ein Satz. Und noch einer. (dpa)`
    const result = segmentSentence(satz);

    expect(result.length).toBe(3)
    expect(result[0]).toBe("Das ist ein Satz.")
    expect(result[1]).toBe("Das ist noch ein Satz.")
    expect(result[2]).toBe("Und noch einer.")
  });

  test('segmentation on common different sentence types.', () => {
    const satz = `Das ist ein Satz. Was für ein Satz? Ein kurzer Satz! (dpa)`
    const result = segmentSentence(satz);
    
    expect(result.length).toBe(3)
    expect(result[0]).toBe("Das ist ein Satz.")
    expect(result[1]).toBe("Was für ein Satz?")
    expect(result[2]).toBe("Ein kurzer Satz!")
  });

  test('segmentation with German quotes (question).', () => {
    const satz = `Es regnete. "Sollten wir warten?"`
    const result = segmentSentence(satz);
    
    expect(result.length).toBe(2)
    expect(result[0]).toBe("Es regnete.")
    expect(result[1]).toBe("\"Sollten wir warten?\"")
  });

  test('segmentation with German quotes (mixed).', () => {
    const satz = `Es regnete. "Sollten wir warten?" Ich sah ihn an. "Ich denke schon", antwortete er.`
    const result = segmentSentence(satz);

    expect(result.length).toBe(4)
    expect(result[0]).toBe("Es regnete.")
    expect(result[1]).toBe("\"Sollten wir warten?\"")
    expect(result[2]).toBe("Ich sah ihn an.")
    expect(result[3]).toBe("\"Ich denke schon\", antwortete er.")
  });

  test('segmentation with German quotes (mixed 2).', () => {
    const satz = `Es regnete. "Das hat uns noch gefehlt", meinte er. "Was denn?" "Na das blöde Wetter." Er war sauer.`
    const result = segmentSentence(satz);
    
    expect(result.length).toBe(5)
    expect(result[0]).toBe("Es regnete.")
    expect(result[1]).toBe("\"Das hat uns noch gefehlt\", meinte er.")
    expect(result[2]).toBe("\"Was denn?\"")
    expect(result[3]).toBe("\"Na das blöde Wetter.\"")
    expect(result[4]).toBe("Er war sauer.")
  });

})
