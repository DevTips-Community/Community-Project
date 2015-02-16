# Community-Project
*Better name pending*

See [Trello](https://trello.com/b/d6gtnCnl/community) for more information about the project and its status.

## Installation
Clone the repository, make sure you have npm installed then run `npm install`. Also make sure that your editor of choice supports `.editorconfig`.

## Working with the repository
All of the application code should go into the `/app` folder, then the code is compiled by gulp and output into the `/dist` folder. The `/dist` folder is hidden from git by default. Currently only three assets are handled: scripts, styles, and templates. If you need another asset to be handled such as images, submit an issue and mark it as a feature request.

Scripts and styles are run through processors on compilation time (coffeescript and sass respectively). As such to designate what files you want to compile, simply prefix the file with am asterik (*). All files not prefixed will be treated as dependencies and should be imported however the processor designates.

All scripts are combined using browserify, so use `require`, `module.exports`, and `export` as you would when working with nodejs. All styles are processed with autoprefixer, so you don't have to worry about prefixing css properties.

Make sure to work in your own branch until you are ready to merge.

## Gulp
To automate builds we use gulp. The gulp commands you can use are listed below.

`gulp assets:scripts`, `gulp assets:styles`, and `gulp assets:templates` all process their specific resources. `gulp assets` will compile all of them at once.

`gulp dist` runs the assets task among others to format the `/dist` folder to be compiled using phonegap.

`gulp watch` is used to speed up development time. This task sets up a server at `localhost:8000`. Navigate to `localhost:8000` in your browser and refresh whenever you make a change. If you have livereload installed ([chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) version) and you enable it, the page will automagically refresh whenever you make changes.
