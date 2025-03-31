import { tokenize } from "../../src/service/segmentation/tokenization";

describe('Tests the tokenization.', () => {
    test('simple tokenization.', () => {
      const sentence = `Sein oder nicht sein, das ist hier die Frage.`
      const result = tokenize(sentence)

      expect(result.length).toBe(9)
      expect(result[0]).toBe("Sein")
      expect(result[3]).toBe("sein")
      expect(result[4]).toBe("das")
      expect(result[8]).toBe("Frage")
    });

    test('tokenization with two whitespaces.', () => {
        const sentence = `Das  Haus.`
        const result = tokenize(sentence)
  
        expect(result.length).toBe(2)
        expect(result[0]).toBe("Das")
        expect(result[1]).toBe("Haus")
      });


    test('tokenization with special words.', () => {
        const sentence = `In Berlin-Mitte wurden Schüler/Studenten befragt.`
        const result = tokenize(sentence)
  
        expect(result.length).toBe(5)
        expect(result[1]).toBe("Berlin-Mitte")
        expect(result[3]).toBe("Schüler/Studenten")
      });

    test('tokenization with multiple sentence marks.', () => {
        const sentence = `"Was soll das sein?!", fragte er.`
        const result = tokenize(sentence)
  
        expect(result.length).toBe(6)
        expect(result[3]).toBe("sein")
        expect(result[4]).toBe("fragte")
      });

})