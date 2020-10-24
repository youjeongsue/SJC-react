import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSVideos } from '../../../actions/svideo';

import './AssignmentEval.css';
import '../Room/Assignments.css';

class AssignmentEval extends Component {
    state = {
        lecture_id : this.props.location.state.lecture_id,
        assignment_id : this.props.location.state.assignment_id,
        students : this.props.lectures[this.props.location.state.lecture_id-1].students,
        stud_json : this.props.location.state.stud_json,
        result_json : this.props.location.state.result_json
    }

    componentDidMount(){
        this.props.getSVideos(this.state.assignment_id);
    }

    mean = (student) => {
        var mean = 0;
        for(var i=0; i < this.state.result_json[student]['capscore_list'].length; i++){
            mean += this.state.result_json[student]['capscore_list'][i]['Total_Score']
        }
        return (mean/this.state.result_json[student]['capscore_list'].length).toFixed(2);
    }

    render () {
        const {
            stud_json,
            result_json
        } = this.state;

        return (
            <div>
                <div className='a-title'>과제 및 평가</div>
                {this.state.students.map(student => (
                    <div className='assignment-item' key={student}>
                        <p className='title-settings a-main'>{stud_json[student]['username']}</p>
                        {result_json[student]
                            ? <div className='title-settings eval-score'>{this.mean(student)}%</div>
                            : <div className='title-settings eval-score'>미제출</div>}
                        <div className='title-settings'>
                            <Link to={{
                                pathname : `/lecture/${this.state.lecture_id}/stud/${student}`,
                                state : {
                                    s_json : result_json[student],
                                    student : stud_json[student]
                                }
                            }}>
                                <button className='title-settings a-btn'>결과확인</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    lectures: Object.values(state.lectures),
    svideos: Object.values(state.svideos),
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getSVideos }
)(AssignmentEval);