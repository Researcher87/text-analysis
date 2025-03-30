import { segmentSentence } from "../../../src/service/segmentation/sentence-segmentation";

describe('Tests corner cases of sentence segmentation.', () => {
  test('the acceptance of single elliptic sentences in a paragraph', () => {
    const satz = `Kapitel 2`
    const result = segmentSentence(satz);

    expect(result.length).toBe(1)
    expect(result[0]).toBe("Kapitel 2")
  });

  test('the preventation of sentence segmentation on numbers.', () => {
    const satz = `Sie spielten die 9. Sinfonie.`
    const result = segmentSentence(satz);

    expect(result.length).toBe(1)
    expect(result[0]).toBe("Sie spielten die 9. Sinfonie.")
  });


  test('the preventation of sentence segmentation on singe capital letters.', () => {
    const satz = `Gestern wurde A. Schmidt in Köln gesehen.`
    const result = segmentSentence(satz);

    expect(result.length).toBe(1)
    expect(result[0]).toBe("Gestern wurde A. Schmidt in Köln gesehen.")
  });
  
  test('the preventation of sentence segmentation on abbreviations.', () => {
    const satz1 = `Gestern wurde Dr. Schmidt in Köln gesehen.`
    const result1 = segmentSentence(satz1);
    expect(result1.length).toBe(1)
    expect(result1[0]).toBe("Gestern wurde Dr. Schmidt in Köln gesehen.")

    const satz2 = `Ich fahre bis Kl. Marzehns.`
    const result2 = segmentSentence(satz2);
    expect(result2.length).toBe(1)
    expect(result2[0]).toBe("Ich fahre bis Kl. Marzehns.")

    // Counter example:
    const satz3 = `Er nahm ein Ei. Dann schlug er es auf.`
    const result3 = segmentSentence(satz3);
    expect(result3.length).toBe(2)
    expect(result3[0]).toBe("Er nahm ein Ei.")
    expect(result3[1]).toBe("Dann schlug er es auf.")
  });
})