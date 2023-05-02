
const PersonForm = (
    {handleNewSubmit,
        newName, 
        handleNameChange,
        newNumber, 
        handelNumberChange,

     }) => {
    return (
      <form onSubmit={handleNewSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handelNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm