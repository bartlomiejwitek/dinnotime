import * as SQLite from "expo-sqlite";
   

// const getDatabase = () => { 
//     return SQLite.openDatabase(
//     {
//         name:'main_database',
//         location: 'default'
//     },
//     ()=>{console.log('succesfully create db')},
//     (e)=>{console.log(e)})
// }


export const createDatabaseIfNotExists = () => {
    console.log('create db called')
    // db = SQLite.openDatabase(
    //         {
    //             name:'main_database',
    //             location: 'default',
    //             createFromLocation: 'db.db'
    //         },
    //         ()=>{console.log('succesfully create db')},
    //         (e)=>{console.log(e)})
    db = SQLite.openDatabase('db.db')

    db.transaction((tx) => {
        console.log('started transaction')
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Locations (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Lat FLOAT, Lng FLOAT)",
            [],
            () => {},
            (tx, err) => console.log(err)
        );
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Tasks (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT)`,
            [],
            (tx, results) => {
                console.log(results);
            },
            (tx, error) => {console.log('error while executing query')
        }
        );
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Sessions (ID INTEGER PRIMARY KEY AUTOINCREMENT, "
                +"Title TEXT, "
                +"TStart INTEGER, "
                +"TStop INTEGER, "
                +"location_id INTEGER, "
                +"task_id INTEGER, "
                +"FOREIGN KEY (location_id) REFERENCES Locations(ID), "
                +"FOREIGN KEY (task_id) REFERENCES Tasks(ID))",
            [],
            (tx, results) => {
                // console.log(results);
                console.log(results);
            },
            (tx, error) => {console.log(error)},
        );


        //JUST FOR TESTING
        // tx.executeSql(
        //     "INSERT INTO Tasks (Title, Description) VALUES (?,?)",
        //     ["abcd","efgh"], (tx,result) => {console.log(result)}
        // )
        
    })
}

export const getTasks = () => {
    console.log('get tasks called')
    db = SQLite.openDatabase('db.db')
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Tasks",
            [],
            (tx,result) => {console.log(result); resolve(result),
            (tx, error) => {console.log(error); reject(error)}
            });
        })
    })
}

export const saveSession = (task, successCallback) => {
    console.log('saving task')
    db = SQLite.openDatabase('db.db')
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO Sessions (TStart, TStop) VALUES (?,?)",
        [task.TStart, task.TStop],
        (tx,result) => {console.log('added session')},
        (tx, err) => {console.log(err)}
        )
    })
}

export const getSessions = () => {
    db = SQLite.openDatabase('db.db')
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Sessions",
            [],
            (tx,result) => {console.log(result); resolve(result),
            (tx, error) => {console.log(error); reject(error)}
            });
        })
    })

}

export const deleteSessionById = (id) => {
    db = SQLite.openDatabase('db.db')
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM Sessions WHERE ID=?",
            [id],
            (tx,result) => {console.log(result); resolve(result),
            (tx, error) => {console.log(error); reject(error)}
            });
        })
    })
}


export const addTask = (task) => {
    console.log('get tasks called')
    db = SQLite.openDatabase('db.db')
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("INSERT INTO Tasks (Title, Description) VALUES (?,?)",
            [task.title, task.description],
            (tx,result) => {console.log(result); resolve(result)},
            (tx, error) => {console.log(error); reject(error)}
            );
        })
    })

}

export const deleteTaskById = (id) => {
    db = SQLite.openDatabase('db.db')
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM Tasks WHERE ID=?",
            [id],
            (tx,result) => {console.log(result); resolve(result),
            (tx, error) => {console.log(error); reject(error)}
            });
        })
    })
}




