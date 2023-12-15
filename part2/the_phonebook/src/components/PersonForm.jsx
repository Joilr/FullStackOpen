const PersonForm = ({
    newName,
    handlePersonChange,
    newNumber,
    handleNumberChange,
}) => {
    return (
        <div>
            <div>
                name: <input value={newName} onChange={handlePersonChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
        </div>
    );
};

export default PersonForm;
