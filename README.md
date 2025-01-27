# Pokémon Elo Rating System  

A React-based web app to simulate Pokémon battles and update their Elo ratings based on the results. Players can choose between two randomly selected Pokémon, and the winner's Elo rating is updated accordingly. This app helps simulate how Pokémon would rank over time in a competitive system.  

---

## Features  

- **Elo Rating Calculation**  
  Implements the Elo rating system to dynamically adjust Pokémon ratings after each battle based on outcomes.  

- **Random Pokémon Selection**  
  Each match selects two Pokémon randomly from a predefined list to ensure variety and unpredictability.  

- **Match Simulation**  
  Players actively participate by choosing the winner of each match, triggering real-time updates to the ratings.  

- **Dynamic Interface**  
  A responsive UI displays Pokémon names and their ratings, which are updated dynamically after every match.  

- **Leaderboard**  
  A real-time leaderboard ranks the top 10 Pokémon based on their Elo ratings, allowing players to track the top-performing Pokémon.  

---

## Technologies Used  

### Frontend  
- **React**: Frontend framework for building the user interface.  
- **JavaScript (ES6)**: Core language for app logic.  
- **CSS**: For styling the user interface.  

### Backend  
- **Node.js**: Runtime environment for building the server-side logic.  
- **Express.js**: Backend framework for handling routes and API requests.  
- ~**PostgreSQL**: Relational database for storing Pokémon data and Elo ratings. ~ (not anymore)
- **MongoDb**: NoSQL database for storing Pokémon data and Elo ratings. (updated)
- **Sequelize**: ORM (Object Relational Mapper) for interacting with the ~PostgreSQL~ Mongodb database.  

---

## Installation  

1. Clone the repository:  

   ```bash
   git clone https://github.com/Menma420/PokemonEloRating.git
   ```

2. Navigate into the project directory:  

   ```bash
   cd pokemon-elo-rating
   ```

3. Install dependencies:  

   ```bash
   npm install
   ```

4. Start the backend server:  

   - Navigate to the `Backend` directory:  
     ```bash
     cd Backend
     ```
   - Install backend dependencies:  
     ```bash
     npm install
     ```
   - Set up PostgreSQL database and configure Sequelize:  
     - Update the `config.json` or `.env` file in the `Backend` directory with your PostgreSQL credentials (host, username, password, database, etc.).  
   - Start the backend server:  
     ```bash
     npm start
     ```  
     The backend will run on `http://localhost:4000`.  

5. Start the frontend development server:  

   Open another terminal and navigate to the frontend folder:  
   ```bash
   cd ..
   cd frontend
   npm install
   npm start
   ```  
   The app will run on `http://localhost:3000`.  

---

## Usage  

1. The app will display two randomly selected Pokémon.  
2. Click on one of the Pokémon to choose the winner.  
3. The Elo rating of the winner and loser will be updated based on the outcome.  
4. A new pair of Pokémon will be selected for the next match.  
5. The **Leaderboard** shows the current top 10 highest-rated Pokémon.  

---

## How Elo Rating Works  

The Elo rating system is used to calculate the relative skill levels of two players. After each match:  

- The winner's rating is adjusted upward based on the difference in ratings between the two Pokémon.  
- The loser’s rating is adjusted downward accordingly.  
- The formula used is:  

   ```javascript
   1 / (1 + Math.pow(10, (rating1 - rating2) / 100))
   ```  

- The `K` factor is set to 16 in this implementation.  

---

## Future Improvements  

- Add more Pokémon to the list.  
- Implement animations for Pokémon during battles.  
- Enhance the leaderboard with advanced filters and sorting options.  
- Allow players to manually select Pokémon instead of random selection.  
- Introduce multiplayer functionality to enable users to battle against each other.  
