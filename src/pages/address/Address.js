import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Table, Space, Collapse } from 'antd';
import { Pagination } from 'antd';
import './Address.css';
import { url } from '../../constants/Constant';
import Api from '../../api/Api';
const items = [
	{
		key: '1',
		label: 'Action 1',
	},
	{
		key: '2',
		label: 'Action 2',
	},
];

const Address = () => {
	const [listdata, setListdata] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(1);
	const [totalElemet, setTotalElemet] = useState(0);
  const [totalpage, setTotalpage] = useState(0);
	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		const header = {
			Authorization: localStorage.getItem('accessToken'),
			'Content-Type': 'application/json',
		};
		try {
			const response = await Api.get(url + `api/v1/addresses/admin/provinces?page=${page}&size=${pageSize}`, {
				headers: header,
			});
			const provinces = response.data.result.provinces;
      setTotalElemet(response.data.result.totalElements);
      setTotalpage(response.data.result.totalPages);
      console.log('totalpage',totalpage);
      console.log('totalElemet',totalElemet);
			if (provinces && provinces.length > 0) {
				const provincesWithDistricts = await Promise.all(
					provinces.map(async (province) => {
						const districtsResponse = await Api.get(
							url + `api/v1/addresses/admin/districtsByProvince?pId=${province.id}`,
							{ headers: header }
						);
						const districtsData = districtsResponse.data.result;
						try {
							if (districtsData && districtsData.length > 0) {
								const districts = await Promise.all(
									districtsData.map(async (district) => {
										const schoolsResponse = await Api.get(
											url + `api/v1/addresses/admin/schoolsByDistrict?dId=${district.id}`,
											{ headers: header }
										);
										const schoolsData = schoolsResponse.data.result;
										const schools = schoolsData.map((school) => ({
											...school,
											key: school.id.toString(), // Sử dụng id của trường làm key
										}));

										return {
											...district,
											key: district.id.toString(), // Sử dụng id của huyện làm key
											schools: schools,
										};
									})
								);
								return {
									...province,
									key: province.id.toString(), // Sử dụng id của tỉnh làm key
									districts: districts,
								};
							}
						} catch (error) {
							console.log(error);
						}
					})
				);

				setListdata(provincesWithDistricts);
				console.log('provincesWithDistricts', provincesWithDistricts);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// const expandtableDistricts = (record) => {
		const columnschool= [
			{
				title: 'Thứ tự',
				dataIndex: 'key',
				key: 'key',
				render: (key) => Number(key) + 1,
			},
			{
				title: 'Code',
				dataIndex: 'code',
				key: 'code',
			},
			{
				title: 'Tên trường',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Mô tả',
				key: 'description',
				render: (description) => (description ? description : 'Không có mô tả'),
			},
		];

	// 	return (
	// 		<div style={{ textAlign: 'center' }}>
	// 			<h3>Danh sách các trường</h3>
	// 			<Table columns={columns} dataSource={record.schools} pagination={false} />
	// 		</div>
	// 	);
	// };

	const expandedRowRender = (record) => {
		const columns = [
			{
				title: 'Thứ tự',
				dataIndex: 'key',
				key: 'key',
				render: (key) => Number(key) + 1,
        width: '5%',
			},
			{
				title: 'Code',
				dataIndex: 'code',
				key: 'code',
        width: '5%',
			},
			{
				title: 'Tên huyện',
				dataIndex: 'name',
				key: 'name',
        width: '20%',
			},
			{
				title: 'Mô tả',
        dataIndex: 'description',
				key: 'description',
				render: (description) => (description ? description : 'Không có mô tả'),
        width: '10%',
			},
      {
        title: 'Trường',
        key: 'schools',
        render: (text, record) => (
          <Collapse className='collapse-table'>
          <Collapse.Panel header="Danh sách các trường của huyện" key="1">
              <Table
                dataSource={record.schools}
                columns={columnschool}
                pagination={false}
              />
           </Collapse.Panel>
          </Collapse>
        ),
        width: '40%',
      }
		];

		return (
      <div style={{textAlign:'center'}}>
        <h3>Danh sách các huyện của tỉnh {record.name}</h3>
			<Table
				columns={columns}
				dataSource={record.districts}
				pagination={false}
        size="small"
				
        align="center"
        width="90%"
			/>
      </div>
		);
	};
	const columns = [
		{
			title: 'Thứ tự',
			dataIndex: 'key',
			key: 'key',
			render: (key) => Number(key) + 1,
      width: '5%',
		},
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
      width: '5%',
		},
		{
			title: 'Tên tỉnh',
			dataIndex: 'name',
			key: 'name',
      width: '20%',
		},
		{
			title: 'Mô tả',
			dataIndex: 'description',
			key: 'description',
			render: (description) => (description ? description : 'Không có mô tả'),
      width: '70%',
		},
	];

	const handlePaginationChange = (current, pageSize) => {
		// Xử lý sự kiện khi chuyển trang
		console.log(`Selected Page: ${current}, PageSize: ${pageSize}`);
	};

	
	return (
		<div className="manager-address-admin">
			<Table
				columns={columns}
				expandable={{
					expandedRowRender,
				}}
				dataSource={listdata}
				size="middle"
				pagination={false}
        style={{width:'90%' , marginLeft:'5rem'}}
        align="center"
        
			/>
			<Pagination
        total= {80}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        defaultPageSize= {5}
        defaultCurrent={1}
      />
		</div>
	);
};

export default Address;
