import React from 'react';
import {Link} from "react-router-dom";
// import '../fontawesome-free-5.10.2-web/css/all.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            display: null,
            displayResults: null,
            displayPrice: true
        }
    }

    showStyle = (index) => {
        this.setState({
            display: this.state.display === index ? -1 : index
        })
    };

    changePrice = (state) => {
        this.setState({
            displayPrice: !state ? true : null
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();document.getElementById('citySearch').value = '';
        const data = this.state;
        this.props.filterSearch(data);
        this.setState({
            display: null,
            displayResults: true,
        })
    };

    toggleAlCheckboxes = () => {
        const cb = document.getElementsByClassName('prop-type-cb');
        for (let i = 0; i < cb.length; i++) {
            const name = cb[i].name;
            cb[i].checked = !cb[i].checked;
            this.setState({
                [name]: cb[i].value
            });
        }
    };
    returnValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    returnPropValue = (e) => {
        const name = e.target.name;
        if (e.target.checked) {
            this.setState({
                [name]: e.target.value
            })
        } else {
            this.setState({
                [name]: null
            })
        }
    };

    getChosenProperty = () => {
      const prop = document.getElementsByClassName('prop-type-cb');
      let list = [];
      for (let i = 0; i <prop.length; i++) {
          if (prop[i].checked) {
              list.push(prop[i].value)
          }
      }

      return list
    };

    resetSearch = () => {
        this.setState({
            displayResults: false
        });
        this.props.reset()
    };

    render() {
        const {aptLength} = this.props;
        return (
            <div className={'container-fluid filters'}>
                <div className={'d-flex pt-3 justify-content-between align-center'}>
                    <form onSubmit={this.handleSubmit} className={'d-flex'} autoComplete={"off"}>
                        <div className={'citySearch pr-3'}>
                            <input type='text' name='city' id={'citySearch'} onChange={this.returnValue} placeholder={'City'}/>
                            <i className="fas fa-search searchIcon" onClick={this.handleSubmit}/>
                        </div>
                        <div className={'searchBtn pr-3'}><button type='button' className={'btn'} onClick={() => this.showStyle(1)}>Price</button>
                            {this.state.display === 1 &&
                            <div className={'priceFilter radio'}>
                                <h3>Price</h3>
                                <div className={'d-flex container-fluid pt-3'}>
                                    <div style={{paddingRight: '8px'}}>
                                        <input type='text' name='minprice' onChange={this.returnValue} placeholder={'Min Price'} value={this.state.minprice} style={{margin:0}} onFocus={() => this.changePrice(false)}/>
                                        {this.state.displayPrice && <div>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={0} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$0</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={200000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$200K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={400000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$400K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={600000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$600K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={800000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$800K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={1000000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$1M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={1200000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$1.2M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'minprice'} value={1400000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$1.4M</p>
                                            </label>
                                        </div>}
                                    </div>
                                    <span>-</span>
                                    <div style={{paddingLeft: '8px'}}>
                                        <input type='text' name='maxprice' onChange={this.returnValue} placeholder={'Max Price'} value={this.state.maxprice} style={{margin:0}} onFocus={() => this.changePrice(true)}/>
                                        {!this.state.displayPrice && <div>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={350000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$350K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={700000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$700K</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={1000000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$1M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={1400000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$1.4M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={1800000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$1.8M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={2200000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$2.2M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={2400000} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>$2.4M</p>
                                            </label>
                                            <label>
                                                <input type={'radio'} name={'maxprice'} value={'Any Price'} onChange={this.returnValue} className={'radiobtn'}/>
                                                <p>Any Price</p>
                                            </label>
                                        </div>}
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className={'searchBtn pr-3 d-none d-md-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(2)}>Property Type</button>
                            {this.state.display === 2 &&
                                <div className={'property'}>
                                    <h3>Property Type</h3>
                                    <div className={'row container-fluid propertyTypes'}>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pAll' className={'prop-type-cb radiobtn'} value='any' onChange={this.toggleAlCheckboxes}/>
                                            <img src={'./images/filters/any.png'} alt={''}/><span>Any</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pSingle' className={'prop-type-cb radiobtn'} value='single' onClick={this.returnPropValue}/>
                                            <img src={'./images/filters/single.png'} alt={''}/><span>Single Family Home</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pMulti' className={'prop-type-cb radiobtn'} value='multi' onClick={this.returnPropValue}/>
                                            <img src={'./images/filters/multi.png'} alt={''}/><span>Multi Family Home</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pCondo' className={'prop-type-cb radiobtn'} value='condo' onClick={this.returnPropValue}/>
                                            <img src={'./images/filters/condo.png'} alt={''}/><span>Condo/Townhome</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pMobile' className={'prop-type-cb radiobtn'} value='mobile' onClick={this.returnPropValue}/>
                                            <img src={'./images/filters/mobile.png'} alt={''}/><span>Mobile</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pFarm' className={'prop-type-cb radiobtn'} value='farm' onClick={this.returnPropValue}/>
                                            <img src={'./images/filters/farm.png'} alt={''}/><span>Farm</span>
                                        </label>
                                        <label className={'col-6'}>
                                            <input type='checkbox' name='pLand' className={'prop-type-cb radiobtn'} value='land' onChange={this.returnPropValue}/>
                                            <img src={'./images/filters/land.png'} alt={''}/><span>Land</span>
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={'searchBtn pr-3 d-none d-sm-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(3)}>Beds</button>
                        {this.state.display === 3 &&
                            <div className={'beds radio'}>
                                <h3>Bedrooms</h3>
                                <div className={'d-flex pt-3'}>
                                    <label>
                                        <input type="radio" name="beds" value="0" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>Any</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="beds" value="1" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>1+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="beds" value="2" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>2+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="beds" value="3" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>3+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="beds" value="4" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>4+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="beds" value="5" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>5+</p>
                                    </label>
                                </div>
                                <span className={'filterText'}>Or select Bedrooms Range</span>
                                <div className={'d-flex container-fluid'}>
                                    <input type='text' name='minbeds' onChange={this.returnValue} placeholder={'From'}/>
                                    <span>-</span>
                                    <input type='text' name='maxbeds' onChange={this.returnValue} placeholder={'To'}/>
                                </div>
                            </div>}
                        </div>
                        <div className={'searchBtn pr-3 d-none d-sm-block'}><button type='button' className={'btn'} onClick={() => this.showStyle(4)}>Baths</button>
                            {this.state.display === 4 &&
                            <div className={'beds radio'}>
                                <h3>Bathrooms</h3>
                                <div className={'d-flex pt-3'}>
                                    <label>
                                        <input type="radio" name="baths" value="0" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>Any</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="baths" value="1" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>1+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="baths" value="2" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>2+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="baths" value="3" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>3+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="baths" value="4" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>4+</p>
                                    </label>
                                    <label>
                                        <input type="radio" name="baths" value="5" onChange={this.returnValue} className={'radiobtn'}/>
                                        <p>5+</p>
                                    </label>
                                </div>
                                <span className={'filterText'}>Or select Bathrooms Range</span>
                                <div className={'d-flex container-fluid'}>
                                    <input type='text' name='minbaths' onChange={this.returnValue} placeholder={'From'}/>
                                    <span>-</span>
                                    <input type='text' name='maxbaths' onChange={this.returnValue} placeholder={'To'}/>
                                </div>
                            </div>}
                        </div>
                        <button className={'btn search'}>Search</button>
                        {this.state.displayResults && <button className={'btn search'} onClick={this.resetSearch}>Reset</button>}
                    </form>
                    <Link to={'/favorites'}><p>Favorite Homes</p></Link>
                </div>
                {this.state.displayResults &&
                <div className={'searchResults'}>
                    <h4>Showing results for: </h4>
                    <div className={'d-flex'}>
                    {this.state.city && <p>{this.state.city} </p>}
                    {this.state.minprice || this.state.maxprice ? <p>Price: </p>: <p/>}
                    {this.state.minprice && <p>minimum {this.state.minprice} </p>}
                    {this.state.minprice && this.state.maxprice ? <p>to </p> : <p/>}
                    {this.state.maxprice && <p>maximum {this.state.maxprice} </p>}

                    {this.getChosenProperty()}


                    {this.state.beds && <p>Beds: {this.state.beds}</p>}
                    {this.state.minbeds && <p>minimum beds: {this.state.minbeds}</p>}
                    {this.state.maxbeds && <p>maximum beds: {this.state.maxbeds}</p>}
                    {this.state.baths && <p>Baths: {this.state.baths}</p>}
                    {this.state.minbaths && <p>minimum baths: {this.state.minbaths}</p>}
                    {this.state.maxbaths && <p>maximum baths: {this.state.maxbaths}</p>}
                    </div>
                    <div><p>{aptLength} apartments match your search</p></div>
                </div>}
            </div>
        )
    }
}

export default Search