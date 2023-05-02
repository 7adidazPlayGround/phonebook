import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhoneBookService from './services/phonebook'

const App = () => {
  const [persons, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [borderEffect, setBorderEffect] = useState(0);


  useEffect(() => {
    console.log("effect");
    PhoneBookService
      .getAllNames()
      .then(
        (response) => {
          console.log(response)
          setPerson(response);
        })
  }, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handelSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

  const filtered = persons.filter((person) => person.name.includes(newSearch));

  const handleNewSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };

    const duplicateCheck = persons.filter((person) => person.name === newObject.name);

    if (duplicateCheck.length !== 1) {
      PhoneBookService
        .createPerson(newObject)
        .then(
          response => {
            console.log(response);
            setPerson(persons.concat(response));
            setMessage(`${newName} is added`)
            setBorderEffect(1);
            setTimeout(() => {
              setMessage(null);
            }, 2000)

            setNewName('');
            setNewNumber('');
            setSearch('');
          }
        )

    } else {
      if (window.confirm(`${duplicateCheck[0].name} is already in 
      the list, want to update it's number?`)) {
        PhoneBookService
          .updatePerson(duplicateCheck[0].id, newObject)
          .then(
            (response) => {
              const newPersons =
                persons.map(person => person.id === response.id ? response : person);
              setPerson(newPersons);
              setMessage(`${duplicateCheck[0].name}'s number is updated`);
              setBorderEffect(2);
              setTimeout(() => {
                setMessage(null);
              }, 2000)
            }
          )
      }
    }
    console.log(persons);
  }

  const handelDelete = (id) => {
    const name = persons.find(person => person.id === id).name;
    const deleted = persons.filter(person => person.id !== id);
    PhoneBookService
      .removePerson(id)
      .then(() => {
        setPerson(deleted);
        setMessage(` ${name} is Deleted`)
        setBorderEffect(3);
        setTimeout(() => {
          setMessage(null);
        }, 2000)
      }).catch(
        () => {
          setPerson(deleted);
          setMessage(` ${name} is already deleted from the server`)
          setBorderEffect(3);
          setTimeout(() => {
            setMessage(null);
          }, 2000)
        }
      )
  }

  const Notification = ({ message }) => {


    const generalStyle = {
      color: 'gray',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    // mode = 1 if added
    // mode = 2 if updated
    // mode = 3 if deleted
    if (borderEffect === 1)
      generalStyle.color = 'green';
    if (borderEffect === 2)
      generalStyle.color = 'blue';
    if (borderEffect === 3)
      generalStyle.color = 'red';


    if (message === null) {
      return null;
    }
    return (

      <div className='error' style={generalStyle}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <Filter
        newSearch={newSearch}
        handelSearch={handelSearch}
      />


      <h2>add a new </h2>
      <PersonForm
        handleNewSubmit={handleNewSubmit}
        handelNumberChange={handelNumberChange}
        handleNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={filtered}
        handelDelete={handelDelete}
      />
    </div>
  )
}

export default App