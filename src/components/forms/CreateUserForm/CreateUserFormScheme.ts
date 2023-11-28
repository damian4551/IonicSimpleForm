import { IFieldOptions, IFormScheme } from "../types";

export const createUserFormScheme: IFormScheme<IFieldOptions> = {
    'login': {
        'type': 'text',
        'label': 'Login:',
        'placeholder': 'jan.kowalski',
        'rules': {
            required: {
                value: true,
                message: 'Pole wymagane'
            }
        }
    },
    'email': {
        'type': 'email',
        'label': 'Email:',
        'placeholder': 'jan.kowalski@gmail.com',
        'rules': {
            required: {
                value: true,
                message: 'Pole wymagane'
            }
        }
    },
    'password': {
        'type': 'password',
        'label': 'Hasło:',
        'rules': {
            required: {
                value: true,
                message: 'Pole wymagane'
            },
            minLength: {
                value: 8,
                message: 'Hasło powinno zawierać minimum 8 znaków'
            },
        }
    },
    'firstname': {
        'type': 'text',
        'label': 'Imię:',
        'placeholder': 'Jan',
        'rules': {
            required: {
                value: true,
                message: 'Pole wymagane'
            }
        }
    },
    'lastname': {
        'type': 'text',
        'label': 'Nazwisko:',
        'placeholder': 'Kowalski',
        'rules': {
            required: {
                value: true,
                message: 'Pole wymagane'
            }
        }
    },
    'phones': {
        'type': 'text',
        'label': 'Telefon:',
        'placeholder': '123456789',
        'rules': {
            required: {
                value: true,
                message: 'Pole wymagane'
            },
            minLength: {
                value: 9,
                message: 'Numer powinien zawierać minimum 9 znaków'
            },
            maxLength: {
                value: 9,
                message: 'Numer powinien zawierać maksymalnie 9 znaków'
            },
        },
        'multiple': true,
        'multipleName': 'phone'
    },
    'province': {
        'type': 'text',
        'label': 'Województwo:',
        'placeholder': 'Lubelskie',
    },
    'city': {
        'type': 'text',
        'label': 'Miasto:',
        'placeholder': 'Lublin',
    },
    'street': {
        'type': 'text',
        'label': 'Ulica:',
        'placeholder': 'Poznańska 1',
    },
    'houseNumber': {
        'type': 'number',
        'label': 'Numer mieszkania:',
        'placeholder': '10',
    },
}