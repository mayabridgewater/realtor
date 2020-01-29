import React from 'react';

import ApartmentBox from "./apartmentBox";


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 1
        }
    }

    componentDidMount() {
        this.changePage(1)
    }

    changePage(page) {
        this.props.nextPage(page);
        this.setState({
            clicked: page
        })
    }
    render() {
        const {apartments} = this.props;
        const pages = Math.ceil(this.props.numOfAvail / 9);
        let pageList = new Array(pages).fill(0);
        return (
            <div id={'apartmentBox'}>
                <p>{this.props.numOfAvail} Available Homes</p>
                <div className={'galleryHeader'}>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => (
                        <div id={'container'} key={i} className={'col-md-6 col-lg-4'} style={{position: 'relative'}}>
                            <ApartmentBox {...item}/>
                        </div>
                    ))}
                </div>
                <div>
                    <nav aria-label="Page navigation example">
                    <ul className="pagination">
                    {pageList.map((page, p) => (
                          <li className={this.state.clicked === p+1 ?'page-item clicked' : 'page-item'} onClick={() => this.changePage(p+1)} key={p}>{p+1}</li>
                    ))}
                    </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Gallery;
