import React from 'react';

class InnerTop extends React.Component {
    render() {
        const {title, body} = this.props;
        return (
            <div className={'col-md-6 col-lg-3'}>
                <h5>{title}</h5>
                <ul>
                    {body.map((item, i) => <li key={i}><a href={'/'}>{item}</a></li>)}
                </ul>
            </div>
        );
    }
}

export default InnerTop