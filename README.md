# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Setup

Install dependencies:

```sh
yarn install
```

Install AWS CLI:

```sh
brew update
brew install awscli
```

## Local Dev

```sh
yarn dev
```

## Deploy

```sh
yarn deploy
```

## Refactored Dependencies

- https://github.com/pmndrs/zustand
- https://github.com/tanstack/query
- https://github.com/vitejs/vite
- https://github.com/phosphor-icons/react

## DNS Routing Debug

```sh
dig +short _820de6e96d1ba42e61766be7b4dd5392.servitor-pwa.com

dig +short _e17d27e16429e8b76166fa126250b8fe.www.servitor-pwa.com

dig +short _820de6e96d1ba42e61766be7b4dd5392.servitor-pwa.com.servitor-pwa.com
```

_820de6e96d1ba42e61766be7b4dd5392.

_ad183a4c29ad2760bc873962339e4a2b.mhbtsbpdnt.acm-validations.aws.

_e17d27e16429e8b76166fa126250b8fe.www.

_e9ca9e06f07226966376bc59dd2d6718.mhbtsbpdnt.acm-validations.aws.

## Dice Roll Text

https://anydice.com/

## TODO

- https://phuoc.ng/collection/mirror-a-text-area/add-autocomplete-to-your-text-area/
- https://github.com/ianstormtaylor/slate for autocomplete and WYSIWYG?
- https://muffinman.io/blog/native-dual-range-input/

## Reading

- https://www.thedarkfortress.co.uk/tech_reports/2_dice_rolls.php

## Similar Apps

- https://www.newrecruit.eu/app/MyLists
- https://www.unitcrunch.com/
- https://warptracker.com
- https://game-datacards.eu/viewer/chaos-space-marines
- https://armylists.rmz.gs/
- https://warorgan.com/
- https://armydrop.com/

