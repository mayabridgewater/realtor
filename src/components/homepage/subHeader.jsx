import React from 'react'

class SubHeader extends React.Component {
    render() {
        return (
            <div className={'d-flex justify-content-center align-items-center subHeader'}>
                <i className={"fas fa-check"}/>
                <p className={'m-0'}>Be Ready to Buy<span className={"d-none d-md-inline-block"}>...How Much Can You Borrow?</span></p>
                <button className={'approvedBtn'}><a href={"/"}>Get Pre-Approved</a></button>
            </div>
        )
    }
}

export default SubHeader