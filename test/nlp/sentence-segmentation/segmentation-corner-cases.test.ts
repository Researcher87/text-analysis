import { segmentSentence } from "../../../src/service/segmentation/sentence-segmentation";

describe('Tests corner cases of sentence segmentation.', () => {

  const language = "de"

  test('the acceptance of single elliptic sentences in a paragraph', () => {
    const satz = `Kapitel 2`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(1)
    expect(result.sentences[0]).toBe("Kapitel 2")
  });

  test('the preventation of sentence segmentation on numbers.', () => {
    const satz = `Sie spielten die 9. Sinfonie.`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(1)
    expect(result.sentences[0]).toBe("Sie spielten die 9. Sinfonie.")
  });


  test('the preventation of sentence segmentation on singe capital letters.', () => {
    const satz = `Gestern wurde A. Schmidt in Köln gesehen.`
    const result = segmentSentence(satz, language);

    expect(result.sentences.length).toBe(1)
    expect(result.sentences[0]).toBe("Gestern wurde A. Schmidt in Köln gesehen.")
  });
  
  test('the preventation of sentence segmentation on abbreviations.', () => {
    const satz1 = `Gestern wurde Dr. Schmidt in Köln gesehen.`
    const result1 = segmentSentence(satz1, language);
    expect(result1.sentences.length).toBe(1)
    expect(result1.sentences[0]).toBe("Gestern wurde Dr. Schmidt in Köln gesehen.")

    const satz2 = `Ich fahre bis Kl. Marzehns.`
    const result2 = segmentSentence(satz2, language);
    expect(result2.sentences.length).toBe(1)
    expect(result2.sentences[0]).toBe("Ich fahre bis Kl. Marzehns.")

    const satz3 = `Prof. Queck sah neugierig in die Runde.`
    const result3 = segmentSentence(satz3, language);
    expect(result3.sentences.length).toBe(1)
    expect(result3.sentences[0]).toBe("Prof. Queck sah neugierig in die Runde.")

    const satz4 = `Das Rennen findet am So. gegen 10 Uhr statt.`
    const result4 = segmentSentence(satz4, language);
    expect(result4.sentences.length).toBe(1)
    expect(result4.sentences[0]).toBe("Das Rennen findet am So. gegen 10 Uhr statt.")

    // Counter example:
    const satz5 = `Das ist nun mal so. Daran wirst du dich gewöhnen.`
    const result5 = segmentSentence(satz5, language);
    expect(result5.sentences.length).toBe(2)
    expect(result5.sentences[0]).toBe("Das ist nun mal so.")
    expect(result5.sentences[1]).toBe("Daran wirst du dich gewöhnen.")
  });

  test('the correct segmentation on sentence ellipses.', () => {
    const satz1 = `»Die eine Treppe ins Dachgeschoss ist ja okay. Aber jeden Tag immer bis ganz hier hoch zu stiefeln …«`
    const result1 = segmentSentence(satz1, language);
    expect(result1.sentences.length).toBe(2)
    expect(result1.sentences[0]).toBe("»Die eine Treppe ins Dachgeschoss ist ja okay.")
    expect(result1.sentences[1]).toBe("Aber jeden Tag immer bis ganz hier hoch zu stiefeln …«")

    const satz2 = `Aber jeden Tag immer bis ganz hier hoch zu stiefeln … Das ist doof.`
    const result2 = segmentSentence(satz2, language);
    expect(result2.sentences.length).toBe(2)
    expect(result2.sentences[0]).toBe("Aber jeden Tag immer bis ganz hier hoch zu stiefeln …")
    expect(result2.sentences[1]).toBe("Das ist doof.")

    // Counter example:
    const satz3 = `Aber jeden Tag immer bis ganz hier hoch zu stiefeln … das ist nicht okay.`
    const result3 = segmentSentence(satz3, language);
    expect(result3.sentences.length).toBe(1)
    expect(result3.sentences[0]).toBe("Aber jeden Tag immer bis ganz hier hoch zu stiefeln … das ist nicht okay.")
  });

  test('the correct segmentation on word ellipses.', () => {
    const satz1 = `Das ist doch Sch… Also was soll das?`
    const result1 = segmentSentence(satz1, language);
    expect(result1.sentences.length).toBe(2)
    expect(result1.sentences[0]).toBe("Das ist doch Sch…")
    expect(result1.sentences[1]).toBe("Also was soll das?")

    // Counter example:
    const satz2 = `Er besch… mich die ganze Zeit!`
    const result2 = segmentSentence(satz2, language);
    expect(result2.sentences.length).toBe(1)
    expect(result2.sentences[0]).toBe("Er besch… mich die ganze Zeit!")
  });

})