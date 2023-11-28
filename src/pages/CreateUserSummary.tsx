import React from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import CreateUserSummaryCard from '../components/CreateUserSummaryCard';

interface ICreateUserSummaryProps {
    pageTitle: string
}


const CreateUserSumary: React.FC<ICreateUserSummaryProps> = ({ pageTitle }: ICreateUserSummaryProps) => {
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
                <CreateUserSummaryCard />
            </IonContent>
        </IonPage>
    );
};

export default CreateUserSumary;
