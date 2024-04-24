import { Text, Box, View, Icon } from "native-base";
import { PlusCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
export const Plus : React.FC<{address: string}> = ({address}) => {
  const navigation = useNavigation();
  return (
    <Icon as={<PlusCircleIcon size={50} />} color="blue.500" onPress={() => navigation.navigate(address)}/>
  )
}
