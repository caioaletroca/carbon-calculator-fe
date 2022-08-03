import { Usage } from "./Usage";

export interface CarbonEntity {
    value?: number;
    unit_type?: string;
    time_type?: string;
    usage?: Usage;
}

export interface CarbonData {
    [x: string]: CarbonEntity[]
}