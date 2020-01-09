import React from 'react';
import ListItem from "./listItem";

class List extends React.Component {
    render() {
        const {innerNav} = this.props;
        return (
            <div className={'dropdown'}>
                <ul className={'sideList d-flex justify-content-around'}>
                    {innerNav.map((element, e) => <ul>
                        {element.map((current, c) =><ListItem {...current} key={c}/>)}</ul>)}
                </ul>
            </div>
        );
    }
}

export default List