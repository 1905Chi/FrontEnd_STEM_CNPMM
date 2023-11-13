export default function BannerGroup() {
	return (
		<>
			<div className="banner-group" style={{margin:'0 0 35px 0'}}>
				<div className="banner-group__image" >
					<img src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png" alt="" style={{width:'100%',height:'50%'}} />
				</div>
				<div className="banner-group__name">
					<h1 style={{margin:'0 65px'}}>Group Name</h1>
				</div>
				<div>{}</div>
				<div style={{display:'flex',justifyContent:'start'}} className="group-menu">
                    <button style={{ margin:'0px',borderRadius:'0px',backgroundColor:'white'}}> <h3>Giới thiệu</h3></button>
                    <button style={{ margin:'0px',borderRadius:'0px',backgroundColor:'white'}}> <h3>Bài Viết</h3></button>
                    <button style={{ margin:'0px',borderRadius:'0px',backgroundColor:'white'}}> <h3>Thành viên</h3></button>
                    <button style={{ margin:'0px',borderRadius:'0px',backgroundColor:'white'}}><h3>Sự kiện</h3></button>
       
                </div>
			</div>
		</>
	);
}
