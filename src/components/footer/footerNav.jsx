import React from 'react';

class FooterNav extends React.Component {
    render() {
        const {item} = this.props;
        return (
            <li>
                <a href={'/'}>{item}</a>
            </li>
        );
    }
}

export default FooterNav