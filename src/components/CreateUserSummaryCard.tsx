import React, { useEffect, useState } from 'react';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';

import { useLocalStorage } from '../hooks/useLocalStorage';


interface IUserData {
    login: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phones: Object,
    province: string,
    city: string,
    street: string,
    houseNumber: string
}

const CreateUserSummaryCard: React.FC = () => {
    const [userData, setUserData] = useState<IUserData | undefined>(undefined);
    const { getItem } = useLocalStorage('userData');

    const map: Record<keyof IUserData, string> = {
        'login': 'Login',
        'email': 'Email',
        'password': 'Hasło',
        'firstname': 'Imię',
        'lastname': 'Nazwisko',
        'phones': 'Telefony',
        'province': 'Województwo',
        'city': 'Miasto',
        'street': 'Ulica',
        'houseNumber': 'Numer ulicy'
    };

    const fetchUserDataFromStorage = async (): Promise<void> => {
        const fetchedData: IUserData = await getItem();
        const mappedData = mapKeysForLabels(fetchedData);

        setUserData(mappedData);
    }

    const mapKeysForLabels = (userData: IUserData) => {
        let key: keyof IUserData;

        for (key in userData) {
            if (map[key]) {
                userData[map[key] as keyof IUserData] = userData[key];
                delete userData[key];
            }
        }

        return userData;
    }

    useEffect(() => {
        fetchUserDataFromStorage();
    }, []);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Podsumowanie
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {userData && Object.keys(userData as IUserData).map((keyName: string, i: number) => (
                    <div key={i} className='ion-margin-bottom'>
                        {
                            userData[keyName as keyof IUserData] instanceof Object
                                ?
                                <React.Fragment>
                                    <IonText>{keyName}:</IonText>
                                    <ul>
                                        {Object.values(userData[keyName as keyof IUserData]).map((value, index) => {
                                            return <li key={index}>{value}</li>
                                        })}
                                    </ul>
                                </React.Fragment>
                                :
                                <IonText>{keyName}: {userData[keyName as keyof IUserData]}</IonText>
                        }
                    </div>
                ))}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
                    <IonButton routerLink='/'>Strona główna</IonButton>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default CreateUserSummaryCard;
