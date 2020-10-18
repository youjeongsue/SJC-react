import React, { Component } from 'react';

import './RSidebar.css';
import img from '../../static/images/schedule.png';

class RSidebar extends Component {
    render() {
        return (
            <div className='rsidebar'>
                <div className='s-item todo'>
                    <div className='s-title'>TO DO</div>
                    <li>월요일 레포트 과제 공지</li>
                    <li>목요일 참고 자료 업로드</li>
                </div>
                <div className='s-item assignment'>
                    <div className='s-title'>ASSIGNMENT</div>
                    <li>HW1_2017100907_유정수</li>
                    <li>HW1_2015100905_김태호</li>
                </div>
                <div className='s-item schedule'>
                    <div className='s-title'>SCHEDULE</div>
                    <img src={img} alt=""/>
                </div>
            </div>
        )
    }
}

export default RSidebar;