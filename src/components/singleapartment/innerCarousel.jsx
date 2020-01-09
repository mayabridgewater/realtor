import React from 'react';

class InnerCarousel extends React.Component {
    render() {
        const {image} = this.props;
        return (
            <div className="carousel-item">
                <img className="d-block w-100" src={'../images/apartment/' + image} alt={''}/>
            </div>
        );
    }
}

export default InnerCarousel