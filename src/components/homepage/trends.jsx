import React from 'react';

class Trends extends React.Component {
    render() {
        return (
            <div className={'trends'} style={{background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(./images/trends.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <p>Trends</p>
                <h2>Funny How Joe Pesci's Jersey Mansion Is the Week's Most Popular Home</h2>
                <button>Read More</button>
            </div>
        );
    }
}

export default Trends