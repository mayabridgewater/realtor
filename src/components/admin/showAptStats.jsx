import React from 'react';

import ApartmentBox from '../gallery/apartmentBox';

export default class ShowAptStats extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1
        }
    }
    changePage = (page) => {
        this.setState({
            page: page
        })
    }
    render() {
        let {apartments} = this.props;
        apartments = apartments.slice((this.state.page-1)*9, ((this.state.page-1)*9)+9);
        let status = this.props.status;
        const pages = Math.ceil(this.props.apartments.length / 9);
        let pageList = new Array(pages).fill(0);
        return (
            <div>
                <h3>{status === 'pending' && 'Pending'} 
                    {status === 'approved' && 'Active'} 
                    {status === 'denied' && 'Denied'} 
                    {status === 'removed' && 'Sold/Removed'} Apartments</h3>
                <div className='row'>
                    {apartments.map((item, i) => (
                        <div className={'col-md-6 col-lg-4'}>
                            <ApartmentBox {...item} key={i}/>
                        </div>
                    ))}
                </div>
                <div>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                    {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
                    {pageList.map((page, p) => (
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