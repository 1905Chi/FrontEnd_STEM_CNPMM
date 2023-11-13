import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CalendarCustom from './../components/Calendar';
import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './LeftItemClass.css';
import { Form, Input, Button, DatePicker } from 'antd';
import 'moment/locale/vi'; // Import locale tiếng Việt
import CustomEvent from './../components/CustomEvent';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { CloseOutlined } from '@ant-design/icons';
import events from './../components/events';
import LabelFile from '../../profile/component/LabelFile';
export default function LeftItemClass() {
	const localizer = momentLocalizer(moment);
	const [hoveredDate, setHoveredDate] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [dateclick, setDateClick] = useState(null);

	const handleDateHover = (date) => {
		setHoveredDate(date);
	};

	const handleEventClick = (event) => {
		setSelectedEvent(event);
	};

	const handleEventClose = () => {
		setSelectedEvent(null);
		setDateClick(null);
	};

	const handleDateClick = (info) => {
		setDateClick(info.date);
		// Thực hiện các xử lý khác tại đây
	};
	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};
	const createEvent = (values) => {
		console.log(values);
		handleEventClose();
	};

	return (
		<div style={{}}>
			<div className="inforClass">
				<h2>Toán</h2>
				<h4>Thời gian lập:</h4>
				<h4>Số lượng thành viên:</h4>
				<h4>Giáo viên:</h4>
				<h4>Chủ đề:</h4>
			</div>
			<div className="document-class">
				<div className="document-class-title">
					<h4>Tài liệu</h4>
					<button>Thêm tài liệu </button>
				</div>
				<div className="document-class-content">
					<LabelFile type="word" filename="Bài tập về nhà.docx"></LabelFile>
					<LabelFile type="other" filename="Bài tập về nhà.zip"></LabelFile>
					
				</div>
			</div>

			<div>
				<div className="calendar">
					<FullCalendar
						themeSystem="Simplex"
						plugins={[dayGridPlugin, interactionPlugin]}
						events={events}
						eventBackgroundColor="red"
						eventBorderColor="red"
						eventTextColor="white"
						dateClick={handleDateClick}
						eventClick={(info) => handleEventClick(info.event)}
						eventMouseEnter={(info) => handleEventClick(info.event)}

						className="calendar-custom"
					/>
				</div>
				{dateclick && (
					<div className="overlay-event-create">
						<div
							style={{
								display: 'flex',
								borderBottom: '1px solid black',
								justifyContent: 'space-between',
								flex: 10,
							}}
						>
							<h2 style={{ flex: 8, textAlign: 'center', color: 'black' }}>Tạo lịch biểu</h2>
							<button
								style={{ flex: 3, height: '72.5px', textAlign: 'end', backgroundColor: 'white' }}
								onClick={handleEventClose}
							>
								<CloseOutlined style={{ color: 'black', fontSize: '30px' }}></CloseOutlined>
							</button>
						</div>
						<Form name="create-event" onFinish={createEvent} scrollToFirstError>
							<Form.Item
								name="title"
								label="Tiêu đề"
								style={{ marginTop: '20px' }}
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập tiêu đề sự kiện!',
									},
								]}
							>
								<Input style={{ width: '250px' }} />
							</Form.Item>
							<Form.Item
								name="description"
								label="Mô tả"
								rules={[
									{
										required: true,
										message: 'Vui lòng nhập mô tả sự kiện!',
									},
								]}
							>
								<Input style={{ width: '250px' }} />
							</Form.Item>
							<Form.Item
								name="start"
								label="Thời gian bắt đầu"
								rules={[
									{
										required: true,
										message: 'Vui lòng chọn thời gian bắt đầu!',
									},
								]}
							>
								<DatePicker showTime format="DD/MM/YYYY HH:mm" />
							</Form.Item>
							<Form.Item
								name="end"
								label="Thời gian kết thúc"
								rules={[
									{
										required: true,
										message: 'Vui lòng chọn thời gian kết thúc!',
									},
								]}
							>
								<DatePicker showTime format="DD/MM/YYYY HH:mm" />
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Tạo
								</Button>
							</Form.Item>
						</Form>
					</div>
				)}
				{selectedEvent && (
					<div className="overlay-event">
						<p>Chi tiết sự kiện:</p>

						<p>Tiêu đề: {selectedEvent.title}</p>
						<p>
							Thời gian: {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')} -{' '}
							{moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}
						</p>
						<button onClick={handleEventClose}>Đóng</button>
					</div>
				)}
			</div>
		</div>
	);
}
