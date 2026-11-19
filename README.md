# Game Hub

A static dashboard of simple browser games. No build step, no dependencies.

## Games

| Game | Players | Notes |
|------|---------|-------|
| Heads Up! | 2+ | Taboo / Heads Up style. 6 categories (plus All), Easy / Medium / Hard / Mixed, 30/60/90s rounds |
| Challenge Roulette | 2+ | Mild / Medium / Wild challenges. Add your own in the admin panel (saved in the browser) |
| Memory Match | 1 | Best score saved locally |
| Tic-Tac-Toe | 1-2 | 2 players or vs computer |
| Reaction Test | 1+ | Best time saved locally |
| Whack-a-Mole | 1+ | 30-second rounds, high score saved locally |

## Run locally

Open `index.html` in a browser. Or serve the folder:

```
python -m http.server 8000
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repo go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. After a minute your site is live at `https://<your-username>.github.io/<repo-name>/`.

## Add a game

1. Create `games/<your-game>/index.html` (link `../../css/shared.css` and add a `← Back to Hub` link to `../../index.html`).
2. Add an entry to `js/games.js`.

## Customise content

- Heads Up words: `games/heads-up/words.js`
- Default challenges: `games/challenge-roulette/challenges.js`
- Admin passcode (casual gate only, change before publishing): `js/admin-config.js`. Open the admin panel with Ctrl+Shift+Z on the hub, or tap the 🎮 icon next to "Game Hub" on mobile.
