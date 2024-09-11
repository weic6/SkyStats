# SkyStats

This project supports search flight delay history in U.S. in 2015, based on a previous group project in CS 411 [Course project](https://github.com/cs411-alawini/fa23-cs411-team067-Sparkling) at UIUC.

Data: [2015 US Transporation from Kaggle](https://www.kaggle.com/datasets/usdot/flight-delays.)

# Set up for this project

1. clone the github repository to your local computer
2. enter the subfolder flight-delay
3. start redis server
4. run `npm install` to install packages required for this project
5. run `npm index.js` to start the project
6. visit `localhost:3000/` in your browser and now you can explore it

# Todo

- [x] add Redis as a cache
- [ ] Re-configure the front end using React
- [ ] Add ORM to prevent SQL injection
- [x] Lump private info in .env file
- [ ] Since there are so many rows, try retrieve 20 rows at a time

# Miscellaneous

## TeamID-SampleProject

This is a template for CS411 project repository. Please make sure that your title follows the convention: [TeamID]-[YourTeamName]. All TeamID should have a three digit coding (i.e. if you are team 20, you should have `team020` as your ID.). You should also make sure that your url for this repository is [fa23-cs411-team000-teamname.git] so TAs can correctly clone your repository and keep them up-to-date.

Once you setup your project, please remember to submit your team formation to the team form.

### Permission

You should make sure you allow TAs to access your repository. You can add TA(s) as a collaborator to your repository.

### Preparing for your release

Eash submission should be in it's own [release](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases). Release are specific freezes to your repository. You should submit your commit hash on canvas or google sheet. When tagging your stage, please use the tag `stage.x` where x is the number to represent the stage.

### Keeping things up-to-date

You should make sure you keep your project root files up-to-date. Information for each file/folders are explained.

### Code Contribution

Individual code contribution will be used to evaluate individual contribution to the project.
