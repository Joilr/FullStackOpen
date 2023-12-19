const Filter = ({ value, onChange }) => {
  return (
    <form>
      <input value={value} onChange={onChange} />
    </form>
  );
};

export default Filter;
