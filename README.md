# Movie Database

Simple website that allows browsing and searching movie database provided by
http://www.omdbapi.com/ API.

Before getting access to all features user has to sign up and log in
(only standard sign up with password in supported by now).


## Available features are
* sign up and log in with password
* browse / search movie database by providing title
* display movie details
* browse / add / remove movie from favourites


## To do
* login via Google / Facebook


## Deployment

Project can be installed in local environment using Docker.
This setup is suitable only for development.

Required steps:

* clone repository to local folder:
  ```
  git clone https://github.com/dzejkobi/movie-database.git
  ```
  
* obtain an API key from: http://www.omdbapi.com/apikey.aspx

* enter into project directory:
  ```
  cd movie-database
  ```

* create `env.local` file in `./frontend` directory and set `VUE_APP_MOVIE_API_KEY` variable:
  ```
  printf "VUE_APP_MOVIE_API_KEY=YourApiKEY" > ./frontend/env.local
  ```

* run command:
  ```
  docker-compose up -d
  ```
  
* front-end app containing the website will be accessible via: http://localhost:8080
* back-end app with REST API and admin panel will be accessible via: http://localhost:8000

