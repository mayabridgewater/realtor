import React from 'react';

class ListItem extends React.Component {
    render() {
        const {title, href} = this.props;
        return (
            <li>
                {href ? <li><a href={href}>{title}</a></li> : <li className={'title'}>{title}</li>}
            </li>
        );
    }
}

export default ListItem