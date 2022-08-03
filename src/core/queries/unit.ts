import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "./axios"

const UnitService = {
    async getByType({ queryKey }: QueryFunctionContext) {
        return (await axios.get(`/v1/api/units/${queryKey[1]}`))?.data;
    }
}

export { UnitService }