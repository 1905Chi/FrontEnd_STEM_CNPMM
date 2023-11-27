import { FaUserFriends } from 'react-icons/fa';
import { UserAddOutlined } from '@ant-design/icons';
import { UserSwitchOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOption } from '../../../redux/Group';
import { selectFriend } from '../../../redux/Friend';
import { useDispatch } from 'react-redux';
import { selectSelectedOption } from '../../../redux/Group';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './LeftFriend.css';
import anh_logo_1 from '../../../assets/images/anh_logo_1.jpg';
import { Avatar } from 'antd';
export default function LeftFriend() {
	const dispatch = useDispatch();
	const selectedOption = useSelector(selectSelectedOption);
	useEffect(() => {
		dispatch(selectOption('all'));
	}, []);
	const friendRequest = [
		{
			id: 1,
			avartarUrl: anh_logo_1,
			firstName: 'Chí',
			lastName: 'Bùi',
		},
		{
			id: 2,
			avartarUrl: anh_logo_1,
			firstName: 'Chí',
			lastName: 'Bùi',
		},
		{
			id: 3,
			avartarUrl: anh_logo_1,
			firstName: 'Chí',
			lastName: 'Bùi',
		},
		{
			id: 4,
			avartarUrl: anh_logo_1,
			firstName: 'Chí',
			lastName: 'Bùi',
		},
	];
	const accept = (status, id) => () => {
		console.log(status, id);
	};
	return (
		<div className="left-friend">
			{selectedOption === 'all' ? (
				<div>
					<h2>Bạn bè</h2>
					<div
						className="option-friend"
						onClick={() => {
							dispatch(selectOption('all_friend'));
						}}
					>
						<button className="btn-friend">
							<FaUserFriends className="icon-friend" />
						</button>
						<span className="text-friend">Tất cả bạn bè</span>
					</div>
					<div
						className="option-friend"
						onClick={() => {
							dispatch(selectOption('request_friend'));
						}}
					>
						<button className="btn-friend">
							<UserSwitchOutlined className="icon-friend" />
						</button>
						<span className="text-friend">Lời mời kết bạn</span>
					</div>
					<div
						className="option-friend"
						onClick={() => {
							dispatch(selectOption('sent_request'));
						}}
					>
						<button className="btn-friend">
							<UserAddOutlined className="icon-friend" />
						</button>
						<span className="text-friend">Gợi ý kết bạn</span>
					</div>
				</div>
			) : null}

			{selectedOption === 'request_friend' ? (
				<div>
					<div className="header-left-friend">
						<button
							className="back"
							onClick={() => {
								dispatch(selectOption('all'));
							}}
						>
							<ArrowLeftOutlined />
						</button>
						<h2>Lời mời kết bạn</h2>
					</div>
					{friendRequest &&
						friendRequest.map((item, index) => (
							<div
								className="friend-request__item"
								key={item.id}
								onClick={() => {
									dispatch(selectFriend(item.id));
								}}
							>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div className="friend-request__item__name">
										<p>{item.firstName + ' ' + item.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff' }}
											onClick={accept('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button className="btn btn-danger" onClick={accept('REJECT', item.id)}>
											Xóa
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			) : null}
			{selectedOption === 'all_friend' ? (
				<div>
					<div className="header-left-friend">
						<button
							className="back"
							onClick={() => {
								dispatch(selectOption('all'));
							}}
						>
							<ArrowLeftOutlined />
						</button>
						<h2>Tất cả bạn bè</h2>
					</div>
					{friendRequest &&
						friendRequest.map((item, index) => (
							<div
								className="friend-request__item"
								key={item.id}
								onClick={() => {
									dispatch(selectFriend(item.id));
								}}
							>
								<div style={{ margin: '15px', marginTop: '18px' }}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.avartarUrl} alt="" />
									</div>
								</div>
								<div
									className="friend-request__item__button"
									style={{ textAlign: 'start', paddingTop: '10px' }}
								>
									<div className="friend-request__item__name">
										<p style={{ textAlign: 'start' }}>{item.firstName + ' ' + item.lastName}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			) : null}

			{selectedOption === 'sent_request' ? (
				<div>
					<div className="header-left-friend">
						<button
							className="back"
							onClick={() => {
								dispatch(selectOption('all'));
							}}
						>
							<ArrowLeftOutlined />
						</button>
						<h2>Lời mời kết bạn</h2>
					</div>
					{friendRequest &&
						friendRequest.map((item, index) => (
							<div
								className="friend-request__item"
								key={item.id}
								onClick={() => {
									dispatch(selectFriend(item.id));
								}}
							>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div className="friend-request__item__name">
										<p>{item.firstName + ' ' + item.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff' }}
											onClick={accept('ACCEPT', item.id)}
										>
											Thêm bạn bè
										</button>
										<button className="btn btn-danger" onClick={accept('REJECT', item.id)}>
											Xóa
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
			) : null}
		</div>
	);
}
