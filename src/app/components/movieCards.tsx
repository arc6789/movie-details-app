import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons';


interface MovieCardProps {
	movieInformation: {
		Title: string;
		Year: string;
		Poster: string;
		imdbID: string;	
	}[]
}

interface MovieCardStates {
	modalOpen: boolean;
	movieDetails: {[key: string]: any}
}

export default class MovieCards extends React.Component<MovieCardProps, MovieCardStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			modalOpen: false,
			movieDetails: {}
		}
	}

	getMovieInformation = (movieId: string) => {
		this.setState({modalOpen: true});
		if (this.props.movieInformation) {
			const details: {[key: string]: any} = this.props.movieInformation.find(element => element.imdbID == movieId)!
			this.setState({
				movieDetails : {
					Genre: details.Genre,
					Director: details.Director,
					Title: details.Title,
					Year: details.Year,
					Rated: details.Rated,
					Released: details.Released,
					Runtime: details.Runtime,
					Writer: details.Writer,
					Actors: details.Actors,
					Plot: details.Plot,
					Language: details.Language,
					Country: details.Country,
					Poster: details.Poster
				}
			})
		}
	}

	closeModal = () => {
		this.setState({modalOpen: false})
		this.setState({movieDetails: {}})
	}

	render() {
		const itemList = this.props.movieInformation.map((item,index)=>{
			return (
				<Col title="movie card" key={index} sm={12} md={6} lg={4} onClick={() => this.getMovieInformation(item.imdbID)}>
					<Card className="movie-card">
						<Card.Title className="movie-card-title"> {item.Title} </Card.Title>
						<Card.Text className="movie-card-year"> {item.Year} </Card.Text>
						<div className="movie-card-img-wrapper">
							<Card.Img className="movie-card-img" src={item.Poster} alt={item.Title + " Poster"}></Card.Img>
						</div>
					</Card>
				</Col>
			)
		});

		return <div className="card-wrapper">
			<Row className="card-section-title">
				<h2>Movie List</h2>
			</Row>
			<Row>
				{this.props.movieInformation && itemList}
			</Row>
			<Modal data-testid="details-modal" show={this.state.modalOpen} onHide={this.closeModal}>
				<Modal.Body>
					<button role="button" className="modal-button" onClick={this.closeModal}>
						<FontAwesomeIcon icon={faTimes} size="lg"></FontAwesomeIcon>
					</button>
					<Row className="movie-details-content">
						<Col md={5} lg={5}>
							{this.state.movieDetails.Poster ? 
								<img src={this.state.movieDetails.Poster} alt={this.state.movieDetails.Title + " Poster"}></img> :
								<div className="movie-details-no-img"></div>}
						</Col>
						<Col md={7} lg={7} className="movie-details-text">
							<h4 className="movie-details-text-title">Movie Details</h4>
							{Object.entries(this.state.movieDetails).map(([key,value]: [string, any])=>{
								if(key !== "Poster") {
									return (
										<div key={key}> 
											<b title="Movie Details Label">{key}</b>
											<span>: </span>
											<span>{value.toString()}</span>
										</div>
									);
								}
							})}
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</div>;
	}
}
