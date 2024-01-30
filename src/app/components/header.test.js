import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';

it('renders correct header title', () => {
	render(<Header />);
	const title_text = screen.getByText(/Movie Search/i);
	expect(title_text).toBeInTheDocument();
});

test('renders sidebar when clicked on hamburger menu', () => {
	render(<Header />);
	const hamburger_menu = screen.getByRole('button')
	fireEvent.click(hamburger_menu)
	const menu_text = screen.getByText("Menu 1")
	expect(menu_text).toBeInTheDocument()
});

test('renders 7 menu tabs', async () => {
	render(<Header />);
	const hamburger_menu = screen.getByRole('button')
	fireEvent.click(hamburger_menu)
	const li = screen.getAllByRole("listitem")
	const menu_names = li.map(item => item.textContent)
	expect(li).toHaveLength(7)
	expect(menu_names).toEqual([
		"Menu 1",
		"Menu 2",
		"Menu 3",
		"Menu 4",
		"Menu 5",
		"Menu 6",
		"Menu 7",
	])
});
