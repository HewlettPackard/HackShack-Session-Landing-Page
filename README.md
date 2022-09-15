# Hack Shack landing site

[![Netlify Status](https://api.netlify.com/api/v1/badges/dbc62279-6354-4da8-9128-199e3ee80231/deploy-status)](https://app.netlify.com/sites/musing-kalam-f76e20/deploys)

Hackshack landing site and leaderboard app to display event details and player high scores during the event

## Getting Started

1. Clone repository 
  ```
  git clone git@github.com:HewlettPackard/HackShack-Session-Landing-Page.git
  ```
2. Install dependencies
  ```
  cd HackShack-Session-Landing-Page
  yarn install
  ```
3. rename .env.example to .env
  Make sure you update below 3 variables for workshops to work
  REACT_APP_WORKSHOPCHALLENGE_API_ENDPOINT=http://localhost:8082
  REACT_APP_USERNAME="" //add a user in DB
  REACT_APP_PASSWORD="" //base64 encoded password for the user in DB

4. Run application
  ```
  yarn start
  ```
  
### Development
1. Ensure `workshops_on_demand_server` is running 
clone the repo from https://github.com/hpe-dev-incubator/workshops_on_demand_server
Follow readME document to configure and run the workshops on demand application and database.
