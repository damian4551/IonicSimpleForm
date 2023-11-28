import React, { useState } from 'react';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonRow } from '@ionic/react';

import { useForm, SubmitHandler, useFieldArray, FieldValues } from 'react-hook-form';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useHistory } from "react-router-dom";

import { createUserFormScheme } from './CreateUserFormScheme';

import FormMultipleInput from '../FormMultipleInput';
import FormInput from '../FormInput';

interface IInputs extends FieldValues {
    login: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    province: string,
    city: string,
    street: string,
    houseNumber: string,
    phones: TPhoneInput
}

type TPhoneInput = [{ phone: string }];

interface IFormData extends Omit<IInputs, 'phones'> {
    phones: {}
}

const formDataInitialValues: IFormData = {
    login: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    province: '',
    city: '',
    street: '',
    houseNumber: '',
    phones: {}
}

const CreateUserForm: React.FC = () => {
    const { formState: { errors, isSubmitting }, handleSubmit, reset, register, control } = useForm<IInputs>({
        mode: 'onChange',
        defaultValues: {
            phones: [{ phone: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'phones' });

    const history = useHistory();
    const { setItem } = useLocalStorage('userData');
    const [formData, setFormData] = useState<IFormData>(formDataInitialValues);

    const submitForm: SubmitHandler<IInputs> = async (): Promise<void> => {
        await setItem(formData);
        reset();

        history.push("/create-user-summary")
    };

    const handleMultipleChange = (fieldName: string, fieldId: string, value: string): void => {
        const tempState = {...formData};
        tempState[fieldName][fieldId] = value;

        setFormData(tempState);
        console.log(formData);
    };

    const handleChange = (fieldName: string, value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value,
        }));
    };

    const handleRemoveField = (fieldName: string, fieldId: string, index: number): void => {
        const tempState = { ...formData };
        delete tempState[fieldName][fieldId];

        setFormData(tempState);
        remove(index);
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Utwórz konto
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <form onSubmit={handleSubmit(submitForm)}>
                    {
                        Object.keys(createUserFormScheme).map((item, i) => {
                            return createUserFormScheme[item]?.multiple === true
                                ? <FormMultipleInput
                                    key={i}
                                    register={register}
                                    formScheme={createUserFormScheme}
                                    item={item}
                                    handleChange={handleMultipleChange}
                                    errors={errors}
                                    fields={fields}
                                    handleRemoveField={handleRemoveField}
                                    append={append}
                                />
                                : <FormInput
                                    key={i}
                                    register={register}
                                    formScheme={createUserFormScheme}
                                    item={item}
                                    handleChange={handleChange}
                                    errors={errors}
                                />
                        })
                    }
                    <IonRow>
                        <IonCol size='6' className='ion-no-margin'>
                            <IonButton disabled={isSubmitting} type='submit' expand='block'>
                                Zapisz
                            </IonButton>
                        </IonCol>
                        <IonCol size='6' className='ion-no-margin'>
                            <IonButton type='button' color="medium" expand='block' onClick={() => reset()}>
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