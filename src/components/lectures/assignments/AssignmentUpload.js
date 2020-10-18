import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Webcam from 'react-webcam';

import AssignmentUploadForm from './AssignmentUploadForm';
import { addSVideo } from '../../../actions/svideo';

import './AssignmentUpload.css';

function AssignmentUpload(props){
    const assignment = props.location.state.assignment;

    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const [file, setFile] = React.useState(null);
  
    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);
  
    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
  
    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);
  
    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "react-webcam-stream-capture.webm";
        a.click();
        window.URL.revokeObjectURL(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    const goBack = () => {
        props.history.goBack();
    };

    const handleSubmit = formValues => {
      console.log(formValues);
      props.addSVideo(formValues, assignment.id);
    }

    return (
        <div>
            <div className='assignment-view-wrapper'>
                <div className='assignment-view'>
                    <div className='assignment-item a-view-title'>
                        <p className='title-settings a-main' style={{ marginRight: 'calc(100vw - 1350px)'}}>{assignment.assignmentname}</p>
                        <div className='title-settings'>
                            {capturing ? (
                                <button className='title-settings a-btn' onClick={handleStopCaptureClick}>녹화종료</button>
                            ) : (
                                <button className='title-settings a-btn' onClick={handleStartCaptureClick}>녹화시작</button>
                            )}
                            <button className='title-settings a-btn' onClick={handleDownload}>다운로드</button>
                            <button className='title-settings a-btn'>재생</button>
                            <AssignmentUploadForm destroyOnUnmount={false} onSubmit={handleSubmit} student={props.auth.user.id} assignment={assignment.id}/>
                            {/* <form className='title-settings' onSubmit={handleSubmit(onMySubmit)}>
                              <Field name='student' component={hiddenRenderField} input_value={props.auth.user.id} />
                              <Field name='assignment' component={hiddenRenderField} input_value={assignment.id} />
                              <Field name='s_video' component={renderField} />
                              <button className='title-settings a-btn' type="submit">업로드</button>
                            </form> */}
                            <button className='title-settings a-btn back-btn' onClick={() => goBack()}>X</button>
                        </div>
                    </div>
                    <video className='a-upload-video' src={assignment.p_video} controls></video>
                    <Webcam className='a-upload-video' screenshotFormat="image/png" audio={true} ref={webcamRef} mirrored={true}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
  auth : state.auth
});

export default reduxForm({
  form: 'svideoForm',
})(connect(mapStateToProps, {addSVideo})(AssignmentUpload));