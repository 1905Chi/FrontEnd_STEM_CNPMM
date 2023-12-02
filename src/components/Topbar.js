import React, { useState } from 'react';
import './Topbar.css';
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectselectuser } from '../redux/User';
const Topbar = (props) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const navigate = useNavigate();
	const user=useSelector(selectselectuser);
	const toProfile = () => {
		navigate('/profile');
	}
	const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') ? true : false);
	const items = [
		{
			label: 'Trang chủ',
			icon: 'pi pi-fw pi-home',
			command: () => {
				navigate('/home');
			},
		},
		{
			label: 'Lớp học',
			icon: 'pi pi-fw pi-users',
			command: () => {
				navigate('/classes');
			},
		},
		{
			label: 'Nhóm',
			icon: 'pi pi-fw pi-users',
			command: () => {
				navigate('/groups');
			},
		},
	];

	const start = () => {
		return (
			<div className="start-topbar">
				<div className="logo-topbar">
					<img
						alt="logo"
						src="https://primefaces.org/cdn/primereact/images/logo.png"
						height="40"
						className="mr-2"
					></img>
				</div>
				<div className="search-topbar">
					<InputText placeholder="Search" type="text" />
				</div>
			</div>
		);
	};

	const end = () => {
		return (
			<div className="end-topbar" >
				{!isLogin  ?<div className="name-topbar" >

					<button className="login-topbar" onClick={() => navigate('/login')}>Đăng nhập</button>
					<button className="register-topbar" onClick={props.scrollToSection}>Đăng ký</button>
				</div> : null
				}
				{ isLogin && user && user.avatarUrl ? (<div className="avatar-topbar" onClick={toProfile} >
					<img
						alt="avatar"
						src={user.avatarUrl}
						height="40"
						className="mr-2"
					></img>
				</div>): null }
				{ isLogin && !user.avatarUrl ? (<div className="avatar-topbar" onClick={toProfile}>
					<img
						alt="avatar"
						src="https://www.w3schools.com/howto/img_avatar.png"
						height="40"
						className="mr-2"
					></img>
					</div>): null}
				
			</div>
		);
	};

	return (
		<div className="topbar">
			<MegaMenu model={items} orientation="horizontal" start={start} end={end}/>
		</div>
	);
};

export default Topbar;
