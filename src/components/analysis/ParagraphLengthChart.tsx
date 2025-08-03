import { useContext } from "react"
import { ApplicationContext } from "../../context/ApplicationContext"
import { LanguageContext } from "../../context/LanguageContext"
import { getAllParagraphs } from "../../service/AnalyticsHelper"
import { CHART_COLOR_BLUE } from "../../constants/ChartConfig"
import { Bar } from "react-chartjs-2"
import { getText } from "../../service/Text"

function ParagraphLengthChart() {

    const { language } = useContext(LanguageContext)
    const { nlpResult } = useContext(ApplicationContext)

    if(!nlpResult) {
        return <div>{getText("message_no_result", language)}</div>
    }

    const maxLength = 150
    const labels: string[] = []
    const values: number[] = []

    for(let i=1; i <= maxLength; i++) {
        labels.push(`${i}`)
        values.push(0)
    }

    const allParagraphs = getAllParagraphs(nlpResult)
    allParagraphs.forEach(paragraph => {
        let wordCount = 0;
        paragraph.sentences.forEach(sentence => {
            wordCount += sentence.wordCount
        })

        if(wordCount <= maxLength) {
            values[wordCount] += 1
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
                        `${tooltipItem.formattedValue} ${getText("_appearances", language)}`
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: `${getText("label_chart_word_count", language)}`
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

    return <div>
        {renderChartArea()}
    </div>


}

export default ParagraphLengthChart