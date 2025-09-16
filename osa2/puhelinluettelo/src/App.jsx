import { useState, useEffect } from 'react'
import Filter from '../../../components/Filter'
import Persons from '../../../components/PersonsNumbers'
import PersonsForm from '../../../components/PersonsForm'
import Notification from '../../../components/notification'
import personsService from './services/persons'

const App = () => {


  // tilat
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then(data => setPersons(data))
  }, [])
  
  // ADD kentän tapahtumankäsittelijä
  const addBoth = (event) => {
    event.preventDefault()

    // tarkistetaan onko nimi jo listassa ja jos on niin kysytään haluaako korvata
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = { ...personToUpdate, number: newNumber }
    
        personsService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(error.message)
            console.log('Error updating')
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    }

    // tarkistetaan onko numero jo listassa
    const personWithSameNumber = persons.find(person => person.number === newNumber)
    if (personWithSameNumber) {
      alert(`${newNumber} is already added to phonebook for ${personWithSameNumber.name}`)
      return
    }

    // lisätään uusi nimi ja numero listaan    
    const personObject = {
      name: newName,
      number: newNumber
    }
    personsService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(`Added ${newName}`)
      console.log('Creating worked')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    })
    .catch(error => {
      setErrorMessage(`Adding ${newName} failed`, error)
      console.log('Error creating')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })

  }


  // tapahtumankäsittelijä hakukentälle
  const handleSearchChange = (newSearch) => {
    setSearch(newSearch)
  }

  // poistetaan henkilö
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`Deleted ${persons.find(person => person.id === id).name}`)
          console.log('Deleting worked')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => { 
          setErrorMessage(error.Message)
          console.log('Error removing')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
    )}}
  

  // html koodi =>
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} type='error' />  
      <Notification message={successMessage} type='success' />

      <Filter onSearchChange={handleSearchChange}/>
      
      <h3>Add a new</h3>

      <PersonsForm 
      newName={newName} 
      setNewName={setNewName} 
      newNumber={newNumber} 
      setNewNumber={setNewNumber} 
      addBoth={addBoth} 
      />
      
      <h3>Numbers</h3>

      <Persons persons={persons} search={search} deletePerson={deletePerson}/> 
      
    </div>
  )
}

export default App