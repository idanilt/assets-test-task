import React from 'react'
import PropTypes from 'prop-types'

const InputBlock = ({ name, value, type, placeholder, onChange }) => {
 return (
   <div className="form-group">
     <input
       value={value}
       type={type}
       className="form-control"
       name={name}
       onChange={onChange}
       placeholder={placeholder} />
   </div>
 )
};

InputBlock.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default InputBlock;
