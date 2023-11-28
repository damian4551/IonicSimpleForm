import React from 'react';

import { IonButton, IonCol, IonInput, IonRow } from '@ionic/react';

import { IFieldOptions, IFormScheme } from './types';
import { UseFormReturn } from 'react-hook-form';

interface IFormMultipleInputProps<T> extends React.HTMLAttributes<HTMLIonInputElement> {
    errors: any,
    fields: T[],
    formScheme: IFormScheme<IFieldOptions>,
    item: keyof IFormScheme<IFieldOptions>,
    register: UseFormReturn['register'],
    handleRemoveField: (fieldName: string, fieldId: string, index: number) => void,
    append: (name: Object) => void,
    handleChange: (fieldName: string, fieldId: string, value: string) => void,
}

const FormMultipleInput = <T,>({ errors, fields, formScheme, item, register, handleRemoveField, append, handleChange, ...props }: IFormMultipleInputProps<T>) => {
    const { type, placeholder, label, multipleName, rules } = formScheme[item];
    return (
        <>
            {fields.map((field: any, index: number) => {
                const fieldName = `${item}.${index}.${multipleName}`;
                return (
                    <React.Fragment key={field.id}>
                        <IonRow style={{ display: "flex" }} className='ion-margin-bottom'>
                            {item in errors && typeof errors[item][index] !== "undefined" && errors[item][index][multipleName as string] && (
                                <p style={{ color: "red", paddingBottom: "4px", width: "100%" }}>{errors[item][index][multipleName as string]?.message}</p>
                            )}
                            <IonInput
                                {...register(fieldName, rules ?? {})}
                                type={type}
                                placeholder={placeholder}
                                label={label}
                                onIonInput={(e) => handleChange(`${item}`, field.id, e.detail.value!)}
                                labelPlacement='floating'
                                fill='outline'
                                style={{ flex: "1" }}
                                {...props}
                            />
                            {fields.length !== 1 && (
                                <IonButton
                                    type='button'
                                    className='ion-no-margin ion-margin-start'
                                    color="danger"
                                    onClick={() => handleRemoveField(`${item}`, field.id, index)}
                                >
                                    Usuń
                                </IonButton>
                            )}
                        </IonRow>
                    </React.Fragment>
                );
            })}
            <IonRow>
                <IonCol size='12' className='ion-no-margin'>
                    <IonButton type='button' className='ion-margin-bottom' onClick={() => append({ [multipleName as string]: '' })}>
                        Dodaj
                    </IonButton>
                </IonCol>
            </IonRow>
        </>
    );
};

export default FormMultipleInput;
