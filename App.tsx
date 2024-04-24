// android 877844441244-ndqdqgbnlmnp6eu65mk20ic03s8uhi40.apps.googleusercontent.com
import { NativeBaseProvider } from 'native-base';
import { AppNavigation } from '@navigation';

export default function App() {
  return (
    <NativeBaseProvider>
        <AppNavigation />
    </NativeBaseProvider>
  );
}

