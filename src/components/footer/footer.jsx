import React from 'react';
import {websiteNav} from "../homepage/directoryLists/websiteNav";
import FooterNav from "./footerNav";
import {products} from "../homepage/directoryLists/products";
import {newsCorp} from "../homepage/directoryLists/newsCorp";

class Footer extends React.Component {
    render() {
        const {id} = this.props;
        return (
            <div className={'footer'}>
                <div className={'topFoot'}>
                    <div className={'container social'}>
                        <div className={'media'}>
                            <a href={'https://www.facebook.com'} target={"_blank"}><img src={`${id === 3 ? '../images/facebook.png' : './images/facebook.png'}`} alt={'facebook'}/></a>
                            <a href={'https://twitter.com'} target={"_blank"}><img src={`${id === 3 ? '../images/twitter.png' : './images/twitter.png'}`} alt={'twitter'}/></a>
                            <a href={'https://il.linkedin.com'} target={"_blank"}><img src={`${id === 3 ? '../images/linkedin.png' : './images/linkedin.png'}`} alt={'Linkedin'}/></a>
                            <a href={'https://www.instagram.com'} target={"_blank"}><img src={`${id === 3 ? '../images/instagram.png' : './images/instagram.png'}`} alt={'instagram'}/></a>
                            <a href={'https://www.pinterest.com'} target={"_blank"}><img src={`${id === 3 ? '../images/pinterest.png' : './images/pinterest.png'}`} alt={'pinterest'}/></a>
                            <a href={'https://www.youtube.com'} target={"_blank"}><img src={`${id === 3 ? '../images/youtube.png' : './images/youtube.png'}`} alt={'youtube'}/></a>
                        </div>
                    </div>
                </div>
                <div className={'bottomFoot'}>
                    <div className={'container'}>
                        <p className={'rights'}>1995-2020 <span>National Association of REALTORS</span> and <span>Move, Inc.</span> All rights reserved.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export  default Footer