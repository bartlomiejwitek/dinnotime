import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name:'main_database',
        location: 'default'
    },
    ()=>{console.log('succesfully create db')},
    (e)=>{console.log(e)}
)

const createDatabase = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS"
            +"Locations"
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Lat FLOAT, Lng FLOAT)"
        );
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS"
            +"Tasks"
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT)"
        )
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS"
            +"Sessions"
            +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, TStart INTEGER, TStop INTEGER, FOREIGN KEY(location) REFERENCES Locations(ID), FOREIGN KEY(task) REFERENCES Tasks(ID));"
        )
    })
}