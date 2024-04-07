import React from 'react';
import './index.css';

const Input = ({ label, inputRef, ...rest }: { label: string, type: string, placeholder: string, inputRef: any }) => {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input className="input-field" ref={inputRef} {...rest}/>
        </div>
    );
};

export default Input;