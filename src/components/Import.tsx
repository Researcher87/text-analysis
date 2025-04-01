import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { applicationStrings } from "../static/applicationStrings";

import sampleDe from "../static/sample_de2.txt";
import sampleEn from "../static/sample_en.txt";
import { LANGUAGE_DE } from "../constants/Language";
import { analyseText } from "../service/LinguisticAnalysis";
import { ApplicationContext, initialSentenceSearchParams, SentenceSearchProps } from "../context/ApplicationContext";
import { getAllSentences } from "../service/AnalyticsHelper";

function Import() {
    const {language} = useContext(LanguageContext)
    const {inputText, updateNlpResult, updateInputText, updateSentenceSearchParameters} = useContext(ApplicationContext)

    const [text, setText] = useState(inputText);
    const [statusLabel, setStatusLabel] = useState("");
    const [isEditable, setIsEditable] = useState(inputText === "" ? true : false);
  
    const handleApplyButtonClick = () => {
      if (isEditable) {
        updateInputText(text);
        setStatusLabel("Berechnung läuft...")

        const result = analyseText(text);
        updateNlpResult(result)

        // Reset all sentence search options/indices and set the new sentences result:
        const sentenceSearchParameters: SentenceSearchProps = {...initialSentenceSearchParams,
          filteredSentences: getAllSentences(result)
        }
        updateSentenceSearchParameters(sentenceSearchParameters)

        setStatusLabel("")
      }

      setIsEditable(!isEditable);
    };

    const handleDeleteButtonClick = () => {
      setText("")
    }

    const handleSampleButtonClick = () => {
        const file = language === LANGUAGE_DE ? sampleDe : sampleEn

        fetch(file)
            .then((response) => response.text())
            .then((text) => setText(text))
            .catch((error) => console.error("Error loading the file:", error));
    }
  
    return (
      <div className="d-flex flex-column align-items-center mt-5">
            <textarea className="w-50 border border-gray-300 rounded resize-none mb-1"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={!isEditable}
                        rows={12}
            />
            <div className="d-flex flex-column text-end mb-4">
              {statusLabel}
            </div>
            <div>
                <button className="btn btn-secondary"
                        style={{width: "16ch", marginRight: "2ch"}}
                        onClick={handleSampleButtonClick}
                        disabled={!isEditable || text.trim() !== ""}>
                        {applicationStrings._sample[language]}
                </button>
                <button className="btn btn-primary"
                        style={{width: "16ch", marginRight: "2ch"}}
                        onClick={handleApplyButtonClick}
                        disabled={isEditable && text.trim() === ""}>
                        {isEditable ? applicationStrings._apply[language] : applicationStrings._edit[language]}
                </button>
                <button className="btn btn-danger"
                        style={{width: "16ch"}}
                        onClick={handleDeleteButtonClick}
                        disabled={!isEditable || text.trim() === ""}>
                        {applicationStrings._delete[language]}
                </button>
            </div>
      </div>
    );

}

export default Import;