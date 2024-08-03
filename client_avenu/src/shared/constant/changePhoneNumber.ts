export const changePhoneNumber = (phoneNumber: string) => {
    return phoneNumber
        .trim()
        .replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "")
        .replaceAll("+", "");
};