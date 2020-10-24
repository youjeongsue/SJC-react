import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Assignments.css';
import StudentImage from './StudentImage';

class Assignments extends Component {
    state = {
        lecture_id : this.props.match.url.split('/')[2],
        selected : null,
        s_jsons : [],
        s_json : null,
        comment : ['아주 잘했습니다', '다리를 좀 더 높이 드는 것이 좋을 것 같습니다.', '아주 잘했습니다.']
    }

    componentDidMount(){
        this.getSJsons();
    }

    getSJsons = () => {
        var result_json = {};
        this.props.assignments.map(assignment => {
            axios.get(`https://storage.googleapis.com/1ok_demo/${this.state.lecture_id}/${assignment.id}/${this.props.auth.user.id}/stu.json`)
                .then(response => {
                    console.log(response.data);
                    result_json[assignment.id] = response.data;
                }).catch(function (error) {
                    console.log('에러')
                    result_json[assignment.id] = null;
                });
        });
        this.setState({ s_jsons : result_json }, () => console.log(this.state.s_jsons));
    }

    getSjson = () => {
        const self = this;
        axios.get(`http://35.247.123.31:1219/student?video=3/1/3/s_video.mp4&prof_json=3/1/prof/prof.json`)
            .then( response => {
                self.setState({
                    s_json:response.data
                });
                // console.log(self.state.s_json)
            }).catch(function (error){
        });
    }

    mean = () => {
        var mean = 0;
        for(var i=0; i < this.state.s_jsons[this.state.selected+1]['capscore_list'].length; i++){
            mean += this.state.s_jsons[this.state.selected+1]['capscore_list'][i]['Total_Score']
        }
        return (mean/this.state.s_jsons[this.state.selected+1]['capscore_list'].length).toFixed(2);
    }

    handleChange = (index) => {
        const newSelected = this.state.selected === index ? null : index;
        this.setState({ selected : newSelected });
    }

    determineStyle = (index) => {
        return this.state.selected === index ? null : 'ghost';
    }

    determineStyle2 = (index) => {
        return this.state.selected === index ? 'ghost-margin' : null;
    }

    detail = () => {
        // console.log(this.state.s_jsons);
        return (
            <div>
                {this.state.s_jsons[this.state.selected+1]
                    ? <div>
                        <div>
                            <div>전체 정확도 :  <span style={{ color: 'red' }}>{this.mean()}%</span></div>
                            <div className='s-image-list'>
                                <div>정확도 측정시점</div>
                                {this.state.s_jsons[this.state.selected+1]['cap_list'].map((image_path, index) =>(
                                    <Link key={index} to={{
                                        pathname: `${this.props.match.url}/studentImage/${index}`,
                                        state: {
                                            image_path: image_path,
                                            index : this.state.selected
                                        }
                                    }}>
                                        <img className='s-path' src={`https://storage.googleapis.com/1ok_demo/${image_path}`} alt=""/>
                                    </Link>
                                ))}
                            </div>
                            <div className='s-image-score'>
                                {this.state.s_jsons[this.state.selected+1]['capscore_list'].map((frame, index) => (
                                    <div key={index} className='s-path s-score'>{frame['Total_Score'].toFixed(2)}%</div>
                                ))}
                            </div>
                            <div className='s-image-router'>
                                <Route path={`${this.props.match.url}/studentImage/:index`} component={StudentImage} />
                            </div>
                        </div>
                    </div>
                    : <div>과제를 수행해봅시다! 또는 채점 중이니 잠시 후 시도해주세요.</div>}
            </div>
        )
    }

    render () {
        const {
            handleChange,
            determineStyle,
            determineStyle2,
            detail
        } = this;

        return (
            <div>
                <div className='a-title'>과제 및 평가</div>
                {this.props.assignments.map((assignment, index) => (
                    <div className={'assignment-item ' + determineStyle2(index)} key={assignment.id}>
                        <p className='title-settings a-main'>{assignment.assignmentname}</p>
                        <div className='title-settings'>
                            <Link to={{
                                pathname : '/assignment/upload',
                                state : {
                                    assignment : assignment
                                }
                            }}>
                                <button className='title-settings a-btn'>과제 업로드</button>
                            </Link>
                            <button className='title-settings a-btn' onClick={() => handleChange(index)}>성적확인</button>
                        </div>
                        <div className={'a-detail ' + determineStyle(index)}>
                            {detail()}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    assignments: Object.values(state.assignments),
    simages: Object.values(state.simages),
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Assignments);