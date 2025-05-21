type DATA_PARAM = number[];
type LENGTH_PARAM = number;

type RETURNS = number[][] | [];

export function Chunk(data : DATA_PARAM = [], length : LENGTH_PARAM) : RETURNS {
    if(data == null){
        return []
    }
    else {
        const arr = [];
                
        for (let i = 0; i < data.length; i += length) {
            arr.push(data.slice(i, i + length));
        }
    
        return arr;
    }
}

export function PaginationChunk(total : number, limit : number) {
    const length = Math.ceil(total/limit);

    const arr = [];
    for(let i = 0; i < length; i++){
        arr.push(i);
    };

    const result = Chunk(arr, limit);

    return result
}