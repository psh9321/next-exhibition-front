import { OPEN_API } from "./_api.call.module"

import { XMLParser } from 'fast-xml-parser';

import { SEARCH_PARAMS, OPEN_API_SERVER_RESPONSE_DATA, OPEN_API_CLIENT_RESPONSE_DATA } from "@/types/exhibition"

function XmlToJson(xmlStr : string){
    const parser = new  XMLParser();

    return parser.parse(xmlStr);
}

export async function API_EXHIBITION_LIST(searchParams : SEARCH_PARAMS){
    try {   
        
        const queryString = Object.entries(searchParams).filter(([, v]) => !!v).map(([k, v]) => `${k}=${v}`).join('&');

        const baseUrl = `area?serviceKey=${process.env["NEXT_EXHIBITION_API_KEY"]}&${queryString}`;

        const xmlStr = await OPEN_API(baseUrl, {
            method : "get",
            cache: 'no-store',
        }).text();

        const jsonData = XmlToJson(xmlStr);

        const { OpenAPI_ServiceResponse, response } = jsonData;

        /** 에러 */
        if(OpenAPI_ServiceResponse) {

            const response = {
                resultCode : OpenAPI_ServiceResponse["cmmMsgHeader"]["returnReasonCode"],
                data : null,
                errMsg : `${OpenAPI_ServiceResponse["cmmMsgHeader"]["errMsg"]} : ${OpenAPI_ServiceResponse["cmmMsgHeader"]["returnAuthMsg"]}`
            }

            return response
        }
        /** 정상 통신 */
        else if(response) {
            const openApiData = jsonData["response"]["body"] as OPEN_API_SERVER_RESPONSE_DATA;

            const { totalCount, PageNo, numOfrows } = openApiData;
            
            const result = {
                total : Number(totalCount??0),
                page : Number(PageNo??1),
                limit : Number(numOfrows??20),
                data : Array.isArray(openApiData["items"]["item"]) ? openApiData["items"]["item"] : [openApiData["items"]["item"]]
            } as OPEN_API_CLIENT_RESPONSE_DATA;

            
            const response = {
                resultCode : 200,
                data : result,
                errMsg : ``
            }

            return response
        }
        else {
            
            const response = {
                resultCode : -999,
                data : null,
                errMsg : "알수없는 에러"                
            }

            return response
        }
    }
    catch(err) {
        console.log(err," catch cerr")

        const response = {
            resultCode : 503,
            data : err,
            errMsg : "API_EXHIBITION_LIST catch"            
        }

        return response
    }
}

export async function API_EXHIBITION_DETAIL(seq : string){

    try {
        const baseUrl = `detail?serviceKey=${process.env["NEXT_EXHIBITION_API_KEY"]}&seq=${seq}`;

        const xmlStr = await OPEN_API(baseUrl, {
            method : "get",
            cache: 'no-store',
        }).text();
    
        const jsonData = XmlToJson(xmlStr);
    
        const { OpenAPI_ServiceResponse, response } = jsonData;
    
        /** 에러 */
        if(OpenAPI_ServiceResponse) {
            return {
                resultCode : OpenAPI_ServiceResponse["cmmMsgHeader"]["returnReasonCode"],
                data : null,
                errMsg : `${OpenAPI_ServiceResponse["cmmMsgHeader"]["errMsg"]} : ${OpenAPI_ServiceResponse["cmmMsgHeader"]["returnAuthMsg"]}`
            }
        }
        /** 정상 통신 */
        else if(response) {
            const openApiData = jsonData["response"]["body"] as OPEN_API_SERVER_RESPONSE_DATA;

            const response =  {
                resultCode : 200,
                data : openApiData["items"]["item"],
                errMsg : ""                
            }
            
            return response
        }
        else {

            const response = {
                resultCode : -999,
                data : null,
                errMsg : "알수없는 에러"
            }
    
            return response
        }
    }
    catch(err) {
        console.log(err," catch cerr")
        const response = {
            resultCode : 503,
            data : err,
            errMsg : "API_EXHIBITION_LIST catch"
        }
        return response
    }
}