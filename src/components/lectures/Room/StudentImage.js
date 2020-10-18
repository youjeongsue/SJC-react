import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StudentImage.css'

class StudentImage extends Component {
    state = {
        user : this.props.auth.user
    }

    EditComment = () => {
        if (this.state.user.is_staff===true) {
            return <div>수정가능</div>;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className='s-image'>
                <img className='s-image' src={`https://storage.googleapis.com/1ok_demo/${this.props.location.state.image_path}`} alt=""/>
                <div className='s-image-comment'>{this.props.match.params.index}</div>
                {this.EditComment()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(StudentImage);