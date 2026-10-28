import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import SeriesScreen from './screens/SeriesScreen';
import EpisodiosScreen from './screens/EpisodiosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Series"
          component={SeriesScreen}
          options={{ title: 'Séries' }}
        />
        <Stack.Screen
          name="Episodios"
          component={EpisodiosScreen}
          options={{ title: 'Episódios' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
