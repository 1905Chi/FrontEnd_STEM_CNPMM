import React from 'react';
import './Main.css';
import { selectselectMessenger } from '../../../redux/Messenger';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
export default function Main() {
	const messageItem = useSelector(selectselectMessenger);
	const user = JSON.parse(localStorage.getItem('user'));
	console.log(messageItem);
	return (
		<div>
			{messageItem ? (
				<div className="mainMessenger">
					<div className="mainMessenger__header">
						<div className="mainMessenger__header__info">
							<Avatar src={user.avatarUrl} alt="avatar" />
							<h3>{messageItem.name}</h3>
						</div>
					</div>
					<div className="mainMessenger__body">
						<div className="mainMessenger__body__item">
							<div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
                            <div className="messenger-item">
								<div className="mainMessenger__body__item__left">
									<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
								</div>
								<div className="mainMessenger__body__item__right">
									<span>{messageItem.name}</span>
									<p>Chào bà già giữa trời đông hiu quạnh</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mainMessenger__footer">
						<div className="mainMessenger__footer__input">
							<input type="text" placeholder="Nhập tin nhắn" />
						</div>
						<div className="mainMessenger__footer__send">
							<button>Gửi</button>
						</div>
					</div>
				</div>
			) : (
				<div className="chonse-messs">
					<h4>Chọn đoạn tin nhắn để tiếp tục</h4>
				</div>
			)}
		</div>
	);
}
