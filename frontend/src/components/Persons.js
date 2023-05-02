const Persons = ({ persons, handelDelete }) => {
    return (
        <>
            {persons.map(person =>
                <Person 
                key={person.id}
                person={person}
                handelDelete={handelDelete}
                 />)}
        </>
    )
}

const Person = ({person, handelDelete}) => {

    const click = () =>{
        if(window.confirm(`do you want to Delete ${person.name}? `))
        handelDelete(person.id);
    };
    return (
                <li>
                    <> {person.name} {person.number}</>
                    <button onClick={click}>Delete</button>
                </li>
    );
}

export default Persons