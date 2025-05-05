import { Bar } from "react-chartjs-2";

import { Chart, registerables } from 'chart.js';
import { applicationStrings } from "../../static/applicationStrings";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { CHART_COLOR_BLUE } from "../../constants/ChartConfig";
import { getAllSentences } from "../../service/AnalyticsHelper";
import { Form } from "react-bootstrap";

export const SENTENCE_POSITION_ABSOLUTE = 0
export const SENTENCE_POSITION_RELATIVE = 1

function SentencePositionChart() {

    const { language } = useContext(LanguageContext)
    const { nlpResult, chartOptionParameters, updateChartOptionParameters } = useContext(ApplicationContext)

    if (!nlpResult) {
        return <div>{applicationStrings.message_no_result[language]}</div>
    }

    const updateText = (text: string) => {
        const newParams = { ...chartOptionParameters, sentencePositionText: text.trim().toLocaleLowerCase() }
        updateChartOptionParameters(newParams)
    }

    const changeOption = (option: number) => {
        const newParams = { ...chartOptionParameters, sentencePositionOption: option }
        updateChartOptionParameters(newParams)
    }

    const maxLength = 40
    const allSentences = getAllSentences(nlpResult)

    const labels: string[] = []
    const values: number[] = []

    if(chartOptionParameters.sentencePositionOption === SENTENCE_POSITION_ABSOLUTE) {
        for (let i = 1; i <= maxLength; i++) {
            labels.push(`${i}`)
            values.push(0)
        }
    
        allSentences.forEach(sentence => {
            for(let i=0; i < sentence.words.length && i < maxLength; i++) {
                if(sentence.words[i].toLocaleLowerCase() === chartOptionParameters.sentencePositionText) {
                    values[i - 1] += 1
                }
            }
        })
    } else if (chartOptionParameters.sentencePositionOption === SENTENCE_POSITION_RELATIVE) {
        for (let i = 0; i <= 10; i++) {
            labels.push(`${i/10}`)
            values.push(0)
        }

        allSentences.forEach(sentence => {
            for(let i=0; i < sentence.words.length && i < maxLength; i++) {
                if(sentence.words[i].toLocaleLowerCase() === chartOptionParameters.sentencePositionText) {
                    const relPosition = Math.round((i / (sentence.words.length-1)) * 10)
                    values[relPosition] += 1
                }
            }
        })
    }


    const chartData = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: CHART_COLOR_BLUE,
            borderWidth: 2,
            borderColor: '#555',
        }],
    }

    const options: any = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                maintainAspectRatio: true,
                callbacks: {
                    label: (tooltipItem: any) =>
                        `${tooltipItem.formattedValue} ${applicationStrings._appearances[language]}`
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: `${applicationStrings.label_chart_word_count[language]}`
                }
            }
        }
    }


    const renderInputForm = () => {
        return <div className="d-flex flex-row justify-content-center">
            <div style={{ marginRight: "1ch" }}>
                <b>{applicationStrings.label_search_term[language]}:</b>
            </div>
            <input className="border border-gray-300 rounded resize-none w-25 flex-row align-items-left"
                value={chartOptionParameters.sentencePositionText}
                onChange={(e) => updateText(e.target.value)}
            />
            <Form>
                <div key={"form-sentencesearch-filter"} className="d-flex flex-row">
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings._absolute[language]}
                        checked={chartOptionParameters.sentencePositionOption === SENTENCE_POSITION_ABSOLUTE}
                        onChange={() => changeOption(SENTENCE_POSITION_ABSOLUTE)}
                    />
                    <Form.Check
                        id={"form-radio-en"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings._relative[language]}
                        checked={chartOptionParameters.sentencePositionOption === SENTENCE_POSITION_RELATIVE}
                        onChange={() => changeOption(SENTENCE_POSITION_RELATIVE)}
                    />
                </div>
            </Form>
        </div>
    }

    const renderChart = () => {
        return <div className="d-flex flex-column chart-container justify-content-center w-100">
            <Bar
                data={chartData}
                key={'chart'}
                options={options}
            />
        </div>
    }

    return <div>
        {renderChart()}
        {renderInputForm()}
    </div>
}

export default SentencePositionChart