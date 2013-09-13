# Bornout

A DensityDesign app to do things.



## Install

**NOTE:** You need to have node.js, mongodb.

  	$ git clone https://github.com/densitydesign/bornout.git
  	$ npm install
  	$ npm start

Then visit [http://localhost:3000/](http://localhost:3000/)

Create

	$ mkdir data
	$ mongod --dbpath data


## Directory structure
```
-app/
  |__controllers/
  |__models/
  |__mailer/
  |__views/
-config/
  |__routes.js
  |__config.js
  |__passport.js (auth config)
  |__imager.js (imager config)
  |__express.js (express.js configs)
  |__middlewares/ (custom middlewares)
-public/
```

	
	models
	includes
		head // HTML <head>
		header

## Structure

### Models
### Controllers
### Views


## Data model

###Section


	{
		title : { type : 'String', default : 'Untitled' },
		description : { type : 'String, default : '' },
		index : { type : 'Number', default : 0 }
	}
	

###Chapter


	{
		title : { type : 'String, default : 'Untitled' },
		description : { type : 'String, default : '' },
		section: { type : Schema.ObjectId, ref : 'Section' },
		protocol : { type : 'String, default : '' },
		index : { type : 'Number', default : 0 }
	}

###Visualization

	{
		title : { type : 'String, default : 'Untitled' },
		description : { type : 'String, default : '' },
		chapter: { type : Schema.ObjectId, ref : 'Chapter' },
		content : { type : 'String, default : '' },
		legend : { type : 'String, default : '' },
		createdAt  : {type : Date, default : Date.now},
		index : { type : 'Number', default : 0 }
	}
