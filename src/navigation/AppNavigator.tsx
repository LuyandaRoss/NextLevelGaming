import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Header } from '../components/Header';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { COLORS } from '../theme/colors';

// Import Existing Screens
import { LoadingScreen } from '../screens/LoadingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { OverviewScreen } from '../screens/OverviewScreen';
import { PCGamingScreen } from '../screens/PCGamingScreen';
import { ConsoleGamingScreen } from '../screens/ConsoleGamingScreen';
import { EsportsScreen } from '../screens/EsportsScreen';
import { CalculateFeesScreen } from '../screens/CalculateFeesScreen';
import { BookingScreen } from '../screens/BookingScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SquadManagement from '../screens/SquadManagement';
import { TournamentsScreen } from '../screens/TournamentsScreen';
import { VIPMembershipScreen } from '../screens/VIPMembershipScreen';
import { PlayerHubScreen } from '../screens/PlayerHubScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';

type AppStackParamList = RootStackParamList & {
  LoginSignup: { returnTo?: 'Booking' } | undefined;
  Notifications: undefined;
  SquadManagement: undefined;
  Payment: undefined;
  Checkout: {
    itemName?: string;
    itemType?: 'booking' | 'membership';
    totalAmount?: number;
    billingPeriod?: string;
  } | undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Loading');
  const navigationRef = React.useRef<any>(null);

  const updateActiveScreen = () => {
    const screenName = navigationRef.current?.getCurrentRoute()?.name;
    if (screenName) setActiveScreen(screenName);
  };

  const handleNavigate = (screenName: string) => {
    if (navigationRef.current) {
      navigationRef.current.navigate(screenName);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={updateActiveScreen}
      onStateChange={updateActiveScreen}
    >
      <View style={styles.container}>
        <Header isMenuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />

        <HamburgerMenu
          visible={menuOpen}
          onClose={() => setMenuOpen(false)}
          onNavigate={handleNavigate}
          activeScreen={activeScreen}
        />

        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: COLORS.background },
          }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Overview" component={OverviewScreen} />
          <Stack.Screen name="PCGaming" component={PCGamingScreen} />
          <Stack.Screen name="ConsoleGaming" component={ConsoleGamingScreen} />
          <Stack.Screen name="Esports" component={EsportsScreen} />
          <Stack.Screen name="CalculateFees" component={CalculateFeesScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="SquadManagement" component={SquadManagement} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Tournaments" component={TournamentsScreen} />
          <Stack.Screen name="VIPMembership" component={VIPMembershipScreen} />
          <Stack.Screen name="PlayerHub" component={PlayerHubScreen} />

          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
