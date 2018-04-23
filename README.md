# Voting App

Create, share, vote.

## Prerequisites
Have PostgreSQL server & psql command line ready. 

## Installation

#### `Step 1` - clone the repo
  
```bash
$ git clone https://github.com/jtCodes/voting-app
```

#### `Step 2` - cd to db folder and create the postgressql database

```bash
$ cd voting-app/db
$ psql
(10.3, server 9.6.8)
Type "help" for help.

(user)=# \i createdb.sql
DROP DATABASE
CREATE DATABASE
psql (10.3, server 9.6.8)
You are now connected to database "anonvotedb" as user "(user)".
CREATE TABLE
CREATE TABLE
CREATE TABLE
anonvotedb=# \q
```
#### `Step 3` - cd back to the repo

```bash
$ cd ..
```
#### `Step 4` - install dependencies

```bash
$ npm install
```
#### `Step 5` - run application

```bash
$ npm run start
```

In browser, open [http://localhost:3000](http://localhost:3000)

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Nodejs](https://nodejs.org/en/docs/) - server framework used
* [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - front end component library used
* [Heroku](https://www.heroku.com) - for deployment

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Jiaan Tan**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
