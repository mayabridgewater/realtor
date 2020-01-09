import React from 'react';

class BottomSection extends React.Component {
    render() {
        return (
            <div>
                <div className={'d-flex topSection'}>
                    <div className={'topLeft'} style={{background: 'url("../images/homepage50.jpeg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                    <div className={'topRight'}>
                        <h2>Need a home loan? Get pre-approved</h2>
                        <p>Find a lender who can offer competitive mortgage rates and help you with pre-approval.</p>
                        <button>Get pre-approved now</button>
                    </div>
                </div>
                <div className={'d-flex bottomSection'}>
                    <div className={'bottomLeft'}>
                        <h2>Find Your Neighborhood</h2>
                        <p>Does it have pet-friendly rentals? What are the crime rates? How are the schools? Get important local information on the area you're most interested in.</p>
                        <form className={'d-flex'}>
                            <input type={'text'} className={'bottomInput'}/>
                            <button>Search</button>
                        </form>
                    </div>
                    <div className={'bottomRight'} style={{background: 'url("../images/homepage50-2.jpeg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}/>
                </div>
            </div>
        )
    }
}

export default BottomSection