import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Button from 'react-native-button'
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Stylesheet } from '../shared/consts';
import { getTasks, addTask, deleteTaskById } from '../services/database-service';
import { HistoryListItem } from '../components/historyListItem';

export default function Options() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        getTasks().then((data) => setTasks(data.rows._array))
    },[])


    const reloadList = () => {
        getTasks().then((data) => {setTasks(data.rows._array)});
    }

    const deleteItemHandler = (ID) => {
        deleteTaskById(ID).then(()=>{reloadList()})
    }

    const handleAcceptButtonPress = () => {
        addTask({title: title, description: description}).then(() => reloadList());
    }

  return (
    <SafeAreaView style={{flex: 1}}>
        <Text style={styles.header}>Add Task</Text>
        <TextInput
            onChangeText={setTitle}
            value={title}
            style={styles.inputField}
            placeholder="Task title"
        ></TextInput>
        <TextInput
            onChangeText={setDescription}
            value={description}
            style={styles.inputArea}
            placeholder="Task description"
            multiline={true}
            >
        </TextInput>
        <Button
            onPress={handleAcceptButtonPress}
            style={styles.statsButton}
            containerStyle={styles.statsButtonContainer}
        >Accept</Button>
            <FlatList
                style={{width: "100%", height: "100%"}}
                data={tasks}
                renderItem={(item) => { 
                console.log(item)
                return <HistoryListItem 
                                ID={item.item.ID}
                                taskName={item.item.Title}
                                description={item.item.Description}
                                deleteItemHandler={deleteItemHandler}
                                showGenericDescription={true}
                                />}}
                keyExtractor={item => item.ID}
                extraData={tasks}
            />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        marginLeft:"5%",
        marginTop: "5%"
    },
    inputField: {
        height: "5%",
        width: "85%",
        margin: "5%",
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1,
        padding: 3,
        paddingLeft: 6
    },
    inputArea: {
        width: "85%",
        height: "15%",
        marginTop: "w%",
        margin: "5%",
        fontSize: 20,
        backgroundColor: 'white',
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1,
        padding: 3,
        paddingLeft: 6
    },
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    statsButton: {
      fontSize: 18,
      padding: 0,
      color: Stylesheet.colors.GREEN_PRIMARY
    },
    statsButtonContainer: {
      
      padding:10,
      height:45,
      width: '85%',
      margin: "5%",
      marginTop: "2%", 
      overflow:'hidden', 
      borderRadius:4, 
      borderColor:Stylesheet.colors.GREEN_PRIMARY,
      borderWidth: 2,
      backgroundColor: 'white'
    }
  });
  