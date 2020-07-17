import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLectures, deleteLecture } from '../../actions/lectures';

class LectureList extends Component {
    componentDidMount(){
        this.props.getLectures();
    }

    render() {
        const { user } = this.props.auth;
        
        return (
            <div className="ui relaxed divided list" style={{ marginTop: '2rem'}}>
                {this.props.lectures.map(lecture =>(
                    <div className="item" key={lecture.id}>
                        <div className='right floated content'>
                            {user.is_staff === true
                                ? <Link to={`/edit/${lecture.id}`} className='small ui nagetive basic button'>수정</Link>
                                : null}
                            <button onClick={() => this.props.deleteLecture(lecture.id)} className='small ui nagetive basic button'>삭제</button>
                        </div>
                        <i className="large calendar outline middle aligned icon" />
                        <div className="content">
                            <Link to={`/lecture/${lecture.id}`} className='header'>{lecture.lecturename}</Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lectures: Object.values(state.lectures),
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
    { getLectures, deleteLecture }
)(LectureList);