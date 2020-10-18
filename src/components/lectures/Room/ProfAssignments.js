import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Assignments.css';

class ProfAssignments extends Component {
    state = {
        students : this.props.lectures[this.props.match.url.split('/')[2]-1].students,
        stud_json : {}
    }

    componentDidMount() {
        this.loadStudents();
    }

    // AssignmentEval에 넘겨주기 위해 미리 데이터 요청
    loadStudents = () => {
        const result_json = {};
        this.state.students.map(student => {
            axios.get(`http://127.0.0.1:8000/api/auth/user/${student}/`)
                .then(response => {
                    // console.log(response.data.results[0])
                    result_json[student]=response.data.results[0]
                }).catch(function (e) {
                    // console.log('There is no user');
                })
            })
        this.setState({ stud_json : result_json })
    }

    // AssignmentEval에 넘겨주기 위해 미리 데이터 요청
    getSJsons = (assignment_id) => {
        var result_json = {};
        this.state.students.map(student => {
            axios.get(`https://storage.googleapis.com/1ok_demo/${this.props.match.url.split('/')[2]}/${assignment_id}/${student}/stu.json`)
                .then(response => {
                    console.log(response.data);
                    result_json[student] = response.data;
                }).catch(function (error) {
                    // console.log('에러')
                    result_json[student] = null;
                });
        });
        return result_json;
    }

    render(){
        return (
            <div>
                <div className='a-title'>과제 및 평가</div>
                {this.props.assignments.map((assignment, index) => (
                    <div className='assignment-item' key={assignment.id}>
                        <p className='title-settings prof-main'>{assignment.assignmentname}</p>
                        <div className='title-settings'>
                            <Link to={{
                                pathname : `/lecture/${this.props.match.url.split('/')[2]}/eval`,
                                state : {
                                    lecture_id : this.props.match.url.split('/')[2],
                                    assignment_id : assignment.id,
                                    stud_json : this.state.stud_json,
                                    result_json : this.getSJsons(assignment.id)
                                }
                            }}>
                                <button className='title-settings a-btn'>성적확인</button>
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
    assignments: Object.values(state.assignments),
    svideos: Object.values(state.svideos),
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(ProfAssignments);