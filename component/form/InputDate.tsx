"use client"

import { useFormContext } from 'react-hook-form';

interface INPUT_DATE_INTERFACE {
    id : string,
    maxDate? : string,
    minDate? : string,
    value? : string,
    isReadDisabled? : boolean,
}

const InputDate = ({id, maxDate, minDate, value, isReadDisabled} : INPUT_DATE_INTERFACE) => {

    const { register } = useFormContext();
    
    return (
        <input {...register(id, {
            required : "날짜를 선택해주세요."
        })} type="date" id={id} min={minDate??""} max={maxDate??""} defaultValue={value} disabled={isReadDisabled??false} />
    )
}

export default InputDate