import { useEffect } from 'react';
import Api from '../api/Api';
import { url } from './../constants/Constant';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriendRequest } from '../redux/Friend';
import { selectselectFriendRequest } from '../redux/Friend';
import { Avatar } from 'antd';
import { selectFriend } from '../redux/Friend';
import "./../pages/friend/layouts/LeftFriend.css"
export default function Right() {
	const dispatch = useDispatch();
	const friendRequest = useSelector(selectselectFriendRequest);
  const accept = (status, id) => () => {
    console.log(status, id);
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
	}, []);
	return (
		<>
			<div className="friend-request">
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
										style={{ backgroundColor: '#1677ff', width: '83px' }}
										onClick={accept('ACCEPT', item.id)}
									>
										Chấp nhận
									</button>
									<button className="btn btn-danger" onClick={accept('REJECT', item.id)} style={{width:'64px'}}>
										Xóa
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
}
