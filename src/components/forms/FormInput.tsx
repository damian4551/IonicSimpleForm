import React from 'react';

import { IonInput } from '@ionic/react';

import { IFieldOptions, IFormScheme } from './types';
import { UseFormReturn } from 'react-hook-form';

interface IFormInputProps extends React.HTMLAttributes<HTMLIonInputElement> {
    errors: any,
    formScheme: IFormScheme<IFieldOptions>,
    item: keyof IFormScheme<IFieldOptions>,
    register: UseFormReturn['register'],
    handleChange: (fieldName: string, value: string) => void,
}

const FormInput: React.FC<IFormInputProps> = ({ errors, formScheme, item, register, handleChange, ...props }: IFormInputProps) => {
    const { type, placeholder, label, rules } = formScheme[item];
    const fieldName = `${item}`;

    return (
        <React.Fragment>
            {errors[item] && (
                <p style={{ color: "red", paddingBottom: "4px" }}>{errors[item]?.message}</p>
            )}
            <IonInput
                {...register(fieldName, rules ?? {})}
                type={type}
                placeholder={placeholder}
                label={label}
                onIonInput={(e) => handleChange(fieldName, e.detail.value!)}
                className='ion-margin-bottom'
                labelPlacement='floating'
                fill='outline'
                {...props}
            />
        </React.Fragment>
    )
};

export default FormInput;
