import React from 'react';
import { Card } from 'antd';
//import Map from './Map';
import Location from "./locations"

class List extends React.Component {
	render() {
		const locations = this.props.locations;
		/*const { input, output, setOutput } = useContext(CityContext);
		useEffect(() => {
			request(input).then((response) => {
				setOutput(response);
			});
		}, [input, setOutput]);*/

		// location list

		return (
			<div id="list">
				<h2 className="vet-title">Locations</h2>
				<p>{this.props.queryString}</p>
				<Location LocationFunction={(data) => this.props.LocationFunction(data)} />
				<input
					className="vet-input"
					type="text"
					value={this.props.queryString}
					onChange={(e) => this.props.handleChange(e.target.value)}
				/>
				<ol>
					{locations.map((loc) => (
						<li key={loc.venue.id}>
							<Card className="vet-list">
								<span className="vet-name-title">Veteriner Adı: </span>
								<a className="vet-name" href="#" onClick={() => this.props.showInfoContent(loc)}>
									{loc.venue.name}
								</a>
								<br />
								<br />
								<span className="vet-adres-title">Adresi:</span>
								<span className="vet-adres"> {loc.venue.location.address}</span>
							</Card>
						</li>
					))}
				</ol>
			</div>
		);
	}
}

export default List;
