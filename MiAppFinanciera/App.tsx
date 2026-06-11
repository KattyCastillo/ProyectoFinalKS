import { Provider } from 'react-redux';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import RootNavigator from './src/navigation/StackNavigator';
import { store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <RootNavigator />
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
