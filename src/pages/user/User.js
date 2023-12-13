import React, { useState, useEffect } from 'react';
import './User.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';

const User = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [orderBy, setOrderBy] = useState('id');
	const [order, setOrder] = useState('ASC');
	const [totalElements, setTotalElements] = useState(5);
	const [totalPages, setTotalPages] = useState(1);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json',
			};

			const res = await Api.get(
				url + `api/v1/users/admin/get-all-users?page=${page}&size=${size}&orderBy=${orderBy}&order=${order}`,
				{ headers }
			);
			console.log(res);
			if (res.data.statusCode === 200) {
				setUsers(res.data.result.users);
				setTotalElements(res.data.result.totalElements);
				setTotalPages(res.data.result.totalPages);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	};

	const imageBodyTemplate = (product) => {
		return (
			<img
				src={product.avatarUrl}
				alt={product.avatarUrl}
				className="w-6rem shadow-2 border-round"
			/>
		);
	};

	const priceBodyTemplate = (product) => {
		return formatCurrency(product.price);
	};

	const ratingBodyTemplate = (product) => {
		return <Rating value={product.rating} readOnly cancel={false} />;
	};

	const statusBodyTemplate = (product) => {
		return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
	};

	const getSeverity = (product) => {
		switch (product.inventoryStatus) {
			case 'INSTOCK':
				return 'success';

			case 'LOWSTOCK':
				return 'warning';

			case 'OUTOFSTOCK':
				return 'danger';

			default:
				return null;
		}
	};

	const header = (
		<div className="flex flex-wrap align-items-center justify-content-between gap-2">
			<span className="text-xl text-900 font-bold">Products</span>
			<Button icon="pi pi-refresh" rounded raised />
		</div>
	);
	const footer = `In total there are ${users ? users.length : 0} products.`;

	return (
		<div id="user-container">
			<DataTable value={users} header={header} footer={footer} tableStyle={{ minWidth: '60rem' }}>
				<Column field="name" header="Name"></Column>
				<Column header="Image" body={imageBodyTemplate}></Column>
				<Column field="price" header="Price" body={priceBodyTemplate}></Column>
				<Column field="category" header="Category"></Column>
				<Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
				<Column header="Status" body={statusBodyTemplate}></Column>
			</DataTable>
		</div>
	);
};

export default User;
