import { useEffect, useState } from "react";
import {nanoid} from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const[notes,setNotes] = useState([
    {
    id: nanoid(),
    text: "This is my first note!",
    date: "09/27/2021",
  },
  {
    id: nanoid(),
    text: "This is my second note!",
    date: "09/28/2021",
  },
  {
    id: nanoid(),
    text: "This is my third note!",
    date: "09/29/2021",
  },
]);

const [searchText, setSearchText] = useState('');

const [darkMode, setDarkMode ] = useState(false);

useEffect(() => {
  const savedNotes = JSON.parse(localStorage.getItem('my-notes-app-data'));
  if(savedNotes){
    setNotes(savedNotes);
  }
}, []);

useEffect(() => {
  localStorage.setItem('my-notes-app-data', JSON.stringify(notes))
}, [notes]);

const addNote = (text) => {
const date = new Date();
const newNote = {
  id: nanoid(),
  text: text,
  date: date.toLocaleDateString()
}

const newNotes = [...notes, newNote];
setNotes(newNotes);
}

const deleteNote = (id) => {
const newNotes = notes.filter((note) => note.id !== id);
setNotes(newNotes);
}
  return(
    
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode ={setDarkMode}/>
        <Search handleSearchNote ={setSearchText}/>
        <NotesList 
        notes ={notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
        handleAddNote = {addNote}
        handleDeleteNote = {deleteNote}
        />
    </div> 
    </div>
  );
}

export default App;