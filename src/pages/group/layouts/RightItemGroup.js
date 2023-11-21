import CalendarAntd from '../../../components/CalendarAntd';
import React from 'react';
import './RightItemGroup.css';

export default function RightItemClass() {
	return (
		<div>
			<div className="Lich">
				<CalendarAntd />
			</div>
			<div className="event-upcoming">
				<h3>Sự kiện sắp diễn ra</h3>
				<div className="event-upcoming__item">
					<div className="event-upcoming__item__title">
						<p>Tiêu đề sự kiện</p>
					</div>
					<div className="event-upcoming__item__time">
						<p>Thời gian</p>
					</div>
				</div>
			</div>
		</div>
	);
}
