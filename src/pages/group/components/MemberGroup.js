import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { Avatar } from 'antd';
import { GiCancel } from 'react-icons/gi';
import './MemberGroup.css';
import { IoMdAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import Api from '../../../api/Api';
import { toast, ToastContainer } from 'react-toastify';
import { url } from '../../../constants/Constant';
import { selectselectGroup } from '../../../redux/GetItemGroup';
import { selectselectMemberGroup, editMemberRequest } from '../../../redux/MemberGroup';
import { selectselectMemberGroupRequest } from '../../../redux/MemberGroup';
import { selectMemberGroupRequest } from '../../../redux/MemberGroup';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function MemberGroup() {
	const dispatch = useDispatch();
	const { uuid } = useParams();
	const inforGroup = useSelector(selectselectGroup);
	const memberGroup = useSelector(selectselectMemberGroup);
	const [memberSearch, setMemberSearch] = useState(memberGroup);
	const memberGroupRequest = useSelector(selectselectMemberGroupRequest);
	const SearchMember = (e) => {
		const value = e.target.value;
		if (value === '') {
			setMemberSearch(memberGroup);
			return;
		}
		const data = memberGroup.filter((item) => {
			return (
				item.user.firstName.toLowerCase().includes(value.toLowerCase()) ||
				item.user.lastName.toLowerCase().includes(value.toLowerCase())
			);
		});
		setMemberSearch(data);
	};

	const CallApiMemberGroupRequest = () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json',
		};
		Api.get(url + 'api/v1/group-member-requests?groupId=' + uuid + '&state=PENDING', { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectMemberGroupRequest(response.data.result));
				} else {
					//toast.error(response.data.message);
				}
			})
			.catch((error) => {
				//toast.error(error);
			});
	};

	const accept = (status, id) => () => {
		let isAccept = false;
		if (status === 'ACCEPT') {
			isAccept = true;
		}
		const data = { isAccept };
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
		};
		Api.post(url + `api/v1/group-member-requests/${id}/response`, data, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					toast.success(response.data.message);
					CallApiMemberGroupRequest();
					dispatch(editMemberRequest(id));
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	return (
		<div>
			<div className="member-group">
				{memberGroupRequest && memberGroupRequest.length > 0 ? (
					<div className="member-group-request">
						<h3>Yêu cầu tham gia</h3>

						{memberGroupRequest.map((item, index) => (
							<div className="member-group-request__item" key={item.id}>
								<div style={{ display: 'flex', flex: '1' }}>
									<div className="member-group-request__item__avatar">
										<Avatar src={item.user.avatarUrl} alt="" />
									</div>
								</div>
								<div className="member-group-request__item__button">
									<div className="member-group-request__item__name">
										<p>{item.user.firstName + ' ' + item.user.lastName}</p>
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

				<div className="member-group__header">
					<h3>Thành viên</h3>
					<div className="member-group__header__search">
						<input type="text" placeholder="Tìm kiếm thành viên" onChange={SearchMember} />
						<button style={{ backgroundColor: 'white' }}>
							<FaSearch />
						</button>
					</div>

					{memberSearch &&
						memberSearch.map((item, index) => (
							<div className="member-group__item" key={index}>
								<div className="member-group__item__avatar">
									<Avatar src={item.user.avatarUrl} alt="" />
								</div>
								<div className="member-group__item__name">
									<p>{item.user.firstName + ' ' + item.user.lastName}</p>
									{item.role === 'GROUP_ADMIN' ? (
										<span className="member-group__item__name__role">(Quản trị viên)</span>
									) : null}
									{item.role === 'GROUP_MEMBER' ? (
										<span className="member-group__item__name__role">(Thành viên)</span>
									) : null}
									{item.role === 'GROUP_OWNER' ? (
										<span className="member-group__item__name__role">(Người sáng lập)</span>
									) : null}
								</div>
							</div>
						))}
				</div>
				<ToastContainer />
			</div>
		</div>
	);
}
