import { store } from "../modules/Store";

export const useLocalStorage = (key: string) => {

    const setItem = async (value: unknown) => {
        await store.set(key, value);
    };

    const getItem = async () => {
        const item = await store.get(key);

        return item;
    };

    const removeItem = async () => {
        await store.remove(key);
    }

    return { setItem, getItem, removeItem }
};