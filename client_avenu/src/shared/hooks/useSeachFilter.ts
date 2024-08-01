import { useSearchParams } from "next/navigation"
import queryString from "query-string";


export const useSearchFilter = () => {
    const query = useSearchParams();
    const queryToArr = queryString.parse(query.toString())

    const searchParams = Object.entries(queryToArr).reduce((acc, [key, value]) => {
        if (value) {
            const parsedValue = Array.isArray(value) ? value : [value];
            return {
                ...acc,
                [key]: parsedValue,
                // [key]: value
            }
        }
        return acc
    }, {})

    return searchParams



}
