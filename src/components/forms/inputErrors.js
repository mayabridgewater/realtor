import React from 'react';

function InputErrors (props) {
    return (
        props.errors.map((error, e) => (
            <small key={e} className='form-text text-danger' style={{fontSize: '15px'}}>{error}</small>
        ))
    );
}

export default InputErrors