import React from 'react'

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

export default InputBlock;
