import React,{useEffect} from 'react';
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
	useEffect(() => {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
			conttentType: 'application/json'
		};
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					setPost(response.data.result.posts);
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
				{open && <Editor cancel={openEdttor}  type="post"/>}
				<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					Bài viết mới
				</button>
			</div>
			<div className="post-group__list">
				{post && post.map((item, index) => (
					<PostItem index={item.post.id} content={item.post.content} user={item.post.author} likes={item.post.reactions} type={item.post.type}  />
				))}
				</div>
		</div>
	);
}
