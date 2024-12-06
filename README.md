# Trivia-Game

A real-time multiplayer trivia game where players can join a room, chat, and compete to answer questions!

## Features

### **Room Management**
- Players enter a **name** and a **room code** to join a game.  
- **Multiple players** can join a single room to participate in a trivia game.  

> Note: **Multichannel support** (hosting games in multiple rooms simultaneously) is not included in this version. Only one game can occur at a time.

### **Game Features**
1. **Real-Time Chat:**  
   Players can chat with each other while in the room.  
2. **Room Details:**  
   View the current room and the list of players who have joined.  
3. **Game Initialization:**  
   Any player in the room can start the game.  
4. **Answer Submission:**  
   - Each player is allowed to submit only one response per question.  
   - All players must submit their responses before the correct answer is revealed.  

## How It Works
1. Players join a room by providing their **name** and **room code**.  
2. Once all players are ready, any player can start the game.  
3. Players answer trivia questions in real-time, with only one response allowed per question.  
4. After all players have responded, the correct answer is revealed.  

## Technologies Used
- **Socket.IO**: For real-time communication between players.  
- **Node.js**: Backend framework to manage game logic.  
- **HTML, CSS, JavaScript**: Frontend for the game interface.  

## Getting Started
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/trivia-game.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd trivia-game
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Start the server:  
   ```bash
   node server.js
   ```
5. Open the application in your browser:  
   ```
   http://localhost:3000
   ```

## Future Enhancements
- Add support for multiple channels/rooms.  
- Implement more advanced game modes and score tracking.  
- Include a leaderboard to rank players globally or within rooms.  

## License
This project is licensed under the MIT License.  

--- 

Let me know if you'd like me to customize this further!
