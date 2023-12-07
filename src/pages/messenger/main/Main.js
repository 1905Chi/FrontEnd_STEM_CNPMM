import React, { useState, useRef, useEffect } from 'react';
import './Main.css';
import { selectselectMessenger } from '../../../redux/Messenger';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
export default function Main() {
	const messageItem = useSelector(selectselectMessenger);
	const user = JSON.parse(localStorage.getItem('user'));
    const chatContainerRef = useRef(null);
    const chatContainer = document.querySelector('.mainMessenger__body');
	const [oldScrollTop, setoldScrollTop] = useState(0);
    const [oldScrollHeight, setoldScrollHeight] = useState(0);
	const [listmessage, setlistmessage] = useState([]);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const scrollToBottom = () => {
        chatContainerRef.current?.scrollIntoView({ behavior: "smooth" })
        
      }
    
    useEffect(() => {
       
        setlistmessage([{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 1,
		},
		{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 2,
		},
		{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 3,
		},
		{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 4,
		},
		{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 5,
		},
        {
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 6,
		},
		{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 7,
		},
        {
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 8,
		},
		{
			avatar: user.avatarUrl,
			name: 'Nguyễn Văn A',
			message: 'Chào bà già giữa trời đông hiu quạnh ' + 9,
		},]);

       
        
      }, []);
        useEffect(() => {
            if(chatContainer){
            if(isScrolling===false ){
            chatContainer.scrollTop = chatContainer.scrollHeight;
                setIsScrolling(true);   
            }
            else
                {
                    chatContainer.scrollTop = oldScrollTop + (chatContainer.scrollHeight - oldScrollHeight);
                }
            }
        }, [listmessage]);
     
      
      const handleScroll = () => {
        if (chatContainer) {
			const scrollY = chatContainer.scrollTop; // Lấy vị trí cuộn hiện tại

			// Chiều cao của trang
			const pageHeight = chatContainer.scrollHeight;

			// Tính toán 60% chiều cao
			const sixtyPercentHeight = (pageHeight * 30) / 100;
			if (scrollY < sixtyPercentHeight && isLoadMore === false ) {
                setIsLoadMore(true);
                setoldScrollHeight(pageHeight);
                setoldScrollTop(scrollY);
                
				setTimeout(() => {
					loadMoreMessages();
					
					// 	chatContainer.scrollTo(0, scrollY);
				}, 100); // Giả định thời gian API call
			}
		}
      };

	const loadMoreMessages = () => {
		// Simulate loading more messages
       
		const oldmess = [];
		for (let i = listmessage.length; i < listmessage.length + 10; i++) {
			oldmess.push({
				avatar: user.avatarUrl,
				name: 'Nguyễn Văn A',
				message: 'Chào bà già giữa trời đông hiu quạnh ' + i,
			});

			
		}
        setlistmessage((prevMessages) => [...prevMessages, ...oldmess]);
        setIsLoadMore(false);
	};
	return (
		<div>
			{messageItem ? (
				<div className="mainMessenger" >
					<div className="mainMessenger__header">
						<div className="mainMessenger__header__info">
							<Avatar src={user.avatarUrl} alt="avatar" />
							<h3>{messageItem.name}</h3>
						</div>
					</div>
					<div className="mainMessenger__body"  onScroll={handleScroll} ref={chatContainerRef}>
						<div className="mainMessenger__body__item"  >
							{listmessage &&
								listmessage.map((item, index) => (
									<div className="messenger-item" key={index}>
										<div className="mainMessenger__body__item__left">
											<Avatar src={user.avatarUrl} alt="avatar" className="avartar-mess" />
										</div>
										<div className="mainMessenger__body__item__right">
											<span>{listmessage[listmessage.length-1-index].name}</span>
											<p>{listmessage[listmessage.length-1-index].message}</p>
										</div>
									</div>
								))}
						</div>
                      
					</div >
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
