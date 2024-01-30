import React from 'react';
import {Container, Row} from 'react-bootstrap';
import './app.scss';
import Header from './../app/components/header';
import MovieCards from './../app/components/movieCards';

interface AppInfoProps {}

interface AppInfoStates {
	movieInfo: any[],
	error: boolean,
	errorMessage: string
}

export default class App extends React.Component<AppInfoProps, AppInfoStates>{
	constructor(props: any) {
		super(props);
		this.state = {
			movieInfo: [],
			error: false,
			errorMessage: ""
		}
	}

   async componentDidMount() {
		const api_key = "api_key";
		const searchUrl = `https://www.omdbapi.com/?s=super&apikey=${api_key}`;

		try {
			const response = await fetch(searchUrl);
			if (!response.ok) {
				throw new Error('Found an error! Failed to fetch data');
			}
			
			const data = await response.json();
			const detailedMovies = await Promise.all(data.Search.map(async (movie: any) => {
				const detailedResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${api_key}`);
				return detailedResponse.json();
			}));
			this.setState({movieInfo: detailedMovies});
		} catch (error: any) {
			console.log(error.message)
			this.setState({ error: true, errorMessage: error.message });
		}
  }

  render() {
		return <Container fluid>
			<Header/>
			<Row>
				{this.state.error ?
					(<div className="error-bg"> 
						<p>{this.state.errorMessage}</p>
					</div>)
				:
					(<MovieCards movieInformation={this.state.movieInfo}/>)
				}
			</Row>
		</Container>;
  }
}