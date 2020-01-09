import React from 'react';

class DropDown extends React.Component {
    constructor() {
        super();
        this.state = {
            display: null
        }
    }

    showSection = (index) => {
      this.setState({
          display: this.state.display === index ? null : index
      })
    };
    render() {
        const {apartment} = this.props;
        return (
            <div id={'dropDown'} className={'customContainer details'}>
                <p className={'border-bottom'}><a href={'/'}>Get Up To 4 Free Moving Quotes</a></p>
                <div className={'section border-bottom'} onClick={() => this.showSection(1)}>
                    <img src={'../images/openhouse.png'} alt={''}/>
                    <h4>Open Houses</h4>
                    {this.state.display === 1 &&
                    <div className={'inner'}>
                        <p>Contact agent for a private showing.</p>
                        <button>Request a Private showing</button>
                    </div>
                    }
                </div>
                <div className={'section border-bottom'} onClick={() => this.showSection(2)}>
                    <img src={'../images/prop_details.png'} alt={''}/>
                    <h4>Property Details</h4>
                    {this.state.display === 2 &&
                    <div className={'inner'}>
                        <p>{apartment.description}</p>
                        <div style={{textAlign: 'center'}}>
                            <h5>Find out more about this property.</h5>
                            <button style={{display: 'inline-block'}}>Email Agent</button>
                        </div>
                    </div>
                    }
                </div>
                <div className={'section border-bottom'} onClick={() => this.showSection(3)}>
                    <img src={'../images/calculator.png'} alt={''}/>
                    <h4>Monthly Payment</h4>
                    {this.state.display === 3 &&
                    <div className={'inner'}/>
                    }
                </div>
                <div className={'section border-bottom'} onClick={() => this.showSection(4)}>
                    <img src={'../images/prop_history.png'} alt={''}/>
                    <h4>Property History</h4>
                    {this.state.display === 4 &&
                    <div className={'inner'}/>
                    }
                </div>
                <div className={'section border-bottom'} onClick={() => this.showSection(5)}>
                    <img src={'../images/grad_cap.png'} alt={''}/>
                    <h4>Nearby Schools</h4>
                    {this.state.display === 5 &&
                    <div className={'inner'}/>
                    }
                </div>
                <div className={'section border-bottom'} onClick={() => this.showSection(6)}>
                    <img src={'../images/map.png'} alt={''}/>
                    <h4>Neighborhood</h4>
                    {this.state.display === 6 &&
                    <div className={'inner'}/>
                    }
                </div>
            </div>
        );
    }
}

export default DropDown