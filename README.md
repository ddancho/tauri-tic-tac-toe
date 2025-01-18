# Tic-Tac-Toe --- Human vs Minimax ---

[Tauri](https://tauri.app/) app with [NextJS](https://nextjs.org/) as the frontend,
[minimax](https://en.wikipedia.org/wiki/Minimax) algorithm is calculated on the rust side and called from the frontend.

## Getting Started

- just follow [prerequisites](https://tauri.app/start/prerequisites/) in the tauri documentation
  for your os

## Next steps

- install nodejs packages with

```bash
npm install
```

- run the app in the dev mode

```bash
npm run tauri dev
```

- to build the app follow the [instructions](https://tauri.app/distribute/),
  notice in the tauri.conf.json file build.active is set to false so it will just output the executable not all bundle

```bash
npm run tauri build
```
