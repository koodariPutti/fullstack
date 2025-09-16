const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addBoth }) => {
    return (
      <form onSubmit={addBoth}>
        <div>Name: <input value={newName} onChange={event => setNewName(event.target.value)} /></div>
        <div> Number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} /></div>
        <div><button type="submit">Add</button></div>
      </form>
    );
  };
  
  export default PersonForm;