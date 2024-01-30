import React from 'react';
import {Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {}

interface HeaderStates {
	active: boolean
}

export default class Header extends React.Component<HeaderProps,HeaderStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			active: false,
		}
	}

	toggleClass = () => {
		this.setState({ active: !this.state.active });
  	};

	render() {
		return <div>
			<Col xs={6} md={2} lg={2} className={`menubar-wrapper ${this.state.active ? "mobile-open" : ""}`}>
				<ul className="menubar-ul">
					{[ ...Array(7)].map((item, index)=>{
						return <li className="menubar-li" key={index}>Menu {index+1}</li>
					})}
				</ul>
			</Col>
			<div className="header-wrapper">
				<button className="hamburger-menu" role="button" title="Hamburger Menu Icon">
					<FontAwesomeIcon icon={faBars} size="lg" onClick={this.toggleClass} />
				</button>
				<h1 className="header-title">Movie Search</h1>
			</div>
		</div>;
	}
}
