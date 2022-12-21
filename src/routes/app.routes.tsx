import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { NewTask } from '../screens/NewTask';
import { InMemoryDatabaseTaskRepository } from '../repositories/in-memory-database-task-repository';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home">
        {props => <Home /> }
      </Screen>
      <Screen name="new">
        {props => <NewTask {...props} taskRepository={new InMemoryDatabaseTaskRepository()} /> }
      </Screen>
      <Screen name="details" component={Details} />
    </Navigator>
  )
}