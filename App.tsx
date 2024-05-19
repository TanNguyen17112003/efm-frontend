// android 877844441244-ndqdqgbnlmnp6eu65mk20ic03s8uhi40.apps.googleusercontent.com
import { NativeBaseProvider } from 'native-base';
import { AppNavigation } from '@navigation';
import { Provider } from 'react-redux';
import { persistor, store } from 'src/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
      <NativeBaseProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      </NativeBaseProvider>
  );
}
