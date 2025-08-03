import { HelpText, HelpTextEntry } from "../types/misc";

export function getHelpText(helpModalId: number, languageId: string): HelpText | null {
    const helpFile = require("../static/help.json");
    const entry = helpFile.entries.find( (entry: HelpTextEntry) => entry.id === helpModalId);

    if(entry) {
        const languageSection = languageId === "en" ? entry.en : entry.de;
        const title = languageSection.title;
        const contentArray = languageSection.content;

        let content = "";
        for(let i=0; i < contentArray.length; i++) {
            content += contentArray[i];
            if(i < (contentArray.length-1)) {
                content += "<br />"
            }
        }

        return {
            title: title,
            content: content
        };
    }

    return null
}