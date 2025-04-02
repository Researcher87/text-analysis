import { Bar } from "react-chartjs-2";

import { applicationStrings } from "../../static/applicationStrings";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { ApplicationContext } from "../../context/ApplicationContext";
import { Form } from "react-bootstrap";
import { CHART_COLOR_BLUE } from "../../constants/ChartConfig";
import { getAllWords } from "../../service/AnalyticsHelper";

export const CHART_WORDLENGTH_TYPES = 0
export const CHART_WORDLENGTH_TOKENS = 1

function WordLengthChart() {

    const { language } = useContext(LanguageContext)
    const { nlpResult, chartOptionParameters, updateChartOptionParameters } = useContext(ApplicationContext)

    if (!nlpResult) {
        return <div>{applicationStrings.message_no_result[language]}</div>
    }

    const maxLength = 30
    const labels: string[] = []
    const values: number[] = []

    for(let i=1; i <= maxLength; i++) {
        labels.push(`${i}`)
        values.push(0)
    }

    const allWords = getAllWords(nlpResult)
    allWords.forEach(word => {
        if(word.word.length <= maxLength) {
            if(chartOptionParameters.wordLengthSelection === CHART_WORDLENGTH_TYPES) {
                values[word.word.length-1] += 1
            }
            if(chartOptionParameters.wordLengthSelection === CHART_WORDLENGTH_TOKENS) {
                values[word.word.length-1] += word.sentences.length
            }
        }
    })

    const chartData = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: CHART_COLOR_BLUE,
            borderWidth: 2,
            borderColor: '#555',
        }],
    }

    const changeSetting = (setting: number) => {
        const chartOptions = { ...chartOptionParameters, wordLengthSelection: setting }
        updateChartOptionParameters(chartOptions)
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
                    text: `${applicationStrings.label_chart_character_count[language]}`
                }
            }
        }
    }

    const renderChartArea = () => {
        return <div className="d-flex flex-column chart-container justify-content-center w-100">
            <Bar
                data={chartData}
                key={'chart'}
                options={options}
            />
        </div>
    }

    const renderSettings = () => {
        return <div className="d-flex flex-row justify-content-center">
            <Form>
                <div key={"form-sentencesearch-filter"} className="d-flex flex-row">
                    <Form.Check
                        id={"form-radio-wordlenght-chart-types"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings._types[language]}
                        checked={chartOptionParameters.wordLengthSelection === CHART_WORDLENGTH_TYPES}
                        onChange={() => changeSetting(CHART_WORDLENGTH_TYPES)}
                    />
                    <Form.Check
                        id={"form-radio-wordlenght-chart-tokens"}
                        className={"app-radiobutton"}
                        type={"radio"}
                        label={applicationStrings._tokens[language]}
                        checked={chartOptionParameters.wordLengthSelection === CHART_WORDLENGTH_TOKENS}
                        onChange={() => changeSetting(CHART_WORDLENGTH_TOKENS)}
                    />
                </div>
            </Form>
        </div>
    }

    return <div>
        {renderChartArea()}
        {renderSettings()}
    </div>

}

export default WordLengthChart