# PokéExplorer

A modern web application that allows users to explore and learn about Pokemon using the PokeAPI.

## Live Site

[Visit PokéExplorer](https://pokemon-explorer-sba.netlify.app)

## Technologies Used

- **React.js (v18)**: Frontend library for building the user interface
- **Redux Toolkit**: State management for React applications
- **Axios**: HTTP client for making API requests

## API Integration

The application uses Axios to make AJAX requests to the [PokeAPI](https://pokeapi.co/):
- Fetches Pokemon data in batches of 20 for efficient loading
- Implements infinite scrolling for seamless data exploration
- Retrieves detailed information for each Pokemon including:
  - Sprites/Images
  - Types

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Known Issues

- Loading state could be improved for better user experience
- Need to implement error boundaries for better error handling
- Mobile responsiveness could be enhanced for smaller screens
