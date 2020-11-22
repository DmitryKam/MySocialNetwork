import React, {DetailedHTMLProps, TextareaHTMLAttributes} from 'react';
import {Simulate} from 'react-dom/test-utils';
import s from './FormsControls.module.css'
import {WrappedFieldProps} from 'redux-form';

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>,HTMLTextAreaElement>


const FormControl = ( {...props}) => {
    const showError = props.meta.touched && props.meta.errorr;

    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                {props.children}
            </div>
            {showError && <span>{props.meta.error}</span>}
        </div>
    )
}


export const Textarea = (props:WrappedFieldProps) => {

    const showError = props.meta.touched && props.meta.error;

    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <textarea {...props.input} {...props}/>
            </div>
            {showError && <span>{props.meta.error}</span>}
        </div>
    )
}


export const Input = (props: WrappedFieldProps) => {

    const showError = props.meta.touched && props.meta.error;

    return (
        <div className={s.formControl + ' ' + (showError ? s.error : '')}>
            <div>
                <input {...props.input} {...props}/>
            </div>
            {showError && <span>{props.meta.error}</span>}
        </div>
    )
}

