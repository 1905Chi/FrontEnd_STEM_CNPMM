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
import { useNavigate } from 'react-router-dom';
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
		Api.post(url + 'api/v1/submissions/submit?submissionId=' + localStorage.getItem('submissionId'), {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			},
		})
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success('Đã nộp bài cho hệ thống chấm điểm');
					setTimeout(() => {
						window.history.back();
					}, 3000);
				}
			})
			.catch((error) => {
				toast.error(error);
			})
			.finally(() => {
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
						setTargetTime(Number(localStorage.getItem('duration')) * 60 * 1000);
						localStorage.removeItem('typesubmit');
						
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error('Lỗi! không thể mở bài kiểm tra. Vui lòng quay lại sau	');
					console.log(error);
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
						setTargetTime(Number(localStorage.getItem('duration')) * 60 * 1000 - (nowDate - startat));
					} else {
						toast.error(response.data.message);
					}
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	}, []);
	const [selectedAnswers, setSelectedAnswers] = useState([]);

	const handleRadioChange = (questionId, answer, typeCode) => {
		const oldSelectedAnswers = selectedAnswers;
		if (oldSelectedAnswers.filter((item) => item.questionId === questionId).length === 0) {
			oldSelectedAnswers.push({ questionId: questionId, answerIndex: [answer] });
		} else {
			if (
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.includes(answer) &&
				typeCode === 'multiple_choice'
			) {
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex = oldSelectedAnswers
					.filter((item) => item.questionId === questionId)[0]
					.answerIndex.filter((item) => item !== answer);
				// else
				// 	{
				// 		oldSelectedAnswers.filter((item)=>item.questionId===questionId)[0].answerIndex=[];
				// 		oldSelectedAnswers.filter((item)=>item.questionId===questionId)[0].answerIndex.push(answer);
				// 	}
			} else if (
				typeCode === 'single_choice'
			) {
				
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex = [];
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.push(answer);

			} else {
				oldSelectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.push(answer);
			}
		}

		setSelectedAnswers(oldSelectedAnswers);
		if(selectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.length>0){
			const data={
				id:questionId,
				answer:selectedAnswers.filter((item) => item.questionId === questionId)[0].answerIndex.join(',')
			}
			Api.put(url + 'api/v1/submission-details/update',data, { headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			}})
			.then((response) => {
				if (response.data.statusCode === 200) {
					console.log('cập nhật thành công');
				} else {
					console.log('cập nhật thất bại');
				}
			})
		}
		else{
			const data={ submissionDetailId : questionId}
			Api.put(url + 'api/v1/submission-details/delete-answer'+data, { headers: {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			}})
			.then((response) => {
				if (response.data.statusCode === 200) {
					console.log('xóa thành công');
				} else {
					console.log('xóa thất bại');
				}
			})
		}
	};

	return (
		<div className="submit">
			<Countdown title="Thời gian còn lại" value={Date.now() + targetTime} onFinish={onFinish} />
			{loading ? <Loading /> : null}
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
											defaultChecked={answer.checked ? true : false}
											style={{ width: '15px', height: '15px', marginRight: '10px' }}
											onChange={() =>
												handleRadioChange(
													question.submissionDetailId,
													answer.answer,
													question.typeCode
												)
											}
										/>
									) : (
										<input
											type="radio"
											name={`question_${question.submissionDetailId}`}
											defaultChecked={answer.checked ? true : false}
											style={{ width: '15px', height: '15px', marginRight: '10px' }}
											onChange={() =>
												handleRadioChange(
													question.submissionDetailId,
													answer.answer,
													question.typeCode
												)
											}
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
