import React from 'react';

class OverImage extends React.Component {
    render() {
        return(
            <div>
                <p className={'absTopBox'}>NEW-11 HOURS AGO</p>
                <div className={'absBottomBox'}>
                    <p>House for Sale</p>
                    <p className={'price'}>${this.props.price}</p>
                </div>
            </div>
        )
    }
}

export default OverImage