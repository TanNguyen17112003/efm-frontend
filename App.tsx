import { NativeBaseProvider } from 'native-base';
import { AppNavigation } from '@navigation';

export default function App() {
  return (
    <NativeBaseProvider>
        <AppNavigation />
    </NativeBaseProvider>
  );
}

