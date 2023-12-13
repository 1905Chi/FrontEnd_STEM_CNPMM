import { selectselectsubmition } from '../../../../redux/Exam';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { url } from '../../../../constants/Constant';
import Api from '../../../../api/Api';
import { CountdownProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import './Submit.css';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import { Navigate } from 'react-big-calendar';
import Loading from '../../../../components/Loading';
export default function Submit() {
	const [submition, setsubmition] = useState();
	
	const navigate = useNavigate();
	const { Countdown } = Statistic;
	const { id } = useParams();
	const [time, setTime] = useState(0);
	const [targetTime, setTargetTime] = useState();
	const [loading, setloading] = useState(false);
	const onFinish = () => {
		setloading(true);
		Api.post(url+'api/v1/submissions/submit?submissionId='+localStorage.getItem('submissionId'),{headers: {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		}}).then((response)=>{
			if(response.data.statusCode===200){
				toast.success('Đã nộp bài cho hệ thống chấm điểm');
				setTimeout(() => {
					navigate('/classes')
				}, 3000);
			}
		}
		).catch((error)=>{
			toast.error(error.data.message);
		}
		).finally(()=>{
			setloading(false);
		});


	  };

	useEffect(() => {
		const typesubmit = localStorage.getItem('typesubmit');

		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		if (typesubmit === 'create') {
			Api.post(url + 'api/v1/submissions/create?examId=' + id + '', { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setsubmition(response.data.result);
						localStorage.setItem('submissionId', response.data.result.submissionId);
						setTargetTime(response.data.result.exam.duration * 60 * 1000);
						console.log(response.data.result.exam.duration * 60 * 1000);
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error.data.message);
				});
		}
		if (typesubmit === 'continue') {
			const submissionId = localStorage.getItem('submissionId');
			Api.get(url + 'api/v1/submissions/continue/' + submissionId, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						setsubmition(response.data.result);
						var startat = moment(localStorage.getItem('StartAt'), 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
						const now = new Date();
						const nowTime =
							now.getDate() +
							'-' +
							(now.getMonth() + 1) +
							'-' +
							now.getFullYear() +
							' ' +
							now.getHours() +
							':' +
							now.getMinutes() +
							':' +
							now.getSeconds() +
							':' +
							'000000';

						const nowDate = moment(nowTime, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
						setTargetTime(Number(localStorage.getItem('duration'))*60*1000-(nowDate-startat));
						
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	}, [id]);
	const [selectedAnswers, setSelectedAnswers] = useState({});

	const handleRadioChange = (questionId, answerIndex) => {
		setSelectedAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: answerIndex,
		}));
	};

	const handleSubmit = () => {
		// Gửi selectedAnswers lên server hoặc xử lý dữ liệu theo ý bạn

		
	};
	
	return (
		<div className="submit">
			<Countdown title="Thời gian còn lại" value={Date.now() + targetTime } onFinish={onFinish} />
			{loading ? <Loading/>: null}
			{submition &&
				submition.questions.length > 0 &&
				submition.questions.map((question) => (
					<div key={question.submissionDetailId} className="item-question">
						<div className="quest-content" dangerouslySetInnerHTML={{ __html: question.content }} />

						<div>
							{question.answers.map((answer, index) => (
								<label key={index}>
									{question.typeCode === 'multiple_choice' ? (
										<input
											type="checkbox"
											name={`question_${question.submissionDetailId}`}
											checked={selectedAnswers[question.submissionDetailId] === index}
											style={{ width: '15px', height: '15px', marginRight: '10px' }}
											onChange={() => handleRadioChange(question.submissionDetailId, index)}
										/>
									) : (
										<input
											type="radio"
											name={`question_${question.submissionDetailId}`}
											checked={selectedAnswers[question.submissionDetailId] === index}
											style={{ width: '15px', height: '15px', marginRight: '10px' }}
											onChange={() => handleRadioChange(question.submissionDetailId, index)}
										/>
									)}

									{answer.answer}
								</label>
							))}
						</div>
					</div>
				))}
			<button onClick={onFinish}>Submit</button>
			<ToastContainer />
		</div>
	);
}
