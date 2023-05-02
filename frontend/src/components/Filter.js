const Filter = ({newSearch, handelSearch}) => {

    return (
        <div>
            filter shown with
            <input
                value={newSearch}
                onChange={handelSearch}
            />
        </div>
    )
}

export default Filter