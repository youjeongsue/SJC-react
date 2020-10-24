import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StudentImage.css'

class StudentImage extends Component {
    state = {
        user : this.props.auth.user,
        comment : {0:['잘했어요. 다리를 좀 더 구부리면 좋을 것 같아요.', '보폭을 넓혀서 다리를 좀 더 구부려야 해요.', '잘했습니다. 수고했어요.'],
                1:['동작이 조금 부정확하네요', '다리를 더 들어야 합니다.', '잘했어요!']}
    }

    authImage = () => {
        if (this.state.user.is_staff===true) {
            return <input type='text' className='s-image-comment s-image-input'></input>;
        } else {
            return <div className='s-image-comment'>{this.state.comment[this.props.location.state.index][this.props.match.params.index]}</div>;
        }
    }

    EditComment = () => {
        if (this.state.user.is_staff===true) {
            return <button>저장</button>;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className='s-image'>
                <img className='s-image' src={`https://storage.googleapis.com/1ok_demo/${this.props.location.state.image_path}`} alt=""/>
                {this.authImage()}
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