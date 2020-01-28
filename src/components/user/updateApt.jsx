import React from 'react';

import validate from '../forms/validation';
import InputErrors from '../forms/inputErrors';
import {updateApartment} from '../dataFromToServer';

export default class UpdateApt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: {value: this.props.apartment.price, errors: [], validations: {required: true}},
            number_of_room: {value: this.props.apartment.number_of_room, errors: [], validations: {required: false}},
            number_of_bath: {value: this.props.apartment.number_of_bath, errors: [], validations: {required: false}},
            sqft: {value: this.props.apartment.sqft, errors: [], validations: {required: true}},
            description: {value: this.props.apartment.description, errors: [], validations: {required: false}},
            sale_status: {value: this.props.apartment.sale_status, errors: [], validations: {required: true}},
            property_type: {value: this.props.apartment.property_type, errors: [], validations: {required: true}},
            availability: {value: this.props.apartment.availability, errors: [], validations: {required: true}},
            main_image: {value: this.props.apartment.main_image, errors: [], validations: {required: false}},
            images: {value: this.props.apartment.images, error: [], validations: {required: false}},
            new_main_image: {value: '', errors: [], validations: {required: false}},
            new_images: {value: '', error: [], validations: {required: false}}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    handleChange({target: {name, value}}) {
        this.setState({
            [name]: {
                ...this.state[name],
                value
            }                
        })
    }

    deleteImg = (name) => { 
        if (name === 'main_image') {
            this.setState({
                main_image: {
                    ...this.state.main_image,
                    value: ''
                }
            })
        }else {
            const newList = this.state.images.value.slice();
            for (let prop in newList) {
                if (newList[prop].id === name) {
                    newList.splice(newList.indexOf(newList[prop]),1);
                }
            }
            this.setState({
                images: {
                    ...this.state.images,
                    value: newList
                }
            })
        }
    }

    undoImgDelete = () => {
        this.setState({
            main_image: {
                ...this.state.main_image,
                value: this.props.apartment.main_image
            }
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let isValid = true;
        const stateCopy = {...this.state};
        const formData = new FormData();
        formData.append('id', this.props.apartment.id);
        formData.append('user_id', this.props.apartment.user_id);
        formData.append('address', this.props.apartment.address);
        formData.append('city_id', this.props.apartment.city_id);

        for (let prop in this.state) {
            const errors = validate(prop, this.state[prop].value, this.state[prop].validations);
            if (errors.length) {
                isValid = false;
                stateCopy[prop].errors = errors
            } else if (prop === 'new_images') {
                const images = (document.querySelector('#multipleImages').files);
                Array.from(images).forEach(file => {
                    formData.append('new_images', file)
                })
            }else if (prop === 'new_main_image') {
                if (this.state.main_image.value) {
                    continue
                }else {
                    const new_main_image = document.querySelector('input[type="file"]').files[0];
                    formData.append('new_main_image', new_main_image);
                }
            }else if (prop === 'images') {
                for (let i = 0; i < this.state.images.value.length; i++) {
                    formData.append('image', this.state.images.value[i].id)
                }
            }
            formData.append(`${prop}`, this.state[prop].value)
        }
        if (isValid) {
            formData.append('status', 'pending');
            await updateApartment(formData);
            window.location.replace('/userprofile')
        } else {
            this.setState({
                ...stateCopy
            })
        }
    }

    render() {
        return (
            <div className='updateApt'>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">

                    <div className='inputArea'>
                        <label>Price</label>   
                        <input type='text' name='price' value={this.state.price.value} onChange={this.handleChange} onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.price.errors}/>
                    </div>

                    <div className='inputArea'>
                        <label>Rooms</label>   
                        <input type='text' name='number_of_room' value={this.state.number_of_room.value} onChange={this.handleChange} onBlur={this.inputChange}/>
                    </div>

                    <div className='inputArea'>
                        <label>Bathrooms</label>   
                        <input type='text' name='number_of_bath' value={this.state.number_of_bath.value} onChange={this.handleChange} onBlur={this.inputChange}/>
                    </div>

                    <div className='inputArea'>
                        <label>Sqft</label>   
                        <input type='text' name='sqft' value={this.state.sqft.value} onChange={this.handleChange} onBlur={this.inputChange}/>
                        <InputErrors errors={this.state.sqft.errors}/>
                    </div>

                    <div className='inputArea'>
                        <label>Description</label>
                        <textarea className="form-control" rows="3" name='description' value={this.state.description.value} onChange={this.handleChange} onBlur={this.inputChange}></textarea>
                    </div>

                    <div className='inputArea'>
                        <label>Sale Status</label>
                        <select className="form-control" name='sale_status' value={this.state.sale_status.value} onChange={this.handleChange} onBlur={this.inputChange}>
                            <option value='sale'>For Sale</option>
                            <option value='rent'>For Rent</option>
                            <option value='both'>Both</option> 
                        </select>
                        <InputErrors errors={this.state.sale_status.errors}/>
                    </div>

                    <div className='inputArea'>
                        <label>Property Type</label>
                        <select className="form-control" name='property_type' value={this.state.property_type.value} onChange={this.handleChange} onBlur={this.inputChange}>
                            <option value='house'>House</option>
                            <option value='ranch'>Ranch</option>
                            <option value='condo'>Condo</option>
                            <option value='land'>Land</option> 
                        </select>
                        <InputErrors errors={this.state.property_type.errors}/>
                    </div>

                    <div className='inputArea'>
                        <label>Availability</label>
                        <select className="form-control" name='availability' value={this.state.property_type.value} onChange={this.handleChange} onBlur={this.inputChange}>
                            <option value='available'>Available</option>
                            <option value='suspended'>Suspend</option>
                            <option value='removed'>Remove</option>
                        </select>
                    </div>

                    <div className='inputArea'>
                        <label>Main Image</label>
                        {!this.state.main_image.value ?
                            <div>
                                <input type="file" name="new_main_image"/>
                                <span onClick={this.undoImgDelete} className='delete'>Undo</span>
                            </div>
                            :
                            <div>
                                <div className='mainImage' name='main_image' style={{backgroundImage: `url("http://localhost:3000${this.state.main_image.value}")`}}>
                                </div>
                                <span onClick={() => this.deleteImg('main_image')} className='delete'>Delete</span>
                            </div>
                        }
                    </div>

                    <div className='inputArea'>
                        <label>Images</label>
                        <div className='slideMain slider'>
                        {this.state.images.value.map((image, i) => (
                            <div key={i}>
                                <div className='mainImage'  name='images' value={image.id} style={{backgroundImage: `url("http://localhost:3000${image.url}")`}}></div>
                                <span onClick={() => this.deleteImg(image.id)} className='delete'>Delete</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className='inputArea'>
                        <label>Add Pictures</label>
                        <input type="file" id='multipleImages' name="new_images" multiple/>
                    </div>
                
                </div>
                <input type='submit' className='submit'></input>
                </form>
            </div>
        )
    }
}