import React, { Component } from 'react';
import './StudentImage.css'

class StudentImage extends Component {
    render() {
        return (
            <div className='s-image'>
                <img className='s-image' src={`https://storage.googleapis.com/1ok_demo/${this.props.location.state.image_path}`} alt=""/>
                <div className='s-image-comment'>{this.props.match.params.index}</div>
            </div>
        )
    }
}

export default StudentImage;