import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

interface IHomeProps {
    pageTitle: string
}

const Home: React.FC<IHomeProps> = ({ pageTitle }: IHomeProps) => {
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
                    <IonButton routerLink='/create-user'>Dodaj użytkownika</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
