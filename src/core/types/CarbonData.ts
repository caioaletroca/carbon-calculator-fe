import { Usage } from "./Usage";

export interface CarbonData {
    value?: number;
    unit_type?: string;
    time_type?: string;
    usage?: Usage;
}