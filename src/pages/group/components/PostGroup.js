import React from 'react';
import './PostGroup.css';
import Editor from "../../home/components/Editor"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import  Api from '../../../api/Api';
import { url } from '../../../constants/Constant'; 
import PostItem from './../../home/components/PostItem'
export default function PostGroup() {
    const [open, setOpen] = useState(false);
	const [post, setPost] = useState([]);
    const openEdttor = () => {
        setOpen(!open);
    }
	const { uuid } = useParams();
	useState(() => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json'
		};
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					setPost(response.data.result);
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div>
			<div className="post-group">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Bài viết{' '}
				</h2>
				{open && <Editor cancel={openEdttor} />}
				<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					Bài viết mới
				</button>
			</div>
			<div className="post-group__list">
				{post.map((item, index) => (
					<PostItem index={item.id} content={item.content} user={item.author} likes={item.reactions} type={item.type} />
				))}
				</div>
		</div>
	);
}
