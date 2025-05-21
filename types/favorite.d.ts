import { RESPONSE_MODEL } from "./response";

import { EXHIBITION_ITEM } from "./exhibition"

export interface FAVORITE_ITEM extends EXHIBITION_ITEM {
    id? : string
}

export interface FAVORITE_RESPONSE_DATA {
    favorite : FAVORITE_ITEM[],
    total : number,
};

export type FAVORITE_RESPONSE = RESPONSE_MODEL<FAVORITE_RESPONSE_DATA | null>;