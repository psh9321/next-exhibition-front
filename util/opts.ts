
import { AREA_COLOR, TYPES_COLOR } from "@/types/opts"
import { DISTRICT } from "@/types/exhibition"
             
export const areaColor = {
    "서울" : "Seoul",
    "경기" : "Gyeonggi",
    "세종" : "Sejong",
    "대전" : "Daejeon",
    "대구" : "Daegu",
    "부산" : "Busan",
    "광주" : "Gwangju",
    "제주" : "Jeju",
    "강원" : "Gangwon",
    "경남" : "Gyungnam",
    "경북" : "Gyungbok",
    "울산" : "Ulsan",
    "인천" : "Incheon",
    "전남" : "Jeonnam",
    "전북" : "Jeonbok",
    "충남" : "Chungname",
    "충북" : "Chungbuk",
} as AREA_COLOR;

export const typesColor = {
    "연극" : "theatre", 
    "전시" : "exhibition", 
    "기타" : "etc", 
    "무용/발레" : "dance", 
    "음악/콘서트" : "music"
} as TYPES_COLOR

export const area = [
    "서울","경기","세종","대전","대구","부산","광주","제주","강원","경남","경북","울산","인천","전남","전북","충남","충북"
] as DISTRICT[];

export const apiUrl = process["env"]["NODE_ENV"] === "production" ? process["env"]["NEXT_PUBLIC_PRODUCTION_SERVER_URL"] as string : process["env"]["NEXT_PUBLIC_DEVELOPMENT_SERVER_URL"] as string ;

export const fileUrl = `${apiUrl}/public`;

