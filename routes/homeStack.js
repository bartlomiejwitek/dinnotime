import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home';
import History from '../screens/history';
import Details from "../screens/details";
import Options from "../screens/options";
import Stats from "../screens/stats";

const HomeStack = createStackNavigator({
    Home: {
        screen: Home
    },
    History: {
        screen: History
    },
    Options: {
        screen: Options
    },
    Details: {
        screen: Details
    },
    Stats: {
        screen: Stats
    }
});

export default createAppContainer(HomeStack);