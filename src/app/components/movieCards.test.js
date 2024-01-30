import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import MovieCards from './movieCards'

describe("movie cards", () => {
	let movies = [];
	beforeEach(() => {
		movies = [{
			Actors: "Elle Fanning, AJ Michalka, Kyle Chandler",
			Awards: "11 wins & 70 nominations",
			BoxOffice: "$127,004,179",
			Country: "United States",
			DVD: "22 Nov 2011",
			Director: "J.J. Abrams",
			Genre: "Action, Mystery, Sci-Fi",
			Language: "English",
			Metascore: "72",
			Plot: "During the summer of 1979, a group of friends witness a train crash and investigate subsequent unexplained events in their small town.",
			Poster: "https://m.media-amazon.com/images/M/MV5BMjIzNjEyMzcwOF5BMl5BanBnXkFtZTcwMTkyMjE0NQ@@._V1_SX300.jpg",
			Production: "N/A",
			Rated: "PG-13",
			Released: "10 Jun 2011",
			Response: "True",
			Runtime: "112 min",
			Title: "Super 8",
			Type: "movie",
			Website: "N/A",
			Writer: "J.J. Abrams",
			Year: "2011",
			imdbID: "tt1650062",
			imdbRating: "7.0",
			imdbVotes: "349,915"
		}]
	})
	
	test("should contain title, year and poster for a card", () => {
		render(<MovieCards movieInformation={movies}/>)
		const card_title = screen.getByText("Super 8")
		const card_year = screen.getByText("2011")
		const card_poster = screen.getByRole("img")
		expect(card_title).toBeInTheDocument()
		expect(card_year).toBeInTheDocument()
		expect(card_poster).toBeInTheDocument()
	})
	
	test("should open a modal on click and close on x for a card", async () => {
		render(<MovieCards movieInformation={movies}/>)
		const movie_card = screen.getByText("Super 8")
		fireEvent.click(movie_card)
		const modal_title = screen.getByText("Movie Details")
		expect(modal_title).toBeInTheDocument()
		const closeButton = screen.getByRole('button');
		await waitFor(() => modal_title);
		fireEvent.click(closeButton);
		await waitForElementToBeRemoved(() => screen.queryByText(/Movie Details/i));
		expect(screen.queryByText(/Movie Details/i)).toBeNull();
	})

	test("clicking on a card gives detailed information of the movie", () => {
		render(<MovieCards movieInformation={movies}/>)
		const movie_card = screen.getByText("Super 8")
		fireEvent.click(movie_card)
		const label_h2 = screen.getAllByTitle("Movie Details Label")
		const details_label = label_h2.map(item => item.textContent)
		expect(details_label).toEqual([
			"Genre",
			"Director",
			"Title",
			"Year",
			"Rated",
			"Released",
			"Runtime",
			"Writer",
			"Actors",
			"Plot",
			"Language",
			"Country",
		])
	})
})