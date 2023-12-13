import React, { useState, useEffect } from 'react';
import './User.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Dialog } from 'primereact/dialog';
import { Form, Input, Button, Radio, Tooltip, DatePicker, Select } from 'antd';
import { FcManager } from 'react-icons/fc';
import { FcBusinesswoman } from 'react-icons/fc';
import { AiFillQuestionCircle } from 'react-icons/ai';
import '../../pages/auth/register/Register.css';
import moment from 'moment';

const User = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [orderBy, setOrderBy] = useState('id');
	const [order, setOrder] = useState('ASC');
	const [totalElements, setTotalElements] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [visible, setVisible] = useState(false);
	const [visibleAddUser, setVisibleAddUser] = useState(false);

	const [reason, setReason] = useState('');
	const [selectedUser, setSelectedUser] = useState();

	const [currentDate, setCurrentDate] = useState(moment());

	const isDateDisabled = (date) => {
		return date.isAfter(moment()); // Trả về true nếu ngày là ngày tương lai
	};

	const config = {
		rules: [
			{
				type: 'object',
				required: true,
				message: 'Chọn ngày tháng năm sinh!',
			},
		],
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			};

			const res = await Api.get(
				url + `api/v1/users/admin/get-all-users?page=${page}&size=${size}&orderBy=${orderBy}&order=${order}`,
				{ headers }
			);
			console.log(res);
			if (res.data.statusCode === 200) {
				setUsers(res.data.result.users);
				setTotalElements(res.data.result.totalElements);
				setTotalPages(res.data.result.totalPages);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleBanUser = async (id) => {
		try {
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			};

			const data = {
				userId: id,
				reason: reason,
			};

			const res = await Api.post(url + `api/v1/users/admin/ban-user`, data, { headers });
			if (res.data.statusCode === 200) {
				fetchUsers();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnbanUser = async (id) => {
		try {
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			};
			const data = {
				userId: id,
			};
			const res = await Api.post(url + `api/v1/users/admin/unban-user`, data, { headers });
			if (res.data.statusCode === 200) {
				fetchUsers();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleNext = async (values) => {
		try {
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			};
			const data = {
				email: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
				gender: values.gender,
				phone: values.phone,
				// dob: values.date_picker.format('DD-MM-YYYY'),
				dob:'12-08-2002',
				role: values.role,
			};
			console.log(data);
			const res = await Api.post(url + `api/v1/users/admin/create-user`, data, { headers });
			if (res.data.statusCode === 200) {
				fetchUsers();
				setVisibleAddUser(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const ActionTemplate = (rowData) => {
		if (rowData.status === 'BANNED') {
			return (
				<div className="flex flex-wrap gap-2">
					<Button
						type="primary"
						onClick={() => {
							handleUnbanUser(rowData.id);
						}}
					>
						Mở khóa tài khoản
					</Button>
				</div>
			);
		}
		return (
			<div className="flex flex-wrap gap-2">
				<Button
					type="primary"
					onClick={() => {
						setVisible(true);
						setSelectedUser(rowData.id);
					}}
				>
					Khóa tài khoản
				</Button>
			</div>
		);
	};

	const AvatarFullNameTemplate = (rowData) => {
		return (
			<div id="avatar-name-container">
				<img
					src={
						rowData.avatarUrl
							? rowData.avatarUrl
							: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
					}
					alt={rowData.name}
					className="rounded-full w-12 h-12"
				/>
				<span>{rowData.firstName + ' ' + rowData.lastName}</span>
			</div>
		);
	};

	const header = (
		<div className="flex flex-wrap align-items-center justify-content-between gap-2">
			<span className="text-xl text-900 font-bold">Users</span>
			<Button icon="pi pi-refresh" rounded raised />
		</div>
	);
	const footer = `In total there are ${users ? users.length : 0} users.`;

	return (
		<div id="user-container">
			<Dialog
				header="Lý do khóa tài khoản"
				visible={visible}
				style={{ width: '50vw' }}
				onHide={() => {
					setVisible(false);
					setReason('');
					setSelectedUser();
				}}
			>
				<div className="p-fluid">
					<div className="p-field">
						<Input
							value={reason}
							onChange={(e) => {
								setReason(e.target.value);
							}}
						/>
					</div>
				</div>
				<Button
					label="Khóa tài khoản"
					className="p-button-rounded p-button-success"
					onClick={() => {
						handleBanUser(selectedUser);
						setVisible(false);
						setReason('');
						setSelectedUser();
					}}
				/>
			</Dialog>

			<Dialog
				header="Thông tin người dùng"
				visible={visibleAddUser}
				style={{ width: '50vw' }}
				onHide={() => {
					setVisibleAddUser(false);
				}}
			>
				<Form name="register" onFinish={handleNext} scrollToFirstError>
					<h3 style={{ color: 'blue' }}>Thông tin tài khoản:</h3>
					<div className="information-account">
						<Form.Item
							name="email"
							rules={[
								{
									type: 'email',
									message: 'Email không hợp lệ!',
								},
								{
									required: true,
									message: 'Vui lòng nhập email của bạn!',
								},
							]}
							className="form-item-register"
						>
							<Input placeholder="Email" style={{ width: '180px' }} />
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'vui lòng nhập mật khẩu!',
								},
								{
									min: 8,
									message: 'Mật khẩu phải có ít nhất 8 kí tự',
								},
							]}
							hasFeedback
							className="form-item-register"
						>
							<Input.Password placeholder="Mật khẩu" style={{ width: '180px' }} />
						</Form.Item>
						<Form.Item
							name="confirm"
							dependencies={['password']}
							hasFeedback
							rules={[
								{
									required: true,
									message: 'Vui lòng xác nhận lại mật khẩu!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('Mật khẩu xác thực không đúng!'));
									},
								}),
							]}
							className="form-item-register"
						>
							<Input.Password placeholder="Nhập lại mật khẩu" style={{ width: '180px' }} />
						</Form.Item>
					</div>
					<h3 style={{ color: 'blue' }}>Thông tin cá nhân:</h3>
					<div className="information-profile">
						<Form.Item
							name="firstName"
							rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
							className="form-item-register"
						>
							<Input placeholder="Tên" style={{ width: '180px' }} />
						</Form.Item>
						<Form.Item
							name="lastName"
							rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
							className="form-item-register"
						>
							<Input placeholder="Họ" style={{ width: '180px' }} />
						</Form.Item>

						<Form.Item
							name="phone"
							className="form-item-register"
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập số điện thoại!',
									whitespace: true,
								},

								{
									pattern: /^0\d{9,9}$/, // Sử dụng biểu thức chính quy để kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng từ 10 đến 11 ký tự
									message: 'Số điện thoại không hợp lệ!',
								},
							]}
						>
							<Input placeholder="Số điện thoại" style={{ width: '180px' }} />
						</Form.Item>
						{/* <Form.Item name="date_picker" {...config} className="form-item-register">
							<DatePicker
								format="DD-MM-YYYY"
								style={{ width: '180px' }}
								placeholder="Ngày tháng năm sinh"
								onChange={(date) => setCurrentDate(date)}
								disabledDate={isDateDisabled}
							/>
						</Form.Item> */}

						<Form.Item
							name="gender"
							defaultValue="MALE"
							rules={[
								{
									required: true,
									message: 'Chọn giới tính',
								},
							]}
							className="form-item-register"
						>
							<div>
								<Radio.Group defaultValue="MALE" style={{ width: '180px' }}>
									<Tooltip title="Nam">
										<Radio.Button value="MALE">
											<FcManager />
										</Radio.Button>
									</Tooltip>
									<Tooltip title="Nữ">
										<Radio.Button value="FEMALE">
											<FcBusinesswoman />
										</Radio.Button>
									</Tooltip>
									<Tooltip title="Khác">
										<Radio.Button value="OTHER">
											<AiFillQuestionCircle />
										</Radio.Button>
									</Tooltip>
								</Radio.Group>
							</div>
						</Form.Item>
						<Form.Item
							name="gender"
							defaultValue="MALE"
							rules={[
								{
									required: true,
									message: 'Chọn giới tính',
								},
							]}
							className="form-item-register"
						>
							<div>
								<Radio.Group defaultValue="MALE" style={{ width: '180px' }}>
									<Tooltip title="Học sinh">
										<Radio.Button value="STUDENT">
											<FcManager />
										</Radio.Button>
									</Tooltip>
									<Tooltip title="Giáo viên">
										<Radio.Button value="TEACHER">
											<FcBusinesswoman />
										</Radio.Button>
									</Tooltip>
									<Tooltip title="Phụ huynh">
										<Radio.Button value="PARENT">
											<AiFillQuestionCircle />
										</Radio.Button>
									</Tooltip>
								</Radio.Group>
							</div>
						</Form.Item>
					</div>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }} className="button-register">
							Đăng ký
						</Button>
					</Form.Item>
				</Form>
			</Dialog>
			<DataTable value={users} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
				<Column field="id" header="ID" sortable />
				<Column field="name" header="Name" sortable body={AvatarFullNameTemplate} />
				<Column field="email" header="Email" sortable />
				<Column field="phone" header="Phone" sortable />
				<Column field="gender" header="Gender" sortable />
				<Column field="status" header="Status" sortable />
				<Column header="Actions" body={ActionTemplate} />
			</DataTable>
			<Button
				type="primary"
				onClick={() => {
					setVisibleAddUser(true);
				}}
			>
				Thêm người dùng
			</Button>
		</div>
	);
};

export default User;
