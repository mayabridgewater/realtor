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
                <div className={'section border-bottom'} onClick={() => this.showSection(2)}>
                    <img src={'../images/prop_details.png'} alt={''}/>
                    <h4>Property Details</h4>
                    {this.state.display === 2 &&
                    <div className={'inner'}>
                        {apartment[0].description ? <p>{apartment[0].description}</p> 
                        :
                        <p>There is currently no additional information on this property</p>}
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default DropDown