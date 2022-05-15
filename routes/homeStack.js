import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home';
import History from '../screens/history';
import Details from "../screens/details";

const HomeStack = createStackNavigator({
    Home: {
        screen: Home
    },
    History: {
        screen: History
    },
    Details: {
        screen: Details
    }
});

export default createAppContainer(HomeStack);