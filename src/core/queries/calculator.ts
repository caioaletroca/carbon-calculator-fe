import { CarbonData } from "core/types"
import axios from "./axios"

const CalculatorService = {
    async post(body: CarbonData[]) {
        return (await axios.post(`/v1/api/calculate`, body))?.data
    }
}

export { CalculatorService }