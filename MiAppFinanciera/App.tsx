import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import StackNavigator from './src/navigation/StackNavigator';
import { store } from './src/store';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
