import React from 'react';


export default function DefaultLayoutTwoPage({ Left, children }) {
	return (
		<>
			<div style={{marginTop:'5rem'}}>
				
				<div className="content-2page" style={{display:'flex'}}>
					<div theme="light" style={{left:'20px', width:'25%', marginLeft:'20px'}}>
						{Left}
					</div>
					<div className style={{right:'2rem', width:'75%', marginRight:'20px'}}>  {children} </div>
				
				</div>
			</div>
		</>
	);
}
