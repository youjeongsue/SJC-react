import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getLectures, deleteLecture } from '../../actions/lectures';

import RSidebar from '../layout/RSidebar';
import './LectureList.css';

class LectureList extends Component {
    componentDidMount(){
        this.props.getLectures();
    }

    render() {
        return (
            <div className='lecture-list-wrapper'>
                <div className='lecture-list'>
                    <div className='title-wrapper'>
                        <p className='title main-t'>강의실</p>
                        <div className='title-settings'>
                            <p className='title sub-t'>강의등록</p>
                            <p className='title sub-t'>삭제</p>
                        </div>
                    </div>
                    <div className='list-wrapper'>
                        <div className="ui relaxed grid">
                            {this.props.lectures.map(lecture =>(
                                <div className="ui item" key={lecture.id}>
                                    <Link to={`/lecture/${lecture.id}`}>
                                        <img className='item-img' src={lecture.image}></img>
                                        <p>{lecture.lecturename}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='r-sidebar-wrapper'>
                    <RSidebar />
                </div>
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