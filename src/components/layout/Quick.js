import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Quick.css';
import quickImg from '../../static/images/quick.png';

class Quick extends Component {
    render() {
        return (
            <div>
                <div className='quick'>
                    <div className='q-icon'>
                        <p>Quick Menu</p>
                        <img src={quickImg} alt=""/>
                    </div>
                    <div className='q-menu'>
                        <Link className='q-item' to={`/lecture/${this.props.id}`}>강의실</Link>
                        <Link className='q-item' to={`/lecture/${this.props.id}/notice`}>공지사항</Link>
                        <Link className='q-item' to={`/lecture/${this.props.id}/assignments`}>과제 및 평가</Link>
                        <Link className='q-item' to={`/lecture/${this.props.id}/test`}>시험 및 설문</Link>
                        <Link className='q-item' to={`/lecture/${this.props.id}/attendance`}>출결현황</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Quick;