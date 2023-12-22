const Filter = ({ value, onChange }) => {
  return (
    <form>
      filter: <input value={value} onChange={onChange} />
    </form>
  );
};

export default Filter;
