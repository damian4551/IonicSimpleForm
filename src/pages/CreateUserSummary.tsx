import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';

interface ICreateUserSummaryProps {
    pageTitle: string
}

interface IUserData {
    login: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
    province: string,
    city: string,
    street: string,
    streetNumber: string
}

const UserSummary: React.FC<ICreateUserSummaryProps> = ({pageTitle}: ICreateUserSummaryProps) => {
    const [userData, setUserData] = useState<IUserData | undefined>(undefined);
    const { getItem } = useLocalStorage('userData');

    const map: Record<keyof IUserData, string> = {
        'login': 'Login',
        'email': 'Email',
        'password': 'Hasło',
        'firstname': 'Imię',
        'lastname': 'Nazwisko',
        'phone': 'Telefon',
        'province': 'Województwo',
        'city': 'Miasto',
        'street': 'Ulica',
        'streetNumber': 'Numer ulicy'
    };

    const fetchUserDataFromStorage = async () => {
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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{pageTitle}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{pageTitle}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            Podsumowanie
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {userData && Object.keys(userData as IUserData).map((keyName: string, i: number) => (
                            <div key={i} className='ion-margin-bottom'>
                                <IonText>{keyName}: {userData[keyName as keyof IUserData]}</IonText>
                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
                            <IonButton routerLink='/'>Strona główna</IonButton>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default UserSummary;
