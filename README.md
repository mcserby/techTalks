# README #

### Tech Talks repository ###

Prerequisites:

NodeJS - download online, comes with npm. It should be installed on the PATH, if not do this manually, so that you can run npm and node from all the folders.

Git - will be needed by some tools to download packages from online repositories (bower, npm)

SourceTree - a git client with a GUI, to spare us from command line commits.

A text editor for coding. I recommand Sublime Text 3.

MongoDB - download the appropriate version from mongoDB site. Gogo, I'm not sure how this works with XP...
! Important: for MongoDB to start I believe you have to create a folder structure: D:\data\db or C:\data\db . Again, not tested on Win XP. 

(Optional): cmder  (http://cmder.net/) - a command line tool a lot smarter than windows cmd (supports ctrl + c, ctrl + v, multiple tabs, window duplication, awesome fonts, transparency, etc. ). Set cmder.exe path in PATH variable, mine is c:\Program Files\cmder_mini\ . 

(Optional): TotalCommander - to easily navigate through file system, edit files, open cmder and so on.

That's it!




### Server ###

## Project Overview ##

"server" folder has 3 main files: package.json, index.js and Gruntfile.js

1. package.json: holds information about the "server" node module we are creating like versioning, module dependencies, main file, etc. This file is read by npm when you want to "install" this module and dependecies are downloaded from online repos. 

3. Gruntfile.js is a script that builds the project when build with grunt and can run tests and all sorts of stuff.

2. index.js is a javascript file that is the entry point to our backend. It's basically the server. At the end of the file you can find this code: 


	server.listen(3000, function () {
	  log.info('%s listening at %s', server.name, server.url);
	});

which starts the server (a process listening to the specified port (3000). ) when index.js file is run. The server is a "restify" object: 

	server = restify.createServer({
	  name : 'server',
	  log  : log
	});

Restify is a node module that helps us build a REST backend. In node, the modules are imported with the syntax: 
restify = require('restify');
This module (restify) must be installed locally by npm in order to be found (more on this later). 
Restify enable us do define actions when the user requests resources to different paths on our application:

// from /routes/index.js:
	
	server.get('/projects', projectOp.list);
	

## Startup ##

1. from the opened console, run "npm install" . - this will bring all the deps and install server module. 
you might have some warnings but that's probably due to some deprecated deps. Don't worry. The result of this command should be the creation of a folder called "node_modules" in /server. Here is where npm brought the deps specified in package.jon.

2. Start MongoDB:
cmder: right click on the console tab and go to Restart or Duplicate > Duplicate root. A new console tab will be opened. Navigate to c:\Program Files\MongoDB\Server\3.2\bin\ (or where you installed MongoDB, hint: copy the path from totalCmd by clicking on it) and type "mongod". This command starts the MongoDB database. The final line should be something like: waiting for connections on port 27017.

3. start the server.
Run "node index.js". This should start the server.
In mongoDB console you should see: connection accepted from 127.0.0.1:51452 #1 (1 connection now open).

4. Congratulations! you finished your server setup successfully!

### Client ###

## Overview ##

Client project is structured similarly, with the exception that there's no server to start, only a main script called "app.js" and an index.html file. The client is a SPA(Single Page Application), the page being the index.html, and the rest of the 'views' are loaded by angular framework as needed.
Another difference is the fact that we use another tool on the client called bower, to manage some client deps/libraries. This tool uses bower.json file. Bower will also install deps like npm, in the root of the project.

## Startup ##

1. run 'npm install' - node_modules should be populated with deps
2. run 'bower install' - this should create a folder bower_components with bower deps. (cmder failed to bring some deps so I used cmd here, and then switched back to cmder)
3. run "grunt clean build" - this builds the project (injects deps in index.html and creates a /dist folder with built artifacts)
4. run "grunt serve" - this will deploy the client on your default browser. You will see it happen.
5. Congrats! you have a running client, a running server, a running mongoDB... now start working on actual tasks!

Important: 

facebook login id:

'facebookConfigSettings', {'appID' : '1300607189956303'}


