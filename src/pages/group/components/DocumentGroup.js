import React, { useState, useRef } from 'react';
import { Input, Button, Select, Dropdown ,DatePicker} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import LabelFile from '../../profile/component/LabelFile';
import { DownOutlined } from '@ant-design/icons';
import AddFile from '../../class/components/AddFile';
import './Document.css';
export default function DocumentGroup() {
	const [isShowAllFile, setIsShowAllFile] = useState(false);
	const { Option } = Select;
	const { Search } = Input;
    const { RangePicker } = DatePicker;
	const [visible, setVisible] = useState(false);
	const [isopenAddFile, setIsopenAddFile] = useState(false);
	const openAddFile = () => {
		setIsopenAddFile(!isopenAddFile);
	};

	const handleFile = () => {
		setIsShowAllFile(!isShowAllFile);
	};
    const handleDateChange = (value, dateString) => {
		console.log('Selected Time: ', value);
		console.log('Formatted Selected Time: ', dateString);
	};
	const file = [
		{
			filename: 'Bài tập về nhà.docx',
			type: 'docx',
		},
		{
			filename: 'Bài tập về nhà.zip',
			type: 'zip',
		},
		{
			filename: 'Bài tập về lớp.zip',
			type: 'zip',
		},
		{
			filename: 'bài tập bổ sung.docx',
			type: 'docx',
		},
		{
			filename: 'Bài tập về nhà.pdf',
			type: 'pdf',
		},
	];
	const dropdownMenu = (
		<div>
			<RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" onChange={handleDateChange} />
		</div>
	);
	return (
		<div>
			{isopenAddFile ? <AddFile onCancel={openAddFile}></AddFile> : null}
			
			<div className="document-group">
				<div className="document-group-title">
					<h4 style={{flex:7}}>Tài liệu</h4>
					<button onClick={openAddFile} style={{padding:'0px'}}>Thêm tài liệu </button>
				</div>
				<div className="document-group-content">
					<LabelFile type="docx" filename="Bài tập về nhà.docx"></LabelFile>
					<LabelFile type="zip" filename="Bài tập về nhà.zip"></LabelFile>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
					<button onClick={handleFile}>{isShowAllFile ? ('Thu gọn'): 'Xem thêm'}</button>
				</div>
			</div>
            {isShowAllFile ? (
				<div className="file-show-all">
					
					<div className="document-group-search">
						<div style={{ width: '83%', margin: '50px' }}>
							<Search placeholder="Tìm kiếm tài liệu"  style={{borderRadius:'50px'}}/>
						</div>
						<div className="search-file">
							<Select style={{ width: '30%', marginLeft: '15px' }} placeholder="Loại">
								<Option value="all">Tất cả</Option>
								<Option value="word">Word</Option>
								<Option value="pdf">PDF</Option>
								<Option value="other">Khác</Option>
							</Select>
							<Select style={{width:'30%', marginLeft: '15px' }} placeholder="Người gửi">
								<Option value="all">Tất cả</Option>
								<Option value="Chi">Chi</Option>
								<Option value="Kiet">Kiet</Option>
								<Option value="other">Khác</Option>
							</Select>
							<Dropdown
								overlay={dropdownMenu}
								visible={visible}
								onVisibleChange={(v) => setVisible(v)}
								trigger={['click']}
                                style={{width:'30%', marginLeft: '15px' }}
							>
								<Button style={{ marrginLeft: '15px', marginRight: '30px' }}>
									Thời gian <DownOutlined />
								</Button>
							</Dropdown>
						</div>
					</div>
					<div className="document-group-content document-group-content-allfile">
						{file.map((file, index) => {
							return <LabelFile type={file.type} filename={file.filename}></LabelFile>;
						})}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}></div>
				</div>
			) : null}
		</div>
	);
}
