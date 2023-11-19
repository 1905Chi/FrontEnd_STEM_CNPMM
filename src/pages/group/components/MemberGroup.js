import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { Avatar, CheckOutlined } from 'antd';
import { GiCancel } from 'react-icons/gi';
import './MemberGroup.css';
import { useSelector } from 'react-redux';
import { selectselectGroup } from '../../../redux/GetItemGroup';
import {selectselectMemberGroup} from './../../../redux/MemberGroup'
export default function MemberGroup() {
	const inforGroup = useSelector(selectselectGroup);
	const memberGroup = useSelector(selectselectMemberGroup);
	console.log(memberGroup);
	console.log(inforGroup);
	const [member, setmember] = useState([
		{
			avatarUrl: localStorage.getItem('user').avatarUrl,
			name:
				JSON.parse(localStorage.getItem('user')).firstName +
				' ' +
				JSON.parse(localStorage.getItem('user')).lastName,
		},
		{
			avatarUrl: localStorage.getItem('user').avatarUrl,
			name:
				JSON.parse(localStorage.getItem('user')).firstName +
				' ' +
				JSON.parse(localStorage.getItem('user')).lastName,
		},
		{
			avatarUrl: localStorage.getItem('user').avatarUrl,
			name:
				JSON.parse(localStorage.getItem('user')).firstName +
				' ' +
				JSON.parse(localStorage.getItem('user')).lastName,
		},
	]);
	const [memberrequest, setmemberrequest] = useState([
		{
			avatarUrl: localStorage.getItem('user').avatarUrl,
			name:
				JSON.parse(localStorage.getItem('user')).firstName +
				' ' +
				JSON.parse(localStorage.getItem('user')).lastName,
		},
		{
			avatarUrl: localStorage.getItem('user').avatarUrl,
			name:
				JSON.parse(localStorage.getItem('user')).firstName +
				' ' +
				JSON.parse(localStorage.getItem('user')).lastName,
		},
		{
			avatarUrl: localStorage.getItem('user').avatarUrl,
			name:
				JSON.parse(localStorage.getItem('user')).firstName +
				' ' +
				JSON.parse(localStorage.getItem('user')).lastName,
		},
	]);

	return (
		<div>
			<div className="member-group">
				<div className="member-group-request">
					<h3>Yêu cầu tham gia</h3>
					{memberrequest.map((item, index) => (
						<div className="member-group-request__item" key={index}>
							<div className="member-group-request__item__avatar">
								<Avatar src={item.avatarUrl} alt="" />
							</div>
							<div className="member-group-request__item__name">
								<p>{item.name}</p>
							</div>
							<div className="member-group-request__item__button">
								<button className="btn btn-primary">Chấp nhận</button>
								<button className="btn btn-danger">
									<GiCancel />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="member-group__header">
					<h3>Thành viên</h3>
					<div className="member-group__header__search">
						<input type="text" placeholder="Tìm kiếm thành viên" />
						<button style={{ backgroundColor: 'white' }}>
							<FaSearch />
						</button>
					</div>
			
					{memberGroup.map((item, index) => (
						<div className="member-group__item" key={index}>
							<div className="member-group__item__avatar">
								<Avatar src={item.user.avatarUrl} alt="" />
							</div>
							<div className="member-group__item__name">
								<p>{item.user.firstName +' '+ item.user.lastName}</p>
								{item.role === 'GROUP_ADMIN' ? (
									<span className="member-group__item__name__role">(Quản trị viên)</span>
								) : (
									null
								)}
								{item.role === 'GROUP_MEMBER' ? (
									<span className="member-group__item__name__role">(Thành viên)</span>
								) : (
									null
								)}
								{item.role === 'GROUP_OWNER' ? (
									<span className="member-group__item__name__role">(Người sáng lập)</span>
								) : (
									null
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
