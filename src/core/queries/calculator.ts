import { CarbonEntity } from "core/types"
import axios from "./axios"

const CalculatorService = {
    async post(body: CarbonEntity[]) {
        return (await axios.post(`/v1/api/calculate`, body))?.data
    }
}

export { CalculatorService }