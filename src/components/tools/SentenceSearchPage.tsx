import { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import "./SentenceSearchPage.scss";
import { ArrowLeft, ArrowRight, SkipEndFill, SkipStartFill } from 'react-bootstrap-icons';
import { applicationStrings } from "../../static/applicationStrings";
import { LanguageContext } from "../../context/LanguageContext";
import { Form } from "react-bootstrap";
import { sortSentences } from "../../service/AnalyticsHelper";

export const SENTENCE_SORT_ID = 0
export const SENTENCE_SORT_LEXICOGRAPHIC = 1
export const SENTENCE_SORT_RANDOM = 2

function SentenceSegmentationPage() {

  const { sentenceSearchParameters, updateSentenceSearchParameters } = useContext(ApplicationContext)
  const { language } = useContext(LanguageContext)

  const sentences = sentenceSearchParameters.filteredSentences

  if (sentences.length === 0) {
    return <div>{applicationStrings.message_no_result[language]}</div>
  }

  const updateSelectedIndex = (index: number) => {
    const newParams = { ...sentenceSearchParameters, selectedSentence: index }
    updateSentenceSearchParameters(newParams)
  }

  const changeSortOption = (sortOption: number) => {
    const filteredSentences = sortSentences(sentenceSearchParameters.filteredSentences, sortOption)
    const newParams = { ...sentenceSearchParameters, 
      selectedSentence: 0, 
      filteredSentences: filteredSentences, 
      sortOption }
    updateSentenceSearchParameters(newParams)
  }

  const currentSentenceIndex = sentenceSearchParameters.selectedSentence
  const currentSentence: string = sentences[currentSentenceIndex].sentence

  const renderSortForm = () => {
    return <div>
      <Form>
        <div key={"form-sentencesearch-filter"} className="d-flex flex-row">
          <div className="app-label">
            {applicationStrings.label_sortoption[language]}:
          </div>
          <Form.Check
            id={"form-radio-en"}
            className={"app-radiobutton"}
            type={"radio"}
            label={applicationStrings.label_sortoption_id[language]}
            checked={sentenceSearchParameters.sortOption === SENTENCE_SORT_ID}
            onChange={() => changeSortOption(SENTENCE_SORT_ID)}
          />
          <Form.Check
            id={"form-radio-de"}
            className={"app-radiobutton"}
            type={"radio"}
            checked={sentenceSearchParameters.sortOption === SENTENCE_SORT_LEXICOGRAPHIC}
            label={applicationStrings.label_sortoption_lexicographic[language]}
            onChange={() => changeSortOption(SENTENCE_SORT_LEXICOGRAPHIC)}
          />
          <Form.Check
            id={"form-radio-de"}
            className={"app-radiobutton"}
            type={"radio"}
            checked={sentenceSearchParameters.sortOption === SENTENCE_SORT_RANDOM}
            label={applicationStrings.label_sortoption_random[language]}
            onChange={() => changeSortOption(SENTENCE_SORT_RANDOM)}
          />
        </div>
      </Form>
    </div>
  }

  const renderSentenceCard = () => {
    return (
      <div className="sentence-card">
        <p className="sentence-text">{currentSentence}</p>
      </div>
    );
  };

  let resultLabel = applicationStrings.label_sentencesearch_result[language];
  resultLabel = resultLabel.replaceAll("#1", `${currentSentenceIndex + 1}`)
  resultLabel = resultLabel.replaceAll("#2", `${sentences.length}`)

  const renderInfoBar = () => {
    return <div className="d-flex flex-row justify-content-between infobar w-100">
      <div>{resultLabel}</div>
      <div>
        <button className="btn btn-primary"
          disabled={currentSentenceIndex === 0}
          onClick={() => { updateSelectedIndex(0) }}
          style={{ marginRight: "2ch" }}>
          <SkipStartFill />
        </button>
        <button className="btn btn-primary"
          disabled={currentSentenceIndex === 0}
          onClick={() => { updateSelectedIndex(currentSentenceIndex - 1) }}
          style={{ marginRight: "2ch" }}>
          <ArrowLeft />
        </button>
        <button className="btn btn-primary"
          disabled={currentSentenceIndex === sentences.length - 1}
          onClick={() => { updateSelectedIndex(currentSentenceIndex + 1) }}
          style={{ marginRight: "2ch" }}>
          <ArrowRight />
        </button>
        <button className="btn btn-primary"
          onClick={() => { updateSelectedIndex(sentences.length - 1) }}
          disabled={currentSentenceIndex === sentences.length - 1}>
          <SkipEndFill />
        </button>
      </div>
    </div>
  }

  return <div className="d-flex flex-column sentence-page justify-content-center">
    {renderSortForm()}
    {renderSentenceCard()}
    {renderInfoBar()}
  </div>

}

export default SentenceSegmentationPage;