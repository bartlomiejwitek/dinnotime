import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { getSessions, deleteSessionById } from '../services/database-service';
import { useEffect, useState } from 'react';
import Button from 'react-native-button'
import { HistoryListItem } from '../components/historyListItem';
import { Stylesheet } from '../shared/consts';

export default function History({ navigation }) {

  const [sessions, setSessions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getSessions().then((data) => {console.log(data); setSessions(data.rows._array)})
  }, [])

  const reloadList = () => {
    getSessions().then((data) => {setSessions(data.rows._array)});
  }

  const deleteItemHandler = (ID) => {
    deleteSessionById(ID).then(()=>{reloadList()})
  }


  const listItem = ({ item }) => (
    <Item title={item.ID} />
  );


  const buttonHandler = () => {
    console.log(sessions)
  }

  return (
    <SafeAreaView>
      <Button 
      onPress={() => {navigation.push('Stats')}}
      style={styles.statsButton}
      containerStyle={styles.statsButtonContainer}
      >Stats</Button>
        <FlatList
          style={{width: "100%", height: "100%"}}
          data={sessions}
          renderItem={(item) => { 
            console.log(item)
            return <HistoryListItem 
                          ID={item.item.ID}
                          taskName="abc"
                          TStart={item.item.TStart}
                          TStop={item.item.TStop}
                          deleteItemHandler={deleteItemHandler}
                          />}}
          keyExtractor={item => item.ID}
          extraData={sessions}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    alignSelf: 'center',
    padding:10,
    height:45,
    width: '92%',
    margin: 5, 
    overflow:'hidden', 
    borderRadius:4, 
    borderColor:Stylesheet.colors.GREEN_PRIMARY,
    borderWidth: 2,
    backgroundColor: 'white'
  }
});

