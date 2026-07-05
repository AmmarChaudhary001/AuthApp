import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './screens/Home';

export default function App() {
  return (
    <SafeAreaView>
      <StatusBar hidden={false} />
      <Home />
    </SafeAreaView>
  );
}


