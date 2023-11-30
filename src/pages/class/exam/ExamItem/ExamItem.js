import React from 'react';
import './ExamItem.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { url } from '../../../../constants/Constant';
import Api from '../../../../api/Api';
import { toast,ToastContainer } from 'react-toastify';
import { selectselectuser } from '../../../../redux/User';

export default function ExamItem(props) {
	const { id } = useParams();
    const [examId, setExamId] = useState();
    const user=useSelector(selectselectuser);
    
	useEffect(() => {
        console.log(id);
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
        };

        Api.get(url + 'api/v1/exams/' + id, { headers: headers }   )
            .then((response) => {
                if (response.data.statusCode === 200) {
                    setExamId(response.data.result);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    });
	return (
		<div>
			{
                examId ? (<div className="exam-item">
				<div className="exam-item__title">
					<h1>{examId.exam.name}</h1>
					<p>Thời gian bắt đầu: {examId.exam.staredAt}</p>
					<p>Thời gian kết thúc: {examId.exam.endedAt}</p>
				</div>
				<div className="exam-item__content">
					<p>{examId.exam.description}</p>
					<p>Thời gian làm bài: {examId.exam.duration} phút</p>
				</div>
                {examId && examId.submission===null && user.role!== "TEACHER"  ? (
                    <div className="exam-item__button">
                        <button className="exam-item__button__start" onClick={()=>{}}>Bắt đầu làm bài</button> 
                    </div>
                ):null}
                {
                    user.role==="TEACHER" ? (
                        <div style={{display:'flex',justifyContent:'center'}}>
                        <div className="exam-item__button">
                            <button className="exam-item__button__start" onClick={()=>{}}>Xem bài làm</button> 
                        </div>
                        <div className="exam-item__button">
                            <button className="exam-item__button__start" onClick={()=>{}}>Chỉnh sửa</button>
                        </div>
                        </div>
                    ):null
                }
                {
                    user.role==="STUDENT" && examId && examId.submission!==null ? (
                        <div className="exam-item__button">
                            <button className="exam-item__button__start" onClick={()=>{}}>Xem bài làm</button> 
                        </div>
                    ):null

                }

			</div>): null
            }
            <ToastContainer/>   
		</div>

	);
}
