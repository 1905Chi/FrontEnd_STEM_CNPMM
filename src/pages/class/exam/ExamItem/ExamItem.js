import React from 'react';
import './ExamItem.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { url } from '../../../../constants/Constant';
import { useNavigate } from 'react-router-dom';
import Api from '../../../../api/Api';
import { toast, ToastContainer } from 'react-toastify';
import { selectselectuser } from '../../../../redux/User';
import { selectsubmition } from '../../../../redux/Exam';
import { useDispatch } from 'react-redux';
import { selectexam, selectselectexam } from '../../../../redux/Exam';
import moment from 'moment';
export default function ExamItem(props) {
	const { uuid,id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [examId, setExamId] = useState();
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);

	const CreateSubmit = () => {
		localStorage.setItem('typesubmit', 'create');
		setTimeout(() => {
			navigate('/exam/' + id + '/submit');
		}, 3000);
		
	};

	const Continue = () => {
		localStorage.setItem('typesubmit', 'continue');
		localStorage.setItem('submissionId', examId.submission.id);
		setTimeout(() => {
			navigate('/exam/' + id + '/submit');
		}, 3000);
	}
	
	useEffect(() => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.get(url + 'api/v1/exams/' + id, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					setExamId(response.data.result);
					const startTime = new Date(examId.exam.staredAt).getTime();

					const endTime = new Date(examId.exam.endedAt).getTime();

					dispatch(selectexam(response.data.result));

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
						now.getSeconds();

					const nowDate = new Date(nowTime).getTime();

					if (nowDate >= startTime && nowDate <= endTime) {
						setIsWithinTimeRange(true);
					} else {
						setIsWithinTimeRange(false);
					}
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	}, [id]);

	const checkContinue = ( dateStart, dateEnd,duration) => {
		const startTime =  moment(dateStart, "DD-MM-YYYY HH:mm:ss:SSSSSS").valueOf();
		
		const endTime =  moment(dateEnd, "DD-MM-YYYY HH:mm:ss:SSSSSS").valueOf();
		
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
			now.getSeconds()
			+':' +
			'000000';

		
		const nowDate =  moment(nowTime, "DD-MM-YYYY HH:mm:ss:SSSSSS").valueOf();

		
			if (nowDate >= startTime && nowDate <= endTime) {
				if(nowDate.diff(startTime,'minutes') > duration){
					console.log(nowDate.diff(startTime,'minutes'));
					return false;
				}
				else{
					return true;
				}
				
			} else {
				return false;
			}	
		
		
	}
	return (
		<div className="exam-item-component">
			{examId ? (
				<div className="exam-item">
					<div className="exam-item__header">
						<h1>{examId.exam.name}</h1>
					</div>
					<div className='exam-item-infor'>
						<div className="exam-item__title">
							<p>Thời gian bắt đầu: {examId.exam.staredAt}</p>
							<p>Thời gian kết thúc: {examId.exam.endedAt}</p>
						</div>
						<div className="exam-item__content">
							<p>{examId.exam.description}</p>
							<p>Thời gian làm bài: {examId.exam.duration} phút</p>
						</div>
						{examId && examId.submission === null && user.role === 'STUDENT' && isWithinTimeRange ? (
							<div className="exam-item__button">
								<button className="exam-item__button__start" onClick={CreateSubmit}>
									Bắt đầu làm bài
								</button>
							</div>
						) : null}
						{user.role === 'TEACHER' ? (
							<div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div className="exam-item__button">
										<button className="exam-item__button__start" onClick={() => {}}>
											Xóa
										</button>
									</div>
									<div className="exam-item__button">
										<button className="exam-item__button__start" onClick={() => { navigate('/classes/'+uuid+'/edit-exam/'+id)}}>
											Chỉnh sửa
										</button>
									</div>
								</div>
								<div></div>
							</div>
						) : null}
						{user.role === 'STUDENT' &&
						examId &&
						examId.submission !== null &&
						examId.submission.endedAt === null &&
						checkContinue(examId.submission.startedAt,examId.exam.endedAt,Number(examId.exam.duration))  ?(
							<div className="exam-item__button">
								<button className="exam-item__button__start" onClick={Continue}>
									Tiếp tục làm bài
								</button>
							</div>
						) : null}
					</div>
				</div>
			) : null}

			
			<ToastContainer />
		</div>
	);
}
