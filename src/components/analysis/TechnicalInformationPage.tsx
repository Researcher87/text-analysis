import { useContext } from "react"
import { LanguageContext } from "../../context/LanguageContext"
import BootstrapTable from "react-bootstrap-table-next"
import { applicationStrings } from "../../static/applicationStrings";
import { ApplicationContext } from "../../context/ApplicationContext";

function TechnicalInformationPage() {
    const { language } = useContext(LanguageContext)
    const { nlpResult } = useContext(ApplicationContext)

    if (!nlpResult) {
        return <div className="no-result">{applicationStrings.message_no_result[language]}</div>
    }

    function getObjectSize(obj: Object) {
        const seen = new WeakSet();

        function sizeOf(value: any) {
            if (value === null || value === undefined) {
                return 0;
            }

            const type = typeof value;

            if (type === "boolean") return 4;
            if (type === "number") return 8;
            if (type === "string") return value.length * 2; // 2 Bytes pro Zeichen (UTF-16)
            if (type === "object") {
                if (seen.has(value)) return 0; // Verhindert zyklische Referenzen
                seen.add(value);

                let size = 0;
                for (const key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        size += key.length * 2; // Schlüssellänge
                        size += sizeOf(value[key]); // Wertgröße
                    }
                }
                return size;
            }
            return 0;
        }

        return sizeOf(obj);
    }

    const memoryUsage = getObjectSize(nlpResult)

    let memoryFormatted = "";
    if (memoryUsage < 1048576) {
        memoryFormatted = `${(memoryUsage / 1024).toFixed(1)} KB`
    } else {
        memoryFormatted = `${(memoryUsage / 1048576).toFixed(1)} MB`
    }

    const data = [
        {
            key: applicationStrings.table_key_processing_time[language],
            value: `${nlpResult.metainfo.processingTime.toFixed(1)} ms`
        },
        {
            key: applicationStrings.table_key_memory[language],
            value: memoryFormatted
        },
        {
            key: applicationStrings.table_discarded_sentences[language],
            value: nlpResult.metainfo.discardedSentences.length
        }
    ];

    const columns = [{
        dataField: "key",
        text: "Key",
    }, {
        dataField: "value",
        text: "Value",
    }];

    return <div className="d-flex flex-column sentence-page justify-content-center" style={{ width: "80%" }}>
        <BootstrapTable keyField='id' data={data} columns={columns} />
    </div>
}

export default TechnicalInformationPage;