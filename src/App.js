import { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// getDocs :- brings the document from firestore
// addDocs :- adds data to  firestore document
import { db } from "./firebase";

function App() {
  const [users, setUsers] = useState([]);
  // To store list of users.
  const usersCollectionRef = collection(db, "users");
  // Grab 'users' collection from the databas(db)
  const [btnClick, setBtnClick] = useState("");

  const [newName, setNewName] = useState(""); // To grab the input name
  const [newAge, setNewAge] = useState(0);
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    setBtnClick(() => {
      return `user${newName} created`;
    });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    // doc: creates an instance of a document.
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    setBtnClick(() => {
      return `user${age} created`;
    });
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    setBtnClick(() => {
      return `user${id} created`;
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // Returns all the documents from the users collection
      console.log(data);
      console.log(data.docs);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [btnClick]);

  return (
    <div className="App">
      <input
        onChange={(e) => {
          setNewName(e.target.value);
        }}
        type="text"
        placeholder="name"
      />
      <input
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
        type="number"
        name=""
        id=""
        placeholder="age"
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
