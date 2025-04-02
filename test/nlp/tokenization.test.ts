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

      test('correct handling of special characters.', () => {
        const sentence = `Die Student*innen trafen sich um 23:59 am Schöki* von Berlin.`
        const result = tokenize(sentence)
  
        expect(result.length).toBe(10)
        expect(result[1]).toBe("Student*innen")
        expect(result[5]).toBe("23:59")
        expect(result[7]).toBe("Schöki")
      });

      test('correct handling of numbers.', () => {
        const sentence = `Er flog 1.983.381 mit 23,4 km/h.`
        const result = tokenize(sentence, "de")
  
        expect(result.length).toBe(6)
        expect(result[2]).toBe("1983381")
        expect(result[4]).toBe("23,4")
        expect(result[5]).toBe("km/h")

        const sentence2 = `He went 1,983,381 at 23.4 km/h.`
        const result2 = tokenize(sentence2, "en")
  
        expect(result2.length).toBe(6)
        expect(result2[2]).toBe("1983381")
        expect(result2[4]).toBe("23.4")
        expect(result2[5]).toBe("km/h")
      });

    test('tokenization with multiple sentence marks.', () => {
        const sentence = `"Was soll das sein?!", fragte er.`
        const result = tokenize(sentence)
  
        expect(result.length).toBe(6)
        expect(result[3]).toBe("sein")
        expect(result[4]).toBe("fragte")
      });

})