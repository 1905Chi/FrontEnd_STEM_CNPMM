import CalendarAntd from '../../../components/CalendarAntd';
import React from 'react';
import './RightItemGroup.css';
import {useSelector} from 'react-redux';
import {selectselecteventGroup} from '../../../redux/EventGroup';
import { selectselectexam } from '../../../redux/Exam';
import { Empty } from 'antd';
export default function RightItemClass() {
	const event = useSelector(selectselecteventGroup);
	const exam= useSelector(selectselectexam);
	console.log(event);
	console.log(exam);

	// sự kiện sắp diễn ra

	// const EventGroupComing = () => {
	// 	let eventComing = [];
	// 	event.map((event) => {
			
	// 	});
	// }

	return (
		<div className='right-class-group' style={{height:'99vh', overflowY:'auto', backgroundColor:'white'}}>
			<div className="Lich">
				<CalendarAntd />
			</div>
			<div className="event-upcoming">
				<h3>Sự kiện sắp diễn ra</h3>
				{ event && event!== null && event.length>0 ?( event.map((event, index) => (
						<div className="event-upcoming__item">
							<div >
								<div className="event-upcoming__item__title">
									<p>Sự kiện: {event.name}</p>
									<p>Chi tiết: {event.description}</p>
								</div>
								<div className="event-upcoming__item__time">
									<p>Bắt đầu lúc: {event.startedAt}</p>
									<p>Kết thúc lúc: {event.endedAt}</p>
								</div>
							</div>
						
						</div>
					))): <Empty />}
			</div>
		</div>
	);
}
