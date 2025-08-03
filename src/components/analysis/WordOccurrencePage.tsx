import { useContext } from "react"
import { LanguageContext } from "../../context/LanguageContext"
import { ApplicationContext } from "../../context/ApplicationContext"

import { Scatter } from "react-chartjs-2";
import { getAllSentences } from "../../service/AnalyticsHelper";
import { ALL_COLORS } from "../../constants/ChartConfig";
import { ToastContainer, toast } from 'react-toastify';
import React from "react";
import { getText } from "../../service/Text";

const MAX_ALLOWED_WORDS = 10

function WordOccurrencePage() {
    const { language } = useContext(LanguageContext)
    const { nlpResult, chartOptionParameters, updateChartOptionParameters } = useContext(ApplicationContext)

    let toastId = null
    const customToastId = "my-toast-id"

    if(!nlpResult) {
        return <div>{getText("message_no_result", language)}</div>
    }

    const updateWordOccurrenceText = (text: string) => {
        const newParams = { ...chartOptionParameters, wordOccurrenceText: text }
        updateChartOptionParameters(newParams)
    }


    const words = chartOptionParameters.wordOccurrenceText.split(",").map(word => word.toLocaleLowerCase().trim())
    if(words.length > MAX_ALLOWED_WORDS && !toast.isActive(toastId ?? "")) {
        toastId = toast(getText("toast_limit_exceeded_words", language), {
            toastId: customToastId
          })
    }

    const datasetElements: any[] = []
    let id = 1

    words.forEach(word => {
        const wordObject = nlpResult.words.get(word)
        let data: any[] = []
        if(wordObject) {
             data = wordObject.sentences.map(sentence => { 
                return {
                    x: sentence,
                    y: id
                }
            })
        }

        const color = id <= ALL_COLORS.length ? ALL_COLORS[id-1] : undefined

        const dataset = {
            label: word,
            data: data,
            backgroundColor: color
        }

        if(id < MAX_ALLOWED_WORDS) {
            datasetElements.push(dataset)
            id++;
        }
    })

    const chartData = {
        datasets: datasetElements,
    }

    const options = {
        scales: {
            x: {
                min: 0,
                max: getAllSentences(nlpResult).length
            },
            y: {
                display: false,
                max: id+1,
                min: 0,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }

    const renderInputForm = () => {
        return <div className="d-flex flex-row justify-content-center">
            <div style={{marginRight: "1ch"}}>
                <b>{getText("label_search_terms", language)}:</b>
            </div>
            <input className="border border-gray-300 rounded resize-none w-50 flex-row align-items-left"
                value={chartOptionParameters.wordOccurrenceText}
                onChange={(e) => updateWordOccurrenceText(e.target.value)}
            />
        </div>
    }

    const renderChart = () => {
        return <div className="d-flex flex-column chart-container justify-content-center w-100">
            <Scatter data={chartData} options={options}/>
        </div>
    }

    return <div>
        {renderChart()}
        {renderInputForm()}
        <ToastContainer />
    </div>

}


export default WordOccurrencePage