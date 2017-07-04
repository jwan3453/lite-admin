'use strict';

var paths = require('../config/paths');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var appPackage  = require(paths.appPackageJson);
var currentVersion = appPackage.version;
var appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

paths.appBuild = resolveApp('dist/' + currentVersion);

console.log();
console.log(chalk.yellow(appPackage.name) + ' version ' + chalk.cyan(currentVersion) + ' deploy to ' + chalk.cyan(paths.appBuild) + '....');
console.log();

try {
  fs.accessSync(resolveApp('dist'), fs.constants.R_OK | fs.constants.W_OK);
} catch(e) {
  fs.mkdirSync(resolveApp('dist'));
}

require('./build');

var redirectTemplate = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Refresh" content="0; url=./${currentVersion}/index.html" />
    <title>Redirect</title>
  </head>
<body></body>
</html>
`;

fs.writeFileSync(resolveApp('dist/index.html'), redirectTemplate);