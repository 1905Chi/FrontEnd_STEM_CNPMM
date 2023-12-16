import { useEffect, useState } from 'react';
import Api from '../api/Api';
import { url } from './../constants/Constant';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriendRequest } from '../redux/Friend';
import { selectselectFriendRequest } from '../redux/Friend';
import { Avatar } from 'antd';
import { selectFriend } from '../redux/Friend';
import './../pages/friend/layouts/LeftFriend.css';
import { toast, ToastContainer } from 'react-toastify';
import { editFriendRequest } from '../redux/Friend';
import { selectOption } from '../redux/Group';

export default function Right() {
	const dispatch = useDispatch();
	const friendRequest = useSelector(selectselectFriendRequest);
	console.log(friendRequest);
	const [lisstInvite, setListInvite] = useState([]);
	const accept = (status, id) => () => {
		if (status === 'ACCEPT') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			Api.put(url + 'api/v1/friend-requests/accept/' + id, { headers: headers })
				.then((res) => {
					toast.success('Đã chấp nhận lời mời kết bạn');
					dispatch(editFriendRequest(id));
					dispatch(selectOption('all'));
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
		if (status === 'REJECT') {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
			Api.put(url + 'api/v1/friend-requests/reject/' + id, { headers: headers })
				.then((res) => {
					toast.success('Đã xóa lời mời kết bạn');
					dispatch(editFriendRequest(id));
					dispatch(selectOption('all'));
				})
				.catch((err) => {
					toast.error('Đã xảy ra lỗi');
				});
		}
	};

	useEffect(() => {
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
		};
		Api.get(url + 'api/v1/users/friend-requests', { headers: headers })
			.then((res) => {
				console.log(res.data);
				dispatch(selectFriendRequest(res.data.result));
			})
			.catch((err) => {
				console.log(err);
			});
		Api.get(url + 'api/v1/group-member-invitations', { headers: headers })
			.then((res) => {
				setListInvite(res.result);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div className="friend-request">
				<div className="friend-request__title">
					<p>Lời mời kết bạn</p>
				</div>
				{friendRequest &&
					friendRequest.map((item, index) =>
						item.status === 'PENDING' ? (
							<div
								className="friend-request__item"
								key={item.id}
								onClick={() => {
									dispatch(selectFriend(item.id));
								}}
							>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.sender.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div className="friend-request__item__name">
										<p>{item.sender.firstName + ' ' + item.sender.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff', width: '83px' }}
											onClick={accept('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button
											className="btn btn-danger"
											onClick={accept('REJECT', item.id)}
											style={{ width: '64px' }}
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						) : null
					)}
				{lisstInvite && lisstInvite.length > 0 && (
					<div className="friend-request__title">
						<p>Lời mời tham gia nhom lop</p>
					</div>
				)}

				{lisstInvite &&
					lisstInvite.map((item, index) =>
						item.state === 'PENDING' ? (
							<div className="friend-request__item" key={item.id} onClick={() => {}}>
								<div style={{ flex: '2', margin: '15px', marginTop: '18px' }}>
									<div className="friend-request__item__avatar">
										<Avatar src={item.inviter.avartarUrl} alt="" />
									</div>
								</div>
								<div className="friend-request__item__button">
									<div className="friend-request__item__name">
										<p>{item.inviter.firstName + ' ' + item.inviter.lastName}</p>
									</div>
									<div style={{ textAlign: 'start' }}>
										<button
											className="btn btn-primary"
											style={{ backgroundColor: '#1677ff', width: '83px' }}
											onClick={accept('ACCEPT', item.id)}
										>
											Chấp nhận
										</button>
										<button
											className="btn btn-danger"
											onClick={accept('REJECT', item.id)}
											style={{ width: '64px' }}
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						) : null
					)}
				<ToastContainer />
			</div>
		</>
	);
}
