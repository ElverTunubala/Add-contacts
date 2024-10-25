import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import homescreem from './src/components/homescreem';


interface Contact {
  name: string;
  phone: string;
  email:string;
}
const Stack = createStackNavigator()

const App: React.FC = () => {
  


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={homescreem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
