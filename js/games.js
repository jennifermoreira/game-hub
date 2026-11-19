// Game registry. To add a game: create games/<folder>/index.html and add an entry here.
// players: "solo" (1 player) or "multi" (2+ players); "both" appears under either filter.
const GAMES = [
  {
    id: "heads-up",
    title: "Heads Up!",
    icon: "🎭",
    description: "Guess the word on the card from your friends' clues. Pick a category and difficulty.",
    path: "games/heads-up/index.html",
    players: "multi",
    playersLabel: "2+ players",
    time: "5-10 min"
  },
  {
    id: "challenge-roulette",
    title: "Challenge Roulette",
    icon: "🎰",
    description: "Spin for a random challenge. Pick a spice level: Mild, Medium or Wild.",
    path: "games/challenge-roulette/index.html",
    players: "multi",
    playersLabel: "2+ players",
    time: "Any"
  },
  {
    id: "memory-match",
    title: "Memory Match",
    icon: "🧠",
    description: "Flip cards and find all the matching pairs in as few moves as you can.",
    path: "games/memory-match/index.html",
    players: "solo",
    playersLabel: "1 player",
    time: "2-5 min"
  },
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    icon: "❌",
    description: "The classic. Play a friend or take on the computer.",
    path: "games/tic-tac-toe/index.html",
    players: "both",
    playersLabel: "1-2 players",
    time: "1-3 min"
  },
  {
    id: "reaction-test",
    title: "Reaction Test",
    icon: "⚡",
    description: "Click the instant the screen turns green. Compare your best times.",
    path: "games/reaction-test/index.html",
    players: "both",
    playersLabel: "1+ players",
    time: "1-2 min"
  },
  {
    id: "whack-a-mole",
    title: "Whack-a-Mole",
    icon: "🔨",
    description: "Smack as many moles as you can in 30 seconds. Beat your high score.",
    path: "games/whack-a-mole/index.html",
    players: "both",
    playersLabel: "1+ players",
    time: "30 sec"
  }
];
