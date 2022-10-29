# Around the U.S. Back End
Previously, I worked on my "Around the U.S." project. I even connected it to a server once, thus comprehensively mastering the front end. However, all this time, one part of the project has remained behind the scenes: the server. This server can check tokens, save and return cards, and remember that a certain user has liked/unliked a card.

## 1.1. About current project
The projects of the back-end will focus on creating my own server for the "Around the U.S." project. While working on them, I'll learn how to work with databases, learn to set up security and testing, as well as how to deploy the back end on a remote machine. The goal of all this is to create a server with an API and user authentication..
## 1.2. Table of contents (TOC)
- [Around the U.S. Back End](#around-the-us-back-end)
  - [1.1. About current project](#11-about-current-project)
  - [1.2. Table of contents (TOC)](#12-table-of-contents-toc)
    - [1.2.1. Features](#121-features)
    - [1.2.2. Technologies and techniques used](#122-technologies-and-techniques-used)
  - [1.3. Directories](#13-directories)
  - [1.4. Running the Project](#14-running-the-project)
  - [1.5. Native Github Todo List for current Project](#15-native-github-todo-list-for-current-project)

### 1.2.1. Features
1) You can get API response about current user to fill in you profile
![Postman screenshot to showcase possible API Response](https://user-images.githubusercontent.com/41511242/188276224-e75d2e76-2df2-4f8d-ae4b-8cf79dba1692.png)
2) You also can get cards list
![Postman screenshot to showcase possible API Response to Request of all Cards](https://user-images.githubusercontent.com/41511242/188276423-c7b33928-518d-4b10-ab9e-afee57c70c17.png)
3) Userlist
![Postman screenshot to showcase possible API Response to Request of all Users](https://user-images.githubusercontent.com/41511242/188276341-a316640a-55db-4ae7-a2e9-590881cf5625.png)
4) Error pages
   1) 404 error page ![404 page screensot](https://user-images.githubusercontent.com/41511242/188276700-257ad915-a1ac-4e97-8e98-8c0ed593e746.png)
   2) 500 error page. Just trust me - it`s there. 

###  1.2.2. Technologies and techniques used
- Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.
- Airbnb JavaScript Style Guide() {. A mostly reasonable approach to JavaScript.
- Nodemon package installed to make the server restart when project files change in dev environment
- Project structure created
  
![Screen of files / directory structure](https://user-images.githubusercontent.com/41511242/188277090-3287fad4-905c-4f7b-ba62-a85d520314a0.png)
-  The fs module and its in-built method readFile() to access and manipulate the JSON data files used.
-  The path module will help us to get paths to the data files using the join() method. This method joins the specified path segments together and returns what's referred to as a normalized path. This is more reliable than using string concatenation, as paths are sometimes formed differently on different OSes.
-  Some aspproaches to Model–view–controller (MVC) used. MVC is a software architectural pattern commonly used for developing user interfaces that divide the related program logic into three interconnected elements. This is done to separate internal representations of information from the ways information is presented to and accepted from the user.
-  I tried to follow the most of ["Security best practices for Express applications in production"](http://expressjs.com/en/advanced/best-practice-security.html) - thanks to my respectable Reviewer  
## 1.3. Directories  
  
`/data` — JSON files to temporarily emulate database integration.  
  
`/routes` — routing files.  
  
All other directories are optional and may be created by the developer if necessary.   
  
## 1.4. Running the Project  
  
`npm run start` — to launch the server.  
  
`npm run dev` — to launch the server with the hot reload feature.  

`npm run lint` - to run linting

## 1.5. Native Github Todo List for current Project
- [x] Add the project's name to Readme.
- [x] Add TOC to Readme
- [x] Add a description of the project and its functionality to Readme
- [x] Add a description of the technologies and techniques used to Readme
- [x] Add pictures, GIFs, or screenshots that detail the project features to Readme 
- [ ] Add a video demo of my project (highly recommended) to Readme
- [ ] Apply [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
