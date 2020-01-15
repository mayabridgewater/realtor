import React from 'react';

class Login extends React.Component {
    render() {
        const {handleForm} = this.props;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'}>
                    <h3>Log in to your account</h3>
                    <span>Access all your saved properties, searches, notes and more.</span> 
                    <form>
                        <input type={'text'} placeholder={'Email Address'}/>
                        <input type={'text'} placeholder={'Password'}/>
                            <span><a href={'/'}>Forgot Password?</a></span>
                    
                            <div>
                                <input type="submit" className="submit" value="Log In"/>
                                <span className={'toAccount'} onClick={() => handleForm(2)}>No account? Sign Up</span>
                            </div>
                           
                    </form>
                    <div className={'options'}>
                        <button style={{border: '1px solid #3b5998', background: '#3b5998', color: 'white'}}>Or, Log in with Facebook</button>
                        <button>Log in with Google</button>
                    </div>
                    
                </div>
                <div className={'formRight'}>
                    <h3>Real estate professional?</h3>
                    <div>Manage your profile, leads, listing and more.</div>
                    <button>Pro Log in</button>
                    <span><a href={'/'}>No professional account? Sign up here</a></span>
                </div>
                <img src={'../images/xIcon.png'} alt={'close'} className={'exitBtn'} onClick={() => handleForm(false)}/>
            </div>
        );
    }
}

export default Login