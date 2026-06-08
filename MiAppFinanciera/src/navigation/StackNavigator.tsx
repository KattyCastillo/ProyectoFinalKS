import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CardsScreen from '../screens/RoutinesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProfileScreen from '../screens/UserSettings/ProfileScreen';
import SettingsScreen from '../screens/UserSettings/SettingsScreen';

// Contexts
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen
        name="AddCard"
        component={ProductDetailScreen}
        options={{ title: 'Agregar Tarjeta' }}
      />
      <Stack.Screen
        name="CardDetails"
        component={ProductDetailScreen}
        options={{ title: 'Detalles de Tarjeta' }}
      />
    </Stack.Navigator>
  );
};

const CardsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="CardsScreen"
        component={CardsScreen}
        options={{ title: 'Mis Tarjetas' }}
      />
      <Stack.Screen
        name="AddCard"
        component={ProductDetailScreen}
        options={{ title: 'Agregar Tarjeta' }}
      />
    </Stack.Navigator>
  );
};

const ExpensesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="ExpensesScreen"
        component={ProductsScreen}
        options={{ title: 'Finanzas Compartidas' }}
      />
      <Stack.Screen
        name="SplitExpense"
        component={ProductDetailScreen}
        options={{ title: 'Dividir Gasto' }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2E7D32',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configuración' }}
      />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsStack}
        options={{
          tabBarLabel: 'Tarjetas',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💳</Text>,
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesStack}
        options={{
          tabBarLabel: 'Gastos',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💰</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppTabs />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
