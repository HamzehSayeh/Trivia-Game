const players = [];

const addPlayer = ({ id, playerName, room }) => {
  if (!playerName || !room)
    return {
      error: new Error("Please Provide Player Name and Room"),
    };

  playerName = playerName.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingPlayer = players.find((player) => {
    return player.playerName === playerName && player.room === room;
  });

  if (existingPlayer) {
    return {
      error: new Error("Player name in use!"),
    };
  }
  const newPlayer = { id, playerName, room };
  players.push(newPlayer);

  return { newPlayer };
};

const findPlayerById = (id) => {
  const player = players.find((player) => player.id === id);

  if (!player) {
    return {
      error: new Error("Player not found"),
    };
  }

  return { player };
};

const getAllPlayers = (room) => {
  return players.filter((player) => player.room === room);
};

const removePlayer = (id) => {
  return players.find((player, index) => {
    if (player.id === id) {
      return players.splice(index, 1)[0];
    }
    return false;
  });
};

module.exports = {
  addPlayer,
  getAllPlayers,
  findPlayerById,
  removePlayer,
};
