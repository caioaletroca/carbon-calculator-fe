export interface ReportData {
    id: number;
    category_id: number;
    name: string;
    value: number;
}

export interface Report {
    sum: number;
    data: ReportData[];
}