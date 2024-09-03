import { IModel } from "@/types/model/model/model";

export const calcIsNew = (create_date: Date) => {
    var now = new Date();
    console.log("🚀 ~ calcIsNew ~ now:", now)
    var createDate = new Date(create_date);
    console.log("🚀 ~ calcIsNew ~ createDate:", createDate)
    var difference = Math.abs(now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
    console.log(difference)
    return difference <= 7;
};



export const modelTypesSearch = (modelType: number[], model: IModel): boolean => {
    if (modelType.length === 1 && modelType.includes(7)) {
        return calcIsNew(model.create_date);
    }
    if (modelType.length === 1 && modelType.includes(8)) {
        return model.is_verified
    }

    if (modelType.length > 1) {
        if (modelType.includes(7)) {
            const result = calcIsNew(model.create_date);
            if (result) {
                const mod = modelType.filter((item) => item !== 7)
                return modelTypesSearch(mod, model)
            }
        }
        if (modelType.includes(8)) {
            const result = model.is_verified
            if (result) {
                const mod = modelType.filter((item) => item !== 8)
                return modelTypesSearch(mod, model)
            }
        }
        return false
    }


    return modelType.includes(model.type_id)

}