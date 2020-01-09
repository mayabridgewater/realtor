import React from 'react';

class ApartmentForm extends React.Component {
    render() {
        const {address} = this.props;
        return (
            <div className={'aptForm d-none d-lg-flex flex-column'}>
                <p>More about this property</p>
                <form className={'d-flex flex-column'}>
                    <input type={'text'} placeholder={'Full Name'} required/>
                    <input type={'text'} placeholder={'Email'} required/>
                    <input type={'text'} placeholder={'Phone'}/>
                    <textarea defaultValue={'I am interested in ' + address}/>
                    <button>Email Agent</button>
                </form>
                <span>By proceeding, you consent to receive calls and texts at the number you provided, including marketing by autodialer and prerecorded and artificial voice, and email, from realtor.com and others about your inquiry and other home-related matters, but not as a condition of any purchase. More...</span>
            </div>
        );
    }
}

export default ApartmentForm