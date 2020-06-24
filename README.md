## Description
  
This project is a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles


## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```
## Installation

First, run `npm install` to install all necessary dependencies.

This app runs as a Node CLI to gather information about each employee, so once installed, begin the application by running `node mysql.js`.


## Dependencies Used

* [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. 


## Minimum Requirements

* Functional application.

* GitHub repository with a unique name and a README describing the project.

* The command-line application should allow users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

## Video Example

[Click this link to see a video example of the working application]()

## Issues
The hardest part I had with this app was using join to join my tables together. I wasn't able to get the Update role to function due to this.