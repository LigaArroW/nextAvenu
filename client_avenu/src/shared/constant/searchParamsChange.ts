'use client'

import queryString from "query-string"

interface RangeType {
    [key: string]: string;
}

enum Range {
    'minAge',
    'maxAge',
    'minPrice1',
    'maxPrice1',
    'minPrice2',
    'maxPrice2',
    'minWeight',
    'maxWeight'
}

type RangeObjectType = {
    [key in keyof typeof Range]: string
}

const RangeObject: RangeObjectType = {
    maxAge: '65',
    minAge: '18',
    maxPrice1: '50000',
    minPrice1: '0',
    maxPrice2: '50000',
    minPrice2: '0',
    maxWeight: '125',
    minWeight: '40',
}



export const searchParamsChange = (search: string, value: string) => {
    // console.log('рфботает');



    const searchParams = queryString.parse(window.location.search, {
        types: {
            [search]: 'string[]'
        }
    });
    // console.log("🚀 ~ searchParamsChange ~ searchParams:Самый основной", searchParams)


    if (Range.hasOwnProperty(search)) {
        // console.log(search, 'работает Range.hasOwnProperty(search)', value);

        // console.log("🚀 ~ searchParamsChange ~ searchParams: ДО", searchParams[search])
        searchParams[search] = value
        // console.log("🚀 ~ searchParamsChange ~ searchParams: ПОСЛЕ", searchParams[search])

        // if (search in Range && searchParams[search]) {
        //     console.log('лезет в обнуление');

        //     const searchValue = RangeObject[(search as keyof typeof Range)]

        //     console.log("🚀 ~ searchParamsChange ~ searchValue:", searchValue)
        //     console.log("🚀 ~ Value:", value)
        //     console.log(searchValue === value, 'searchValue===value');
        //     if (searchValue === searchParams[search]) {
        //         console.log('хочет удалить', searchParams[search]);

        //         delete searchParams[search]
        //     }

        //     // searchValue === value ? delete searchParams[`${search}`] : null
        //     // (Range[`${search}`] as string) === value ? delete searchParams[`${search}`] : null
        // }


        // console.log('в конце перед отправкой', searchParams);

        return queryString.stringify(searchParams)
    }



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
            // console.log('delete searchParams[search]');
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


export const deleteSearchParam = (search: string) => {

    const searchParams = queryString.parse(window.location.search);
    delete searchParams[search];
    return queryString.stringify(searchParams)
}
