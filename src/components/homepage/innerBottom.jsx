import React from 'react';
import DirList from "./DirList";

class InnerBottom extends React.Component {
    constructor() {
        super();
        this.state = {
            display: null
        }
    }
    showMore = (id) => {
        this.setState({
            display: this.state.display === id ? null : id
        })
    };
    render() {
        const {title, body, id} = this.props;
        const firstFour = body.slice(0, 4);
        return (
            <div className={'col-md-6 col-lg-3'}>
                <h5>{title}</h5>
                <ul>
                    {!this.state.display ? firstFour.map((item, i) => <DirList item={item} key={i} id={id+1}/>)
                    : body.map((item, i) => <DirList item={item} key={i} id={id+1}/>)}
                </ul>
                <div className={'dirBtn'}>
                    <button onClick={() => this.showMore(id+1)}>{!this.state.display ? 'Show More' : 'Show Less'}</button>
                </div>
            </div>
        );
    }
}

export default InnerBottom