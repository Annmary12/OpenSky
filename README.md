[![Netlify Status](https://api.netlify.com/api/v1/badges/7bcd64b0-c3b9-4e1d-89b5-458f888dc7cf/deploy-status)](https://app.netlify.com/sites/opensky/deploys)

# OpenSky
OpenSky is a free service, that shows a near-realtime information of all flights around the world

## Hosted Link
[OpenSky](https://opensky.netlify.com)

## Features
* Users can signin
* Users can view latest flights
* Users can view departing flights
* Users can view arriving flights
* Users can filter flights based on x time

## Technology Stack Used
* React a javascript library for building user interfaces
* Redux a predictable state container for javascript apps.
* Material UI

## Project Structure

```
├── src/
    ├── assets
    |   └── images
    |   └── scss
    ├── components
    │   └── AuthRoute.jsx
    |   └── Card.jsx
    |   └── Modal.jsx
    |   └── Table.jsx
    |   └── ...
    ├── constants
    │   └── action.js
    |   └── types.js
    ├── pages
    │   └── Home.jsx
    |   └── Login.jsx
    ├── routes.js
    ├── store
    │   └── modules
    |       └── auth.js
    |       └── states.js
    |       └── flights.js
    |       └── ...
    |   └── index.js
    |   └── rootReducer.js
    ├── utils
    │   └── getLatestFlights
    |   └── history
    |   └── http
    ├── App.js
    ├── App.test.js
    ├── index.js
```


## Setup

* Clone the repo

```sh
> $ git clone https://github.com/Annmary12/OpenSky.git
```

* Install dependencies by running

```sh
> $ npm install
```

## Running the app

To get the app up and running (and really see if it worked), run:

```sh
> $ npm start
```