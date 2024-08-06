 export const calcIsNew = (create_date: Date) => {
    var now = new Date();
    var createDate = new Date(create_date);
    var difference = Math.abs(now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
    return difference <= 7;
};