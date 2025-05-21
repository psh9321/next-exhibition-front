export interface RESPONSE_MODEL<T> {
    resultCode : number, /** number */
    data : T | null /** object | string | null */
    errMsg? : string /** string */
}