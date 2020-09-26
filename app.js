const inquirer = require('inquirer');
inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        }
    ])
    .then(answers => console.log(answers));

// const fs = require('fs');
// // with this statement, the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
// const generatePage = require('./src/page-template.js');


// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

