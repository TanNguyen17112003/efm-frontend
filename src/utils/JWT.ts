import * as Keychain from "react-native-keychain";

export const storeJWT = async (data: { token: string, name: string }) => {
    try {
        const combinedData = `${data.token}::${data.name}`;
        await Keychain.setGenericPassword('userData', combinedData);
    } catch (e) {
        throw e;
    }
}

export const getJWT = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'userData') {
            const [token, name] = credentials.password.split('::');
            return { token, name };
        }
        return null;
    } catch (e) {
        throw e;
    }
}

export const clearJWT = async () => {
    try {
        await Keychain.resetGenericPassword();
    } catch (e) {
        throw e;
    }
}