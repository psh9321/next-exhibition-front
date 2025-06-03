import { CombineZero } from "./combineZero";

 
/** @returns {string} yyyy.mm.dd hh:mm:ss */
export function DateFormat(dateStr : Date | string, isSecond? : boolean){
    
    const time = new Date(dateStr);

    const year = time.getFullYear();
    const month = CombineZero(time.getMonth()+1);
    const date = CombineZero(time.getDate());

    if(isSecond) {
        const hours =  CombineZero(time.getHours());
        const min =  CombineZero(time.getMinutes());
        const sec =  CombineZero(time.getSeconds());

        return `${year}.${month}.${date} ${hours}:${min}:${sec}`;
    }
    else {
        return `${year}.${month}.${date}`;    
    }
}

export function DateTimeFormat(dateStr : Date | string) {
    const time = new Date(dateStr);

    const hours =  CombineZero(time.getHours());
    const min =  CombineZero(time.getMinutes());
    const sec =  CombineZero(time.getSeconds());

    return `${hours}:${min}:${sec}`;
}

export function ExhibitionDateFormat(dateStr : string) {

    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);
    const day = dateStr.substring(6,8)
    
    return `${year}.${month}.${day}`
}

export function MinDateFormat() : string{
    const time = new Date();
    
    const year = time.getFullYear();
    const month = CombineZero(time.getMonth()+1);
    const date = CombineZero(time.getDate());

    return `${year}-${month}-${date}`
}