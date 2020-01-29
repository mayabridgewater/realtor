import React from 'react';

import {getImages} from '../dataFromToServer';

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [],
            currentMain: ''
        }
    }

    async componentDidMount() {
        const images = await getImages(this.props.apartment[0].id);
        this.setState({
            images,
            currentMain: `http://localhost:3000${this.props.apartment[0].main_image}`
        })
    }

    switchCurrent(id, url) {
        const current = this.state.currentMain;
        const small = document.querySelector('#image'+id);
        this.setState({
            currentMain: small.src
        });
        small.src = current;
    }

    render() {
        return (
            <div className="carouselWrapper">
                <div className="row">
                    <div className='col-md-8'>
                        <div className='singleMainImg' style={{backgroundImage: `url(${this.state.currentMain})`}}>
                        </div> 
                    </div>
                    <div className='col-md-3'>
                        <div>    
                            <div className='row moreImgs'>
                                {this.state.images.map((image, i) => (
                                    <div className='col-md-6 extraImg'>
                                        <img class="img-fluid" src={'http://localhost:3000/' + image.url} id={'image'+image.id} onClick={() => this.switchCurrent(image.id, image.url)}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Carousel