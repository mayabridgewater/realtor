import React from 'react';

class DirList extends React.Component {
    render() {
        const {item, id} = this.props;
        return (
            <li>
                {id < 4 ? <a href={'/'}>{item}</a> :
                <a href={'/'}>{item} Real Estate Overview</a>
            }</li>
        )
    }
}

export default DirList