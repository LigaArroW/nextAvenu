import { filtredFields } from "@/shared/constant/filtredFields";

interface FiltredFields {
    [key: string]: [];
}


export const getFiltredFields = async (): Promise<FiltredFields> => {
    const responseJsons: FiltredFields = {};

    await Promise.all(
        filtredFields.map(async (field) => {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/${field}`, {
                method: 'GET',
                cache: 'force-cache',
            });
            const json = await response?.json();

            responseJsons[field] = json;
        })
    );

    return responseJsons;
};
