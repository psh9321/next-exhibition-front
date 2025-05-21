import { RESPONSE_MODEL } from "@/types/response"
 
function IsRESPONSE_MODEL<T>(data: RESPONSE_MODEL<T> | Error): data is RESPONSE_MODEL<T> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'resultCode' in data &&
      typeof data.resultCode === 'number' &&
      'data' in data
    );
}
  
export function ThrowModel<T>(data: Error | RESPONSE_MODEL<T>) {
    if (IsRESPONSE_MODEL<T>(data)) {
      return data;
    }
  
    return {
      resultCode: 500,
      data: data,
      errMsg: data.message ?? 'Unknown error',
    };
  }