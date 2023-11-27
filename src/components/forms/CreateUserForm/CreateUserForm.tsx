import React from 'react';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonInput, IonRow } from '@ionic/react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useHistory } from "react-router-dom";

import { createUserFormScheme } from './CreateUserFormScheme';

interface IInputs {
    login: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
    province: string,
    city: string,
    street: string,
    streetNumber: string,
}

const CreateUserForm: React.FC = () => {
    const { formState: { errors, isSubmitting }, handleSubmit, reset, register } = useForm<IInputs>({ mode: 'onChange' });
    const history = useHistory();
    const { setItem } = useLocalStorage('userData');

    const submitForm: SubmitHandler<IInputs> = async (data: IInputs) => {
        await setItem(data);
        reset();

        history.push("/create-user-summary")
    };

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Utwórz konto
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {/* 
                    @TODO
                    Generowanie formularza wyciągnąć do oddzielnego komponentu, 
                    w propsach przekazywać scheme formularza (CreateUserScheme) oraz funkcję zapisującą formularz (handlSubmit)
                */}
                <form onSubmit={handleSubmit(submitForm)}>
                    {
                        Object.keys(createUserFormScheme).map((item, i) => (
                            <React.Fragment key={i}>
                                {errors[item as keyof IInputs] && (
                                    <p style={{ color: "red" }}>{errors[item as keyof IInputs]?.message}</p>
                                )}
                                <IonInput
                                    {...register(item as keyof IInputs, createUserFormScheme[item]?.rules ?? {})}
                                    // @ts-ignore
                                    type={createUserFormScheme[item].type}
                                    className='ion-margin-bottom'
                                    labelPlacement='floating'
                                    fill='outline'
                                    placeholder={createUserFormScheme[item]?.placeholder}
                                    label={createUserFormScheme[item].label}
                                />
                            </React.Fragment>
                        ))
                    }
                    <IonRow>
                        <IonCol size='6'>
                            <IonButton disabled={isSubmitting} type='submit' expand='block'>
                                Zapisz
                            </IonButton>
                        </IonCol>
                        <IonCol size='6'>
                            <IonButton type='button' expand='block' onClick={() => reset()}>
                                Wyczyść
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </form>
            </IonCardContent>
        </IonCard>
    );
};

export default CreateUserForm;