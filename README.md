# ProcessWire Gulp Boilerplate

A simple ProcessWire boilerplate using Gulp

## Usage

Install ProcessWire, as you normally would, into the `dist/` directory and add the following to your `config.php`:

```php
$config->prependTemplateFile = 'includes/_init.php';
$config->useMarkupRegions = true;
```

Then, assuming you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) installed, install all the required npm packages:

```
npm install
```

Gulp manages copying files and compiling sass. Gulp runs Webpack to compile Javascript.

Hence, to change Javascript build, you must edit `webpack.base.conf.js`.

All other settings are in the `config` object in `gulpfile.js`. Most properties of `config` are self explanatory.

Place all your source code in `src/` instead of the actuall ProcessWire installation. Gulp will copy all your files to the appropriate folders.

## Building

```bash
npm run clean # remove built files from dist

npm run build # build for production

npm run watch # watch for changes and then build for development
```

## Notes
If you have any issues getting this running, let me know over on the issues page.