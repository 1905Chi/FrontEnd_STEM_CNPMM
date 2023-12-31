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
import { RiArrowGoBackLine } from 'react-icons/ri';
import moment from 'moment';
import { Table } from 'antd';
import Title from 'antd/es/skeleton/Title';
export default function ExamItem(props) {
	const { uuid, id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [examId, setExamId] = useState();
	const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
	const [isWithinTimeRange, setIsWithinTimeRange] = useState(false);
	const [listsubmit, setlistsubmit] = useState();
	const [converArray, setconverArray] = useState();
	const CreateSubmit = () => {
		localStorage.setItem('typesubmit', 'create');
		localStorage.setItem('StartAt', examId.exam.startedAt);
		localStorage.setItem('duration', examId.exam.duration);
		setTimeout(() => {
			navigate('/exam/' + id + '/submit');
		}, 1000);
	};

	const Continue = () => {
		localStorage.setItem('typesubmit', 'continue');
		localStorage.setItem('StartAt', examId.submission.startedAt);
		localStorage.setItem('submissionId', examId.submission.id);
		localStorage.setItem('duration', examId.exam.duration);
		setTimeout(() => {
			navigate('/exam/' + id + '/submit');
		}, 1000);
	};
	const ReviewExam = () => {
		localStorage.setItem('typesubmit', 'review');
		localStorage.setItem('StartAt', examId.submission.startedAt);
		localStorage.setItem('submissionId', examId.submission.id);
		localStorage.setItem('duration', examId.exam.duration);
		setTimeout(() => {
			navigate('/exam/' + id + '/submit');
		}, 1000);
	};

	useEffect(() => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};

		Api.get(url + 'api/v1/exams/' + id, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					setExamId(response.data.result);
					dispatch(selectexam(response.data.result));
					const startTime = moment(
						response.data.result.exam.startedAt,
						'DD-MM-YYYY HH:mm:ss:SSSSSS'
					).valueOf();

					const endTime = moment(response.data.result.exam.endedAt, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();
					const now = new Date();
					if (response.data.result.submission !== null) {
						setconverArray([
							{
								key: 0,
								startedAt: response.data.result.submission.startedAt,
								endedAt: response.data.result.submission.endedAt === null ? response.data.result.submission.startedAt : response.data.result.submission.endedAt,
								closeAt: response.data.result.exam.endedAt,
								score: response.data.result.submission.score,
							},
						]);
					}

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

					if (nowDate >= startTime && nowDate <= endTime) {
						setIsWithinTimeRange(true);
						console.log('trong thoi gian');
					} else {
						setIsWithinTimeRange(false);
						console.log('ngoai thoi gian');
					}
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});

		if (user.role === 'TEACHER' || localStorage.getItem('role') === 'TEACHER') {
			Api.get(url + 'api/v1/submissions/list/' + id, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						const list = response.data.result.map((item, index) => {
							return {
								key: index,
								authorId: item.authorId,
								score: item.score,
								createdAt: item.createdAt,
								updatedAt: item.updatedAt,
							};
						});
						setlistsubmit(list);
						console.log(list);
					}
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	}, [id]);

	const checkContinue = (dateStart, dateEnd, duration) => {
		const startTime = moment(dateStart, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();

		const endTime = moment(dateEnd, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();

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
		if (nowDate >= startTime && nowDate <= endTime) {
			if (startTime + duration * 60000 < nowDate) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	};
	const checkClose = (dateEnd) => {
		const endTime = moment(dateEnd, 'DD-MM-YYYY HH:mm:ss:SSSSSS').valueOf();

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
		if (nowDate > endTime) {
			return true;
		} else {
			return false;
		}
	};
	const columns = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
			render: (key) => Number(key) + 1,
		},
		{
			title: 'Học sinh',
			dataIndex: 'authorId',
			key: 'authorId',
		},
		{
			title: 'Điểm',
			dataIndex: 'score',
			key: 'score',
		},
		{
			title: 'Thời gian bắt đầu',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Thời gian nộp bài',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => (
				<span>
					<button className="exam-item__button__start" onClick={ReviewExam}>
						Xem
					</button>
				</span>
			),
		},
	];

	const columStudent = [
		{
			title: 'Bắt đầu lúc',
			dataIndex: 'startedAt',
			key: 'startedAt',
		},
		{
			title: 'Nộp bài lúc',
			dataIndex: 'endedAt',
			key: 'endedAt',
		},
		{
			title: 'Điểm',
			dataIndex: 'score',
			key: 'score',
		},
		{
			title: 'Action',
			dataIndex: 'closeAt',
			key: 'closeAt',
			render: (closeAt) => (	
			checkClose(closeAt) 
				?
				<span>
					<button className="exam-item__button__start" onClick={ReviewExam}>
						Xem lại bài làm{' '}
					</button>
				</span>
				: <span>{closeAt}</span>
			),
		},
	];

	return (
		<div className="exam-item-component">
			<button className="exam-item-component__back" onClick={() => navigate('/classes/' + uuid)}>
				<RiArrowGoBackLine /> Trở về lớp học
			</button>
			{examId ? (
				<div className="exam-item">
					<div className="exam-item__header">
						<h1>{examId.exam.name}</h1>
					</div>
					<div className="exam-item-infor">
						<div className="exam-item__title">
							<p>Thời gian bắt đầu: {examId.exam.startedAt}</p>
							<p>Thời gian kết thúc: {examId.exam.endedAt}</p>
						</div>
						<div className="exam-item__content">
							<p>{examId.exam.description}</p>
							<p>Thời gian làm bài: {examId.exam.duration} phút</p>
						</div>
						{examId && examId.submission === null &&( user.role === 'STUDENT' || localStorage.getItem('role')==='STUDENT' ) && isWithinTimeRange ? (
							<div className="exam-item__button">
								<button className="exam-item__button__start" onClick={CreateSubmit}>
									Bắt đầu làm bài
								</button>
							</div>
						) : null}
						{user.role === 'TEACHER' || localStorage.getItem('role')==='TEACHER' ? (
							<div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div className="exam-item__button">
										<button className="exam-item__button__start" onClick={() => {}}>
											Xóa
										</button>
									</div>
									<div className="exam-item__button">
										<button
											className="exam-item__button__start"
											onClick={() => {
												navigate('/classes/' + uuid + '/edit-exam/' + id);
											}}
										>
											Chỉnh sửa
										</button>
									</div>
								</div>
								<div></div>
							</div>
						) : null}
						{(user.role === 'STUDENT' || localStorage.getItem('role')==='STUDENT') &&
						examId &&
						examId.submission !== null &&
						examId.submission.endedAt === null &&
						checkContinue(
							examId.submission.startedAt,
							examId.exam.endedAt,
							Number(examId.exam.duration)
						) ? (
							<div className="exam-item__button">
								<button className="exam-item__button__start" onClick={Continue}>
									Tiếp tục làm bài
								</button>
							</div>
						) : null}
						{(user.role === 'STUDENT' || localStorage.getItem('role')==='STUDENT') &&
						examId &&
						examId.submission !== null ? (
							<div className="exam-item__button">
								<h3>Kết quả bài làm</h3>
								<Table
									columns={columStudent}
									dataSource={converArray}
									size="middle"
									style={{ margin: '0px 20%' }}
								/>
							</div>
						) : null}
						{(user.role === 'TEACHER' || localStorage.getItem('role')==='TEACHER') ? (
							<div style={{ textAlign: 'center' }}>
								<h3>Danh sách bài làm</h3>

								<Table
									columns={columns}
									dataSource={listsubmit}
									size="middle"
									style={{ margin: '0px 20%' }}
								/>
							</div>
						) : null}
					</div>
				</div>
			) : null}

			<ToastContainer />
		</div>
	);
}
