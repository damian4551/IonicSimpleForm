export interface IFieldOptions {
    type: HTMLAttributes<HTMLIonInputElement>,
    label: string,
    placeholder?: string,
    rules?: Object
    multiple?: boolean
    multipleName?: string
}

export interface IFormScheme<T> {
    [key: string]: T;
    [key: number]: never;
}