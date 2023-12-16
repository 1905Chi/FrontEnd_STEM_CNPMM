import React from 'react';
import './LeftSubmit.css';
import { selectselectexam, selectselectquestionChoose } from '../../../redux/Exam';
import { useSelector, useDispatch } from 'react-redux';
export default function LeftSubmit() {
	const exam = useSelector(selectselectexam);
	const questionChoose = useSelector(selectselectquestionChoose);
	console.log(questionChoose);
	const dispatch = useDispatch();
	const isChoose = (id) => {
		if (questionChoose.find((item) => item.id === id) !== undefined) {
			return true;
		}
		return false;
	};

	return (
		<div className="Left-submit">

			{exam.length > 0 &&
				exam.map((question) => (
					<button
						key={question.submissionDetailId}
						style={{
							backgroundColor: !questionChoose
								? 'white'
								: isChoose(question.submissionDetailId)
								? 'black'
								: 'white',
							border: '1px solid black',
							height: '30px',
							width: '30px',
							borderRadius: '5px',
						}}
					></button>
				))}
		</div>
	);
}
