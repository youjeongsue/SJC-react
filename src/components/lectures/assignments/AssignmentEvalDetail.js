import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import StudentImage from '../Room/StudentImage';

import '../Room/Assignments.css';
import './AssignmentEvalDetail.css';

class AssignmentEvalDetail extends Component {
    state = {
        s_json : this.props.location.state.s_json,
        student : this.props.location.state.student
    }

    render() {
        const {
            s_json
        } = this.state;

        return (
            <div>
                <div className='a-title title-settings'>과제 및 평가</div>
                <p className='title-settings eval-student'>학생: {this.state.student.username}</p>
                {this.state.s_json
                    ? <div className='eval-detail-wrapper'>
                        <div className='s-image-list'>
                            <div>정확도 측정시점</div>
                            {this.state.s_json['cap_list'].map((image_path, index) =>(
                                <Link key={index} to={{
                                    pathname: `${this.props.match.url}/studentImage/${index}`,
                                    state: {
                                        image_path: image_path
                                    }
                                }}>
                                    <img className='s-path' src={`https://storage.googleapis.com/1ok_demo/${image_path}`} alt=""/>
                                </Link>
                            ))}
                        </div>
                        <div className='s-image-score'>
                            {this.state.s_json['capscore_list'].map((frame, index) => (
                                <div key={index} className='s-path s-score'>{frame['Total_Score'].toFixed(2)}%</div>
                            ))}
                        </div>
                        <div className='s-image-router'>
                            <Route path={`${this.props.match.url}/studentImage/:index`} component={StudentImage} />
                        </div>
                    </div>
                    : <div className='eval-detail-wrapper'>아직 과제를 수행하지 않았습니다. 또는 채점 중이니 잠시 후 시도해주세요.</div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    assignments: Object.values(state.assignments),
});

export default connect(
    mapStateToProps,
)(AssignmentEvalDetail);