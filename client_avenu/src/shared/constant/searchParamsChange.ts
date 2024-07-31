'use client'

import queryString from "query-string"


export const searchParamsChange = (search: string, value: string) => {
    console.log('рфботает');



    const searchParams = queryString.parse(window.location.search, {
        types: {
            [`${search}`]: 'string[]'
        }
    });
    // console.log("🚀 ~ searchParamsChange ~ searchParams:", searchParams)

    // console.log(searchParams[`${search}`], 'searchParams[search]');


    if (searchParams[`${search}`] === undefined) {
        // console.log(searchParams[`${search}`], 'searchParams[search] перед назначением undefined');
        searchParams[`${search}`] = [value];
        // console.log(searchParams[`${search}`], 'searchParams[search] после назначением undefined');

        return queryString.stringify(searchParams)
    }

  

    //  searchParams[`${search}`]?.includes(value)
    if (
        (typeof searchParams[`${search}`] === "string" && searchParams[`${search}`] === value) ||
        (typeof searchParams[`${search}`] === "object" && searchParams[`${search}`] && searchParams[`${search}`]!.includes(value))
    ) {
        // console.log(searchParams[`${search}`], 'searchParams[search] includes');
        // console.log(value, 'value');
        if (typeof searchParams[`${search}`] === 'string') {
            searchParams[`${search}`] = [searchParams[`${search}`] as string];
        }

        searchParams[`${search}`] = (searchParams[`${search}`] as string[]).filter(item => item !== value)

        searchParams[`${search}`] = searchParams[`${search}`] === value ? [] : (searchParams[`${search}`] as string[]).filter(item => item !== value)


        const searchParamValue = searchParams[`${search}`] ?? [];
        if (searchParamValue.length === 0) {
            console.log('delete searchParams[search]');
            delete searchParams[search]
        }
        return queryString.stringify(searchParams)
    }


    // console.log("🚀 ~ searchParamsChange ~ searchParams: перед назначением в конце", searchParams)


    // searchParams[`${search}`] = [...(searchParams[`${search}`] as string[]), value]
    searchParams[`${search}`] = Array.isArray(searchParams[`${search}`])
        ? [...(searchParams[`${search}`] as (string | null)[]), value]
        : [searchParams[`${search}`] as string | null, value];

    // console.log("🚀 ~ searchParamsChange ~ searchParams: в конце", searchParams)

    return queryString.stringify(searchParams)

}