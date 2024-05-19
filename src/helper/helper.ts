import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInAsyncStorage = async () => {
    const userString = await AsyncStorage.getItem("user") ;
    if (userString) {
      const user = JSON.parse(userString)
      return user
    }

    return null
}


export const storeAsyncStorage = async (key: string, value: any) => {
    return await AsyncStorage.setItem(
      key,
      JSON.stringify(value)
    );
}