import './DefaultLayout.css';
import Topbar from '../components/Topbar';
import React from 'react';
import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const items = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	BarChartOutlined,
	CloudOutlined,
	AppstoreOutlined,
	TeamOutlined,
	ShopOutlined,
].map((icon, index) => ({
	key: String(index + 1),
	icon: React.createElement(icon),
	label: `nav ${index + 1}`,
}));
export default function DefaultLayout({ Left, Right, children }) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<>
			<div className="layout-container">
				<div className="header" style={{ background: colorBgContainer }}>
					<Topbar />
				</div>
				<div	 className="sider-left">
					<Sider
						style={{
							overflow: 'auto',
							height: '80vh',
							position: 'fixed',
							left: 0,
							top: 80,
							bottom: 0,
						}}
					>
						<div className="demo-logo-vertical" />
						{Left}
					</Sider>
				</div>
				<div className="content">
					<Layout style={{ marginLeft: 200 }}>
						<Content
							style={{
								margin: '24px 16px 0',
								overflow: 'initial',
								padding: 24,
								textAlign: 'center',
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							<div className='content-main-child'>
							{children}
							</div>
						</Content>
						
					</Layout>
				</div>
				<div className="sider-right">
					<Sider
						style={{
							overflow: 'auto',
							height: '80vh',
							position: 'fixed',
							right: '2%',
							top: 80,
							paddingRight:'2rem',
							bottom: 0,
							width: "20%",
							
							marginRight:'1rem'
						}}
					>
						<div>
						{Right}
						</div>
					</Sider>
				</div>
			</div>

			{/* <div>
				<div className="content">
					<div theme="light" className="sider-left">
						{Left}
					</div>
					<div className="content-main"> {children} </div>
					<div theme="light" className="sider-right">
						{Right}
					</div>
				</div>
			</div> */}
		</>
	);
}
