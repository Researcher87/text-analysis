import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { applicationStrings } from "../static/applicationStrings";

import sampleDe from "../static/sample_de.txt";
import sampleEn from "../static/sample_en.txt";
import { LANGUAGE_DE } from "../constants/Language";
import { analyseText } from "../service/LinguisticAnalysis";

function Import() {
    const [text, setText] = useState("");
    const [isEditable, setIsEditable] = useState(true);

    const {language} = useContext(LanguageContext)
  
    const handleApplyButtonClick = () => {
      if (isEditable) {
        setText(text);
      } else {
          analyseText(text);
      }

      setIsEditable(!isEditable);
    };

    const handleSampleButtonClick = () => {
        const file = language === LANGUAGE_DE ? sampleDe : sampleEn

        fetch(file)
            .then((response) => response.text())
            .then((text) => setText(text))
            .catch((error) => console.error("Error loading the file:", error));
    }
  
    return (
      <div className="d-flex flex-column align-items-center mt-5">
            <textarea className="w-50 border border-gray-300 rounded resize-none mb-4"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={!isEditable}
                        rows={12}
            />
            <div>
                <button className="btn btn-secondary"
                        style={{width: "16ch", marginRight: "2ch"}}
                        onClick={handleSampleButtonClick}
                        disabled={!isEditable || text.trim() !== ""}>
                        {applicationStrings._sample[language]}
                </button>
                <button className="btn btn-primary"
                        style={{width: "16ch"}}
                        onClick={handleApplyButtonClick}
                        disabled={isEditable && text.trim() === ""}>
                        {isEditable ? applicationStrings._apply[language] : applicationStrings._edit[language]}
                </button>
            </div>
      </div>
    );

}

export default Import;