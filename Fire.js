import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyh-6cyzN9W524WjM4-_8t9i24BFpKwhE",
    authDomain: "todoapp-30c15.firebaseapp.com",
    databaseURL: "https://todoapp-30c15.firebaseio.com",
    projectId: "todoapp-30c15",
    storageBucket: "todoapp-30c15.appspot.com",
    messagingSenderId: "727865244333",
    appId: "1:727865244333:web:700387512b690abc1e6424"
};

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error);
                    });
            }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;
