import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import CreateUserForm from '../components/forms/CreateUserForm/CreateUserForm';

interface ICreateUserProps {
    pageTitle: string
}

const CreateUser: React.FC<ICreateUserProps> = ({pageTitle}: ICreateUserProps) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>{pageTitle}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{pageTitle}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <CreateUserForm />
            </IonContent>
        </IonPage>
    );
};

export default CreateUser;
