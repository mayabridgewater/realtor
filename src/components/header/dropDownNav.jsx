import React from 'react';
import List from "./list";

class DropDownNav extends React.Component {
    constructor(){
        super();
        this.state = {
            display: null,
        }
    }

    showStyle = (index) => {
        this.setState({
            display: this.state.display === index ? null : index
        })
    };

    render() {
        const {label, innerNav, i, burgerMenu} = this.props;
        return (
            <div onMouseEnter={() => !burgerMenu && this.showStyle(i)} onMouseLeave={() => !burgerMenu && this.showStyle(-1)}>
                <h3 className={'toggle'} onClick={() => this.showStyle(i)}>{label}</h3>
                {innerNav && this.state.display === i && <List innerNav={innerNav}/>}
            </div>

        )
    }
}

export default DropDownNav