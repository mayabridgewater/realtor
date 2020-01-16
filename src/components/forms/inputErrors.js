import React from 'react';

function InputErrors (props) {
    return (
        props.errors.map((error, e) => (
            <small key={e} className='form-text text-danger'>{error}</small>
        ))
    );
}

export default InputErrors