import React, { useEffect } from 'react';
import './PostItem.css'; // Import tệp CSS
import { useState } from 'react';
import { Avatar, Button, Dropdown } from 'antd';
import { BiCommentDetail, BiSolidShare, BiLike } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdBugReport } from 'react-icons/md';
import CommentPost from './CommentPost';
import { EditOutlined } from '@ant-design/icons';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import Editor from './Editor';
function PostItem({ user, content, likes, index, type }) {
	const [isLiked, setIsLiked] = useState(false); // Trạng thái ban đầu là "không thích"
	const [isEditPost, setisEditPost] = useState(false); // Trạng thái ban đầu là "không chỉnh sửa"
	const [contentPost, setContentPost] = useState(content);
	const [typeOfPosst, settypeOfPosst] = useState('');
	if (type === 'QUESTIOM') settypeOfPosst('Câu hỏi');
	else if (type === 'POST') settypeOfPosst('Bài viết');
	else if (type === 'DISCUSSION') settypeOfPosst('Thảo luận');
	function EditContentPost(value) {
		setContentPost(value);
	}

	function handleLike() {
		setIsLiked(!isLiked); // Đảo ngược trạng thái khi nút "like" được nhấn
	}
	const deletePost = () => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json',
		};
		Api.delete(url + 'api/v1/posts/' + index, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					console.log(response.data.result);
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};


	function EditPost() {
		setisEditPost(!isEditPost); //
	}
	useEffect(() => {
		const contentContainer = document.querySelector('.content' + index);
		const showMoreButton = document.querySelector('#show' + index);
		if (contentContainer && showMoreButton) {
			if (contentContainer.scrollHeight > 500) {
				showMoreButton.style.display = 'block';
			} else {
				showMoreButton.style.display = 'none';
			}
		}
	}, [contentPost]);

	const items = [
		{
			key: '1',
			label: (
				<div style={{ font: '15px' }} onClick={deletePost}>
					{user.id === JSON.parse(localStorage.getItem('user')).id ? (
						<div>
							<RiDeleteBin6Fill style={{ color: 'red', fontSize: '15px' }} />{' '}
							<span style={{ fontSize: '15px' }}>Xóa bài đăng</span>
						</div>
					) : (
						<div>
							<MdBugReport style={{ color: 'red' }} />
							<span style={{ fontSize: '15px' }}>Báo cáo bài đăng</span>
						</div>
					)}
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div style={{ font: '15px' }} onClick={EditPost}>
					{user.id === JSON.parse(localStorage.getItem('user')).id ? (
						<div>
							<EditOutlined style={{ color: 'red', fontSize: '15px' }} />{' '}
							<span style={{ fontSize: '15px' }}>Chỉnh sửa bài đăng</span>
						</div>
					) : null}
				</div>
			),
		},
	];

	const likeButtonStyle = isLiked ? { color: 'blue' } : {}; // Đổi màu của biểu tượng "like"
	return (
		<div className="post-item">
			{isEditPost ? (
				<Editor cancel={EditPost} data={contentPost} editcontent={EditContentPost} index={index}>
					{' '}
				</Editor>
			) : null}
			<div className="user-info">
				<div className="avatarPost">
					<Avatar src={user.avatarUrl} />
				</div>
				<div style={{display:'flex',flexDirection:'row'}}>
					<a href='' style={{textDecoration:'none', color:'black'}} ><p className="user-name"> {user.firstName + ' ' + user.lastName} </p></a>
					<p className="user-name" style={{display:'block'}}> đã đăng {typeOfPosst} trong nhóm </p>
				</div>
				<Dropdown
					menu={{
						items,
					}}
					placement="bottomLeft"
					arrow={{
						pointAtCenter: true,
					}}
					style={{ border: 'none' }}
				>
					<Button style={{ color: 'black', backgroundColor: 'aliceblue', border: 'none',textAlign:'end' }}>...</Button>
				</Dropdown>
			</div>
			<div className={'content-container content' + index}>
				<div className="post-content" dangerouslySetInnerHTML={{ __html: contentPost }} />

				<button className={'show-more-button'} id={'show' + index}>
					Xem thêm
				</button>
			</div>

			<div className="file-post">
				<div className="image-file"></div>
				<div className="name-file"></div>
			</div>

			<p className="likes-count">
				{likes}
				likes
			</p>
			<div className="post-actions">
				<button
					style={{
						marginRight: '5px',
						fontSize: '22px',
						color: 'black',
						background: 'none',
					}}
					onClick={handleLike}
				>
					<BiLike style={likeButtonStyle} />
				</button>
				<button
					style={{
						marginRight: '5px',
						fontSize: '22px',
						color: 'black',
						background: 'none',
					}}
				>
					<BiCommentDetail />
				</button>
				<button style={{ fontSize: '22px', background: 'none', color: 'black' }}>
					<BiSolidShare />
				</button>
			</div>
			<CommentPost user={user} />
		</div>
	);
}

export default PostItem;
