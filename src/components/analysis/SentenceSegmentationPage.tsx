import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ApplicationContext } from "../../context/ApplicationContext";
import "./SentenceSegmentationPage.scss";
import { ArrowLeft, ArrowRight, Bullseye, SkipEndFill, SkipStartFill } from 'react-bootstrap-icons';
import { applicationStrings } from "../../static/applicationStrings";
import { LanguageContext } from "../../context/LanguageContext";
import { Form } from "react-bootstrap";
import { getAllSentences, sortSentences } from "../../service/AnalyticsHelper";
import InputModal from "../InputModal";
import { filterSentences } from "../../service/SentenceFilter";

export const SENTENCE_SORT_ID = 0
export const SENTENCE_SORT_LEXICOGRAPHIC = 1
export const SENTENCE_SORT_RANDOM = 2
export const SENTENCE_SORT_LENGTH = 3

export const FILTER_VARIANT_FREE = 0
export const FILTER_VARIANT_WORDS = 1

function SentenceSegmentationPage() {
  const { sentenceSearchParameters, updateSentenceSearchParameters, nlpResult } = useContext(ApplicationContext)
  const { language } = useContext(LanguageContext)

  const [showPageModal, setShowPageModal] = useState(false)

  if (!nlpResult) {
    return <div className="no-result">{applicationStrings.message_no_result[language]}</div>
  }

  const setSelectedPage = (page: string) => {
    const num = Number(page);
    const valid = Number.isInteger(num) && num >= 1 && num < sentences.length;
    if (!valid) {
      toast(applicationStrings.toast_invalid_input[language])
    } else {
      updateSelectedIndex(num - 1)
      setShowPageModal(false)
    }
  }

  const { filterText, filterVariant, filterCaseSensitive, sortOption } = sentenceSearchParameters

  let sentences = filterSentences(getAllSentences(nlpResult), filterText, filterVariant, filterCaseSensitive)
  sentences = sortSentences(sentences, sortOption)

  const updateSelectedIndex = (index: number) => {
    const newParams = { ...sentenceSearchParameters, selectedSentence: index }
    updateSentenceSearchParameters(newParams)
  }

  const updateFilterText = (filterText: string) => {
    const newParams = { ...sentenceSearchParameters, filterText }
    updateSentenceSearchParameters(newParams)
  }

  const changeSortOption = (sortOption: number) => {
    const newParams = {
      ...sentenceSearchParameters,
      selectedSentence: 0,
      sortOption
    }
    updateSentenceSearchParameters(newParams)
  }

  const changeCaseSensitiveOption = () => {
    const currentSetting = sentenceSearchParameters.filterCaseSensitive
    const newParams = { ...sentenceSearchParameters, filterCaseSensitive: !currentSetting }
    updateSentenceSearchParameters(newParams)
  }

  const changeFilterVariant = (filterVariant: number) => {
    const newParams = { ...sentenceSearchParameters, filterVariant }
    updateSentenceSearchParameters(newParams)
  }

  const currentSentenceIndex = sentenceSearchParameters.selectedSentence
  const currentSentence: string = sentences[currentSentenceIndex] ? sentences[currentSentenceIndex].sentence : ""

  const renderFilterForm = () => {
    return <div className="d-flex flex-row align-items-left mb-3 mt-3">
      <input className="border border-gray-300 rounded resize-none w-25 flex-row align-items-left"
        value={sentenceSearchParameters.filterText}
        onChange={(e) => updateFilterText(e.target.value)}
      />
      <Form>
        <div key={"form-sentencesearch-filter"} className="d-flex flex-row">
          <Form.Check
            id={"form-radio-filter-free"}
            className={"app-radiobutton"}
            type={"radio"}
            label={applicationStrings.label_filter_free[language]}
            checked={sentenceSearchParameters.filterVariant === FILTER_VARIANT_FREE}
            onChange={() => changeFilterVariant(FILTER_VARIANT_FREE)}
          />
          <Form.Check
            id={"form-radio-filter-words"}
            className={"app-radiobutton"}
            type={"radio"}
            label={applicationStrings.label_filter_words[language]}
            checked={sentenceSearchParameters.filterVariant === FILTER_VARIANT_WORDS}
            onChange={() => changeFilterVariant(FILTER_VARIANT_WORDS)}
          />
        </div>
      </Form>
      <Form.Check
        id={"form-radio-case"}
        className={"app-radiobutton"}
        type={"checkbox"}
        label={applicationStrings.label_case_sensitive[language]}
        checked={sentenceSearchParameters.filterCaseSensitive === true}
        onChange={() => changeCaseSensitiveOption()}
      />
    </div>
  }

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
            checked={sentenceSearchParameters.sortOption === SENTENCE_SORT_LENGTH}
            label={applicationStrings.label_sortoption_length[language]}
            onChange={() => changeSortOption(SENTENCE_SORT_LENGTH)}
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

  const currentSentenceObj = sentences[currentSentenceIndex];
  let resultLabel = applicationStrings.label_sentencesearch_result[language];
  resultLabel = resultLabel.replaceAll("#1", `${currentSentenceIndex + 1}`)
  resultLabel = resultLabel.replaceAll("#2", `${sentences.length}`)

  let resultLabel2 = ""
  if (currentSentenceObj) {
    resultLabel2 = currentSentenceObj.words.length > 1
      ? applicationStrings.label_sentence_length[language]
      : applicationStrings.label_sentence_length_1w[language]
    resultLabel2 = resultLabel2.replaceAll("#1", String(currentSentenceObj.words.length))
    resultLabel2 = resultLabel2.replaceAll("#2", String(currentSentenceObj.sentence.length))
  }

  const renderInfoBar = () => {
    return <div className="d-flex flex-row justify-content-between infobar w-100">
      <div className="text-start mb-2">
        <div>{resultLabel}</div>
        <div>{resultLabel2}</div>
      </div>
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
          disabled={sentences.length <= 1}
          onClick={() => setShowPageModal(true)}
          style={{ marginRight: "2ch" }}>
          <Bullseye />
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
    <ToastContainer />
    <div className="d-flex flex-column justify-content-start filter-card">
      {renderFilterForm()}
      {renderSortForm()}
    </div>
    {sentences.length > 0 ?
      <>{renderSentenceCard()}
        {renderInfoBar()}
        {showPageModal &&
          <InputModal title={applicationStrings.modal_sentence_page[language]}
            show={showPageModal}
            onCancel={() => setShowPageModal(false)}
            onConfirm={setSelectedPage} />
        }</>
      :
      <div className="no-result">{applicationStrings.message_no_result[language]}</div>
    }

  </div>

}

export default SentenceSegmentationPage;