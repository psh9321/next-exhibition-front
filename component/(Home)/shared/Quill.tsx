"use client"

// import _ReactQuill from "react-quill"

import { FieldValues, Path } from 'react-hook-form';
import dynamic from "next/dynamic";

// ReactQuill을 동적으로 임포트하여 서버에서 실행되지 않도록 설정
const ReactQuill = dynamic(async () => import("react-quill"), { ssr: false });

interface WRITE_EDITOR_INTER_FACE<T extends FieldValues> {
    id : Path<T>,
    value? : string | undefined,
    onChange : (e : string) => void,
    className? : string,
    placeholder? : string,
}

export const WriteEditor = <T extends FieldValues>({id, value, onChange, className, placeholder } : WRITE_EDITOR_INTER_FACE<T>) => {

    const modules = {
        toolbar: {
            container : [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                [{ 'color': [] }, { 'background': [] }],
                ['clean'],
            ],
        },
    }

    return (
        <>
            <ReactQuill 
                id={id}
                className={className??""}
                placeholder={placeholder??""}
                modules={modules}
                value={value}
                onChange={onChange}
                theme="snow"
            />
        </>
    )
}

export const ReadEditor = ({value, className} : {value : string | undefined, className? : string}) => {

    const modules = {
        toolbar : false
    }

    return (
        <ReactQuill 
            className={className}
            modules={modules}
            value={value}
            readOnly={true}
            theme={"bubble"}
        />
    )
}

