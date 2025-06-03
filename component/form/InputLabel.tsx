"use client"

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Eye, EyeOff } from 'lucide-react';

import InputDate from './InputDate';

import { pw_regex, name_regex, email_regex, phone_regex, birth_regex } from "@/util/regex";
import { OnValueLimit } from '@/util/onValueLimit';

interface INPUT_LABEL_BOX {
    
    id : string,
    labelName : string,
    children? : React.ReactNode,
    isReadDisabled? : boolean,
    value? : string, 
    placeholder? : string,
    toggleBtnClassName? : string,
}


export const InputLabelEmail = ({ children, id, labelName, placeholder, isReadDisabled } : INPUT_LABEL_BOX) => {

    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input 
                id={id} 
                type="text"
                autoComplete={"off"}
                {...register(id, {
                    required : "이메일을 입력해주세요.",
                    pattern : {
                        value : email_regex,
                        message : "이메일 형식을 확인 해주세요."
                    },
                })}
                disabled={isReadDisabled} 
                className={isReadDisabled ? "readDisable" : ""} 
                placeholder={placeholder??"이메일을 입력해주세요."}  
            />
            {children}
        </>
    ) 
}

export const InputLabelPw = ({ children, id, labelName, toggleBtnClassName } : INPUT_LABEL_BOX) => {

    const { register } = useFormContext();

    const [pwType, setPwType] = useState<string>("password");

    /** 비밀번호 보이기/가리기 토글 */
    function OnToggle(e : React.FormEvent<HTMLInputElement>) : void{
        const self : HTMLInputElement = e.currentTarget;

        setPwType(self.checked ? "text" : "password");
        
    }
    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input 
                autoComplete={"off"} 
                type={pwType} 
                id={id} 
                placeholder="비밀번호"
                maxLength={15}
                onInput={OnValueLimit} 
                {...register(id, {
                    required : "비밀번호를 입력해주세요.",
                    minLength : {value : 6, message : "영문, 숫자 조합 6자 이상 이여야 합니다."},
                    maxLength : {value : 20, message : "영문, 숫자 조합 20자 이상 이여야 합니다."},
                    pattern : {value : pw_regex, message : "영/특문, 숫자 조합 6자 이상 이여야 합니다."}
                })}
            />
            <div className={toggleBtnClassName??""}>
                <label htmlFor={`pwToggle-${id}`}>
                    {
                        pwType === "password" ? <Eye/> : <EyeOff/>
                    }
                    <input onChange={OnToggle} className="hidden" tabIndex={-1} type="checkbox" id={`pwToggle-${id}`} />
                </label>
            </div>
            {children}
        </>
    )
}

export const InputLabelName = ({ children, id, labelName } : INPUT_LABEL_BOX) => {
    
    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input {...register(id, {
                required : "이름을 입력해주세요.",
                pattern : {
                    value : name_regex,
                    message : "띄어쓰기 없이 한글로 올바르게 입력해주세요."
                }
            })} placeholder="이름" id={id} type="text" maxLength={6} onInput={OnValueLimit} />
            {children}
        </>
    )
}

export const InputLabelPhone = ({ children, id, labelName, placeholder } : INPUT_LABEL_BOX) => {
    
    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input placeholder={placeholder??"ex) 01094629321"} {...register(id, {
                required : "폰번호를 입력해주세요.",
                pattern : {
                    value : phone_regex,
                    message : "- 없이 띄어쓰지않고 입력해주세요."
                }
            })} id={id} type="number" maxLength={11} onInput={OnValueLimit} />
            {children}
        </>
    )
}

export const InputLabelEmailAuth = ({ children, id, labelName, placeholder } : INPUT_LABEL_BOX) => {
    
    const { register } = useFormContext();
    
    return (
        <>
            <label htmlFor="emailAuth">{labelName}</label>
            <input {...register(id, {
                required : placeholder??"인증번호를 입력해주세요.",
                maxLength:6,
                minLength:6,
            })} placeholder='인증번호 6자리를 입력해주세요.' type="number" id={id} maxLength={6} onInput={OnValueLimit} />
            {children}
        </>
    )
}

export const InputLabelBirth = ({ children, id, labelName, placeholder } : INPUT_LABEL_BOX) => {

    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input placeholder={placeholder??"ex) 19940711"} {...register(id, {
                required : "생년월일을 입력해주세요.",
                pattern : {
                    value : birth_regex,
                    message : "-, . 없이 띄어쓰지않고 입력해주세요."
                }
            })} id={id} type="number" maxLength={8} onInput={OnValueLimit} />
            {children}
        </>
    )
}

export const InputLabelNickName = ({children, id, labelName, placeholder} : INPUT_LABEL_BOX) => {    

    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input {...register(id)}  maxLength={6} onInput={OnValueLimit} placeholder={placeholder??"닉네임"} id={id} type="text" />
            {children}
        </>
    )
}

export const InputLabelSearch = ({id, labelName, placeholder, children, value} : INPUT_LABEL_BOX) => {
    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input 
                id={id}
                type="text" 
                defaultValue={value}
                {...register(id)}
                placeholder={placeholder??"공연/전시 명을 입력해주세요."}
            />
            {children}
        </>
    )
}

export const InputLabelMettingMembersLength = ({id, labelName, placeholder, children, value, isReadDisabled} : INPUT_LABEL_BOX) => {
    const { register } = useFormContext();

    return (
        <>
            <label htmlFor={id}>{labelName}</label> 
            <input 
                disabled={isReadDisabled??false}
                type="number" 
                id={id} 
                {...register(id, {
                    required : "정원 수를 입력해주세요.",
                    validate: (value) => {
                        if (Number(value) < 2) {
                            return "정원 수는 2명 이상으로 해주세요.";
                        }
                        return true;
                    }
                })}
                maxLength={3} 
                defaultValue={value??undefined}
                onInput={OnValueLimit} 
                placeholder={placeholder??"최소 2명 이상"}
            />
            {children}
        </>
    )
}

interface MEETING_DATE_ELEMENT extends INPUT_LABEL_BOX {
    maxDate? : string
}

export const InputLabelMeetingDate = ({id, labelName, children, maxDate, value, isReadDisabled} : MEETING_DATE_ELEMENT) => {
    const minDate = new Date().toISOString().split('T')[0];

    return (
        <>
            <label htmlFor={id}>{labelName}</label> 
            <InputDate id={id} minDate={minDate} maxDate={maxDate} value={value??""} isReadDisabled={isReadDisabled} />        
            {children}
        </>
    )
}   