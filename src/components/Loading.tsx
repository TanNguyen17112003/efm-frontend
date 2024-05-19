import { View, ActivityIndicator } from 'react-native';
import { Plus } from './Plus';
import tw from 'twrnc';

export const Loading = () => {
  const style = {
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52,52,52,0.3)',
        zIndex: 50,
      }}
    >
      <ActivityIndicator size={'large'} />
    </View>
  );
};
