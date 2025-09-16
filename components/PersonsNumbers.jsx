import Person from './Person';

const Persons = ({ persons = [], search = '', deletePerson }) => {
  return (
    <div>
      {persons
        .filter(person =>
          String(person?.name ?? '').toLowerCase().includes(String(search ?? '').toLowerCase())
        )
        .map(person => (
          person &&
          <div key={person.id ?? person.name}>
            <Person person={person} />
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        ))}
    </div>
  );
};
  
export default Persons;
