import CryptoJS from  "crypto-js";
 
export function DataEncrypt(params : {} | string | []){

    if(process["env"]["NODE_ENV"] !== "production") return params
    
    const str = JSON.stringify(params);

    const data = CryptoJS.AES.encrypt(str, process["env"]["NEXT_PUBLIC_SECRET_KEY"] as string);

    const result = data.toString();
    
    return result
}

/**
 * 암호화된 문자열을 복호화 함
 * 
 * @returns {any} 복호화된 데이터 
 */
export function DataDecrypt(params : {} | string | []){

    if(process["env"]["NODE_ENV"] !== "production") return params

    const decrypt = CryptoJS.AES.decrypt(params as string, process["env"]["NEXT_PUBLIC_SECRET_KEY"] as string);

    const result = decrypt.toString(CryptoJS.enc.Utf8);

    return JSON.parse(result);
}