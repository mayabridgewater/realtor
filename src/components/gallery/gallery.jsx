import React from 'react';

import ApartmentBox from "./apartmentBox";


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: []
        }
    }

    componentDidMount() {
        const pages = Math.ceil(this.props.numOfAvail / 4);
        let pageList = new Array(pages).fill(0);
        this.setState({
            pages: pageList
        })
    }

    changePage(page) {
        this.props.nextPage(page)
    }
    render() {
        const {apartments} = this.props;
        return (
            <div id={'apartmentBox'}>
                <p>{this.props.numOfAvail} Available Homes</p>
                <div className={'galleryHeader'}>
                </div>
                <div className={'row'}>
                    {apartments.map((item, i) => (
                        <div id={'container'} className={'col-md-6 col-lg-4'} style={{position: 'relative'}}>
                            <ApartmentBox {...item} key={i}/>
                        </div>
                    ))}
                </div>
                <div>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
                    {this.state.pages.map((page, p) => (
                          <li class="page-item" onClick={() => this.changePage(p+1)} key={p}>{p+1}</li>
                    ))}
                    {/* <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
                    </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Gallery;
