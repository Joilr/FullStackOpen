import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import '../output.css';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className={props.className} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="p-4 m-6 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
