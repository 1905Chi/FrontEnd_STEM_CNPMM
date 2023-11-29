import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Exam.css';
export default function Exam() {
    const navigate = useNavigate(); 
    const { uuid } = useParams();
    const openEdttor = () => {
        navigate('/classes/'+uuid+'/exam/createquiz');
    }
	
	return (
		<div>
			<div className="exam-class">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Bài kiểm tra
				</h2>
				<button className="question-class__button" onClick={openEdttor} >
					Thêm bài kiểm tra
				</button>
			</div>
			<div className="exam-class__list"></div>
		</div>
	);
}
