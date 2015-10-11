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

## Building
To automate frontend development we use gulp. The gulp commands within app directory will process app resources. Commands include `gulp scripts` and `gulp styles`. The `gulp` command will start a server on localhost port 4240 that will host the preview and compile resources whenever you make changes. Normally you must refresh the page whenever you make a change, however if you have livereload installed ([chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) version) and you enable it, the page will automagically refresh whenever you make changes.
