import React from 'react';
import s from './FormsControls.module.css'
import {Field, WrappedFieldProps} from 'redux-form';




export const Textarea = (props: WrappedFieldProps) => {

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


export const createField = (placeholder: string | null, name: string | null, validate: any, component: any,props:any = {},text:string = '') => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            component={component}
            validate={validate}
            {...props}
        />
    </div>

)
