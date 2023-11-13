import React, { useEffect, useState } from 'react';
import './Profile.css';
import EditProfile from './component/EditProfile';
import anhlogo1 from '../../assets/images/anh_logo_1.jpg';
import { AiFillCamera } from 'react-icons/ai';
import { BsPencilFill } from 'react-icons/bs';
import EditAvatar from './component/EditAvatar';
import EditCover from './component/EditCover';
import Post from '../home/components/Post';
import PostItem from '../home/components/PostItem';

export default function Profile() {
	const [isEdit, setIsEdit] = useState(false);
	const [isEditAvatar, setIsEditAvatar] = useState(false);
	const [isEditCoverPhoto, setIsEditCoverPhoto] = useState(false);
	const [avatar, setAvatar] = useState();
	const [coverPhoto, setCoverPhoto] = useState();

	useEffect(() => {
		const profile = JSON.parse(localStorage.getItem('user'));
		if (profile.avatarUrl) {
			setAvatar(profile.avatarUrl);
		} else {
			setAvatar(anhlogo1);
		}
		if (profile.avatarUrl) {
			setCoverPhoto(profile.coverUrl);
		} else {
			setCoverPhoto(anhlogo1);
		}
	}, [avatar, coverPhoto]);
	const changeAvatar = (values) => {
		setAvatar(values);
	};
	const changeCoverPhoto = (values) => {
		setCoverPhoto(values);
	};

	const setEditAvatar = () => {
		setIsEditAvatar(true);
	};
	const setEditCoverPhoto = () => {
		setIsEditCoverPhoto(true);
	};
	const setEditProfile = () => {
		setIsEdit(true);
	};

	const cancel = () => {
		setIsEdit(false);
	};
	const cancelFormAvatar = () => {
		setIsEditAvatar(false);
	};
	const cancelFormCoverPhoto = () => {
		setIsEditCoverPhoto(false);
	};

	const anh = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoon_hT7QiYmBsL0F9ydjogk-wzvXtwp0Ef_1M6E-Kw&s';
	const post = [
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: [anh, anh, anh, anh, anh],
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: [anh, anh, anh, anh, anh],
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: [anh, anh, anh, anh, anh],
			likes: 42,
		},
	];
	return (
		<>
			{isEdit ? <EditProfile onCancel={cancel}></EditProfile> : null}
			{isEditAvatar ? (
				<EditAvatar onCancel={cancelFormAvatar} changeAvatar={changeAvatar} avatar={avatar}></EditAvatar>
			) : null}
			{isEditCoverPhoto ? (
				<EditCover
					onCancel={cancelFormCoverPhoto}
					changeCoverPhoto={changeCoverPhoto}
					coverPhoto={coverPhoto}
				></EditCover>
			) : null}
			<div>
				<div>
					<div className="cover-photo">
						<img src={coverPhoto} alt="Cover Photo" />
					</div>
					<button className="cover-picture__button" style={{ height: '40px' }} onClick={setEditCoverPhoto}>
						<AiFillCamera style={{ fontSize: '30px', margin: '0 0 0 5px', color: 'white' }}></AiFillCamera>{' '}
						<span style={{ fontSize: '15px', color: 'white', margin: '0 5px 0 0' }}>Chỉnh sửa ảnh bìa</span>
					</button>
				</div>
				<div>
					<div className="profile-picture">
						<img src={avatar} alt="Profile Picture" />
					</div>
					<button className="profile-picture__button" style={{ height: '40px' }} onClick={setEditAvatar}>
						<AiFillCamera style={{ fontSize: '30px', color: 'white' }}></AiFillCamera>
					</button>
					<div className="usename-button">
						<span>Quốc Chí</span>
						<button className="edit-profile__button" style={{ height: '40px' }} onClick={setEditProfile}>
							<BsPencilFill
								style={{ fontSize: '30px', margin: '0 0 0 5px', color: 'white' }}
							></BsPencilFill>{' '}
							<span style={{ fontSize: '15px', color: 'white', margin: '0 5px 0 0' }}>
								Chỉnh sửa thông tin cá nhân
							</span>
						</button>
					</div>
				</div>
				<div style={{ margin: '125px 0 0 0' }}>
					{post.map((post, index) => {
						return (
							<PostItem
								key={index}
								user={post.user}
								content={post.content}
								image={post.image}
								likes={post.likes}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}
