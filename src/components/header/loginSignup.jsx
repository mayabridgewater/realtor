import React from 'react';

class LoginSignup extends React.Component {
    render() {
        const {id, handleForm, check} = this.props;
        return (
            <div className={'openForm'}>
                <div className={'formLeft'}>
                    {id === 1 ? <h3>Log in to your account</h3> : <h3>Welcome to realtor.com</h3> }
                    {id === 1 ? <span>Access all your saved properties, searches, notes and more.</span> : <span>Sign up to get property updates, home search tips and local insights via email.</span> }
                    <form>
                        <input type={'text'} placeholder={'Email Address'}/>
                        <input type={'text'} placeholder={'Password'}/>
                        {id === 1 ?
                            <span><a href={'/'}>Forgot Password?</a></span> :
                            <div>
                                <input type={'radio'} id={'radio'} name={'send'} checked onClick={check}/>Send me news, tips and promos from Move and realtor.com® using my email address.
                            </div>}
                        {id === 1 ?
                            <div>
                                <button>Log in</button>
                                <span className={'toAccount'} onClick={() => handleForm(2)}>No account? Sign Up</span>
                            </div>
                            :
                            <div className={'signUp'}>
                                <button>Sign Up</button>
                                <span className={'toAccount'} onClick={() => handleForm(1)}>Registered? Log In</span>
                            </div>}
                    </form>
                    <div className={'options'}>
                        {id === 1 ? <button style={{border: '1px solid #3b5998', background: '#3b5998', color: 'white'}}>Or, Log in with Facebook</button> : <button style={{border: '1px solid #3b5998', background: '#3b5998', color: 'white'}}>Or, sign up with Facebook</button>}
                        <button>Log in with Google</button>
                    </div>
                    {id ===2 && <span>By creating an account you agree to our <a href={'/'} style={{color: 'grey'}}>Terms of Use</a> and <a href={"/"} style={{color: 'grey'}}>Privacy Policy</a>.</span>}
                </div>
                <div className={'formRight'}>
                    <h3>Real estate professional?</h3>
                    <div>Manage your profile, leads, listing and more.</div>
                    {id === 1 ? <button>Pro Log in</button> : <button>Pro Sign up</button>}
                    {id === 1 ? <span><a href={'/'}>No professional account? Sign up here</a></span> : <span><a href={'/'}>Already registered? Log in here</a></span>}
                </div>
                <img src={'../images/xIcon.png'} alt={'close'} className={'exitBtn'} onClick={() => handleForm(false)}/>
            </div>
        );
    }
}

export default LoginSignup