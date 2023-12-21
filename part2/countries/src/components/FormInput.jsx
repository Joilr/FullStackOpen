const FormInput = ({ onChange }) => {
    return (
      <form>
        find countries: <input onChange={onChange} />
      </form>
    );
  };

export default FormInput;