import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Stylesheet } from '../shared/consts';
import { deleteSessionById } from '../services/database-service';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: Stylesheet.colors.GREEN_PRIMARY,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
    },
    title: {
      fontSize: 32,
      color: 'white'
    },
    swipeout: {
        backgroundColor: Stylesheet.colors.BACKGROUND
    }
  });



  

export const HistoryListItem = ({ ID ,taskName, TStart, TStop, deleteItemHandler, description, showGenericDescription }) => {

    const getDuration = (TStart, TStop) => {
        let duration = new Date(TStop - TStart); 
        console.log(duration)
        let minutes = duration.getMinutes() === 0 ? '00' : duration.getMinutes()
        let seconds = duration.getSeconds() === 0 ? '00' : duration.getSeconds()
        let hours = (duration.getHours() - 1) === 0 ? '00' : duration.getHours()


        return `${hours}h ${minutes}m ${seconds}s `
    }

    const getBottomText = () => {
        if(showGenericDescription){
            return description;
        }else{
            return getDuration(TStart, TStop);
        }
    }

    const swipeRightButtons = [
        {
            text: 'Delete',
            onPress: () => {
                console.log('delete ' + ID)
                deleteItemHandler(ID);
            }
        }
    ]


    return (
        <Swipeout right={swipeRightButtons} style={{backgroundColor: '#f3f3f3'}}> 
            <View style={styles.item}>
                <Text style={styles.title}>{taskName}</Text>
                <Text style={styles.title}>{getBottomText()}</Text>
            </View>
        </Swipeout>
    )
};