# init-js-lint

I was tired of trying to remember all the packages and peer dependencies I needed to install just to get up and running with ESLint and Prerrier using [Airbnb's configs](https://www.npmjs.com/package/eslint-config-airbnb), so I created this handly little script to do all that for me.

Check out this project on [NPMjs.com](https://www.npmjs.com/package/@justaddcl/init-js-lint)

## What it installs

- Airbnb's ESLint config (either base or with react depending on supplied argument)
- any peer dependencies for Airbnb's ESLint config
- any other packages specified in packages.js

Note: it will install the latest version of each package. Specifying versions is not (yet) supported. To install other versions, manually edit your package.json after you've run the script, then run `npm i`

# Usage

Base config (you're not using react)

```shell
  npx @justaddcl/init-js-lint
```

React config

```shell
  npx @justaddcl/init-js-lint react
```

# Thank you

A big shout out to the [npms.io](https://npms.io/about) API, which I use to get the latest list of peer dependencies for the Airbnb's config that need to be installed

If you find this useful in your projects or have ideas on how to make this more helpful, I'd love to hear about it! @justaddcl
