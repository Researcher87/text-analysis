export interface DataTableEntry {
    key: string,
    value: Number | string
}

export interface HelpTextEntry {
    id: number,
    remark: string | undefined,
    de: HelpText,
    en: HelpText
}

export interface HelpText {
    title: string,
    content: string
}

