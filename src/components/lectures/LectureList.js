import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getLectures, deleteLecture } from '../../actions/lectures';

import styles from './LectureList.module.css';
import folderImg from '../../static/images/folder.png';

class LectureList extends Component {
    componentDidMount(){
        this.props.getLectures();
    }

    render() {
        const { user } = this.props.auth;
        
        return (
            <div>
                <div className={ styles['p-wrapper'] }>
                    <p className={ styles['title'] }>My Class</p>
                    <div className={ styles['circle'] }></div>
                </div>
                <div className="ui relaxed grid">
                    {this.props.lectures.map(lecture =>(
                        <div className="ui item" key={lecture.id}>
                            {/*
                            TODO: move to lecture page
                            <div className='right floated content'>
                                {user.is_staff === true
                                    ? <Link to={`/edit/${lecture.id}`} className='small ui nagetive basic button'>수정</Link>
                                    : null}
                                <button onClick={() => this.props.deleteLecture(lecture.id)} className='small ui nagetive basic button'>삭제</button>
                            </div> */}
                            <Link to={`/lecture/${lecture.id}`} className={ styles['item-wrapper'] }>
                                <div className={ styles['icon'] }>
                                    <p>{lecture.lecturename}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
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