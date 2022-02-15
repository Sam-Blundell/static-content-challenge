
# Static Content challenge

**MVP for simple content management system**

This project is a Node.js application that maps content files in a directory structure to corresponding url endpoints and serves them via express.js.
The content files are written in markdown and are converted to HTML and embedded within a template HTML file before being served.
A user can automatically create new endpoints simply by adding new markdown files to the content directory structure.

## Filesystem and url endpoint examples:

    .
    ├── ...
    ├── content
    │   │── about-page
	│   │	└── index.md			# /about-page
    │   ├── blog
	│   │	└── june
	│   │		└── company-update
	│   │			└── index.md	# /blog/june/company-update
    │   ├── jobs
	│   │	└── index.md			# /jobs
    │   ├── valves
	│   │	└── index.md			# /valves
    │   └── ...
    └── ....

## Deployed example:

There is a live version of this application hosted on Heroku that includes the default endpoints listed in the example above.  

**Links:**  
[About page](https://static-content-challenge.herokuapp.com/about-page)  
[Company update page](https://static-content-challenge.herokuapp.com/blog/june/company-update)  
[Jobs page](https://static-content-challenge.herokuapp.com/jobs)  
[Valves page](https://static-content-challenge.herokuapp.com/valves)  

### Setup

Node is required to setup and run this application.  
It was built on node v16.14.0 but should work with previous versions too as long as they're relatively recent.  
You can check your node version with  
```node -v```.  

To get started clone this repository to your machine and navigate to the repository directory.  
Install listed dependencies with the command ```npm i```  
Run the application with the command ```npm start```  

Dependencies:
* express v4.17.2
* marked v4.0.12
* mustache v4.2.0

## Testing

Once the setup is completed the tests can be run with ```npm test```.

The tests do not depend on any existing content directory structure and will run a variable number of tests depending on the number of markdown files in the content folder.
The tests currently cover checking for appropriate status codes and content for all valid endpoints as well as appropriate status codes in the event of an invalid endpoint.


### Testing dependencies:

* chai  v4.3.6
* mocha v9.2.0
* supertest v6.2.2
