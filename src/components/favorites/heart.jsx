import React from 'react';

class Heart extends React.Component {
    constructor() {
        super();
        this.state = {
            favorite: false,
        }
    }

    handleFavorite = () => {
        this.setState({
            favorite: !this.state.favorite,
        }, () => this.props.returnFavorites(this.props.apartmentId, this.state.favorite));
    };

    render() {
        const {apartmentId, locationId} = this.props;
        const className = locationId === 1 ? `fas fa-heart icon ${this.state.favorite ? 'favorite' : ''}` : `far fa-heart ${this.state.favorite ? 'favorite' : ''}`;

        return (
            <div>
                <i className={className} onClick={this.handleFavorite}/>
            </div>
        );
    }
}

export default Heart