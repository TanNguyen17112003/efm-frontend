import * as Keychain from "react-native-keychain";

export const storeJWT = async (token: string) => {
    try {
        await Keychain.setGenericPassword('token', token);
    } catch (e) {
        throw e;
    }
}

export const getJWT = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.username === 'token') {
            return credentials.password;
        }
        return null;
    } catch (e) {
        throw e;
    }
}