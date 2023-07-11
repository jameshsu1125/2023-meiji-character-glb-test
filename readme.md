[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

<p align="center">
  <a href="https://github.com/jameshsu1125">
    <img src="https://user-images.githubusercontent.com/70932507/188534539-a68734ac-9330-4fe0-bc49-5fa85116493e.png" alt="Logo" width=72 height=72>
  </a>
  <h3 align="center">Logo</h3>
  <p align="center">
    Short description   
  </p>
</p>

## Table of contents

- [Table of contents](#table-of-contents)
- [Quick start](#quick-start)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)
- [remove optimized svg](#remove-optimized-svg)

## Quick start

- install module

```sh
$ npm i
```

- start project

```sh
$ npm start
```

- build static file to `/dist`

```sh
$ npm run build
```

## Status

- Development since January 2022
- use React hook
- use Less.js
- use ESLint [airbnb](https://github.com/airbnb/javascript) rules
- There is a unit related style will use [TailwindCSS](https://tailwindcss.com/docs/padding)(Spacing, Typography...)

## What's included

- `public` folder will copy to `/dist`
- `src` folder is reactJs entry point. default file is named as `index.js`
- `template` folder is html template for each entry points.

```text
📦package
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂hooks
 ┃ ┣ 📂index
 ┃ ┣ 📂pages
 ┃ ┣ 📂setting
 ┃ ┗ 📜index.js
 ┣ 📂template
 ┃ ┣ 📜template.html
 ┃ ┗ 📜template.meta.js
 ┣ 📜.babelrc
 ┣ 📜.browserslistrc
 ┣ 📜.env.defaults
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc.json
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜LICENSE
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜readme.md
 ┣ 📜tailwind.config.js
 ┗ 📜webpack.config.js
```

## Bugs and feature requests

- [Node](https://nodejs.org/en/) version must be above v16
- I will not maintain when this project is closed

## Contributing

Please read through our [contributing guidelines](https://github.com/github/docs/blob/main/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML and CSS should conform to the [Code Guide](https://github.com/airbnb/javascript), maintained by [Main author](https://github.com/jameshsu1125).

## Creators

**maintainer, developer**

- [James Hsu](https://github.com/jameshsu1125)

## Thanks

Thank customers and some manufacturers for their support.

## Copyright and license

Code and documentation copyright 2011-2022 the authors. Code released under the [MIT License](https://reponame/blob/master/LICENSE).

## remove optimized svg

```sh
find . -name '*\<*' | while read f; do mv "$f" "${f//\</}"; done
```

<!-- open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security -->
