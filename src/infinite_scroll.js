import React from 'react';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const API_BASE_URL =  'https://api.instantwebtools.net/v1/passenger';

function Details(){

	const [data, setData] =  React.useState([]);
	const [count, setCount] = React.useState(0)

	const getNewData = (count) => {
		Axios({
			method: 'get',
			url: API_BASE_URL + `?page=${count}&size=10`,
			responseType: 'json',
			headers: { 'Content-Type': 'application/json' },
		}).then(function (response) {
			const { data: res } = response;
			setData([...data, ...res.data])
		});
	}

 	React.useEffect(()=>{
		getNewData(0)
 	},[]);


	 return (
		<div>
			<InfiniteScroll
				dataLength={data.length}
				next={() => {
					setCount(count + 1)
					getNewData(count + 1)
				}}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
			<table cellPadding="5" border="1" cellSpacing="0" width="50%">
				<thead>
					<tr>
						<th>Sno</th>
						<th>Id</th>
						<th>Name</th>
						<th>Trip</th>
					</tr>
				</thead>
				<tbody>
					{data.map((elem, ind) => (

						<tr key={ind} height="200px">
							<td>{ind + 1}</td>
							<td>{elem._id}</td>
							<td>{elem.name}</td>
							<td>{elem.trips}</td>
						</tr>

					))}
				</tbody>

			</table>
			</InfiniteScroll>
		</div>	
		
	);
}

export default Details;