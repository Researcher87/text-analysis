import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { applicationStrings } from "../static/applicationStrings";

import sampleDe from "../static/sample_de.txt";
import sampleEn from "../static/sample_en.txt";
import { LANGUAGE_DE } from "../constants/Language";
import { analyseText } from "../service/LinguisticAnalysis";
import { ApplicationContext, initialSentenceSearchParams, SentenceSearchProps } from "../context/ApplicationContext";
import { tokenize } from "../service/segmentation/tokenization";
import { ToastContainer, toast } from 'react-toastify';

const MAX_ALLOWED_WORDS = 1000000;
const MAX_ALLOWED_CHARS = 10000000;

function Import() {
  const { language } = useContext(LanguageContext)
  const { inputText, updateNlpResult, updateInputText, updateSentenceSearchParameters } = useContext(ApplicationContext)

  const [text, setText] = useState<string>(inputText);
  const [statusLabel, setStatusLabel] = useState("");

  const [words, setWords] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);

  const [isEditable, setIsEditable] = useState(inputText === "" ? true : false);

  const handleApplyButtonClick = () => {
    if (isEditable) {
      updateInputText(text);

      if (words > MAX_ALLOWED_WORDS || characters > MAX_ALLOWED_CHARS) {
        toast(applicationStrings.toast_limit_exceeded[language])
        return
      }

      const result = analyseText(text, language);
      updateNlpResult(result)

      // Reset all sentence search options/indices and set the new sentences result:
      const sentenceSearchParameters: SentenceSearchProps = { ...initialSentenceSearchParams }
      updateSentenceSearchParameters(sentenceSearchParameters)
    }

    setIsEditable(!isEditable);
  };

  const handleDeleteButtonClick = () => {
    setText("")
    updateStatistics("")
  }

  const handleSampleButtonClick = () => {
    const file = language === LANGUAGE_DE ? sampleDe : sampleEn

    fetch(file)
      .then((response) => response.text())
      .then((text) => {
        setText(text)
        updateStatistics(text)
      })
      .catch((error) => console.error("Error loading the file:", error));
  }

  const updateText = (event: any) => {
    const text = event.target.value
    setText(text)
    updateStatistics(text)
  }

  const updateStatistics = (text: string) => {
    const words = tokenize(text, language)
    const wordCount = words.length

    setWords(wordCount)
    setCharacters(text.length)

    if (wordCount > MAX_ALLOWED_WORDS || text.length > MAX_ALLOWED_CHARS) {
      setStatusLabel(applicationStrings.label_text_too_large[language])
    } else {
      if(wordCount === 0) {
        setStatusLabel("")
      } else {
        setStatusLabel(`${text.length} ${applicationStrings.label_chart_character_count[language]}, 
          ${wordCount} ${applicationStrings.label_chart_word_count[language]}`)
      }
    }
  }

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <ToastContainer />
      <div className="import">
        <textarea className="w-100 border border-gray-300 rounded resize-none mb-1"
          value={text}
          onChange={updateText}
          disabled={!isEditable}
          rows={12}
        />
        <div className="d-flex flex-column justify-content-end text-end mb-5">
          {statusLabel !== "" ? statusLabel : applicationStrings.text_input[language]}
        </div>
      </div>
      <div>
          <button className="btn btn-secondary"
            style={{ width: "16ch", marginRight: "2ch" }}
            onClick={handleSampleButtonClick}
            disabled={!isEditable || text.trim() !== ""}>
            {applicationStrings._sample[language]}
          </button>
          <button className="btn btn-primary"
            style={{ width: "16ch", marginRight: "2ch" }}
            onClick={handleApplyButtonClick}
            disabled={isEditable && text.trim() === ""}>
            {isEditable ? applicationStrings._apply[language] : applicationStrings._edit[language]}
          </button>
          <button className="btn btn-danger"
            style={{ width: "16ch" }}
            onClick={handleDeleteButtonClick}
            disabled={!isEditable || text.trim() === ""}>
            {applicationStrings._delete[language]}
          </button>
        </div>
    </div>
  );

}

export default Import;