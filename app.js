const inquirer = require('inquirer');
inquirer
const promptUser = () => {
    // the promptUser function returns a Promise from the return, which is resolved with the .then()
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            // this validates that the user has entered a name
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself in an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            // this is called if the default in confirmAbout remains true, this allows us to write conditional code based on the user answers
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

// adding the portfolioData argument we can add project data to the argument variable and then call the function with the modified data
const promptProject = portfolioData => {
    // if there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        // this initializes the portfolioData argument as an empty array (if the projects array is set to an empty array in every function call, it would erase all the project data we collect) it needs the 'false if' statement above. 
        portfolioData.projects = [];
        console.log(`
    }
=================
Add a New Project
=================
    `);
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: projectInput => {
                    if (projectInput) {
                        return true;
                    } else {
                        console.log('Please enter your project name!')
                        return false
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log('Please enter a description of your project!')
                        return false
                    }
                }
            },
            {
                // checkbox gives a list of answers to choose, multiple choice. Can also use the 'choices' option.
                type: 'checkbox',
                name: 'languages',
                message: 'What did you build this project with? (Check all that apply)',
                choices: ['JavaScript', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node',]
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the GitHub link to your project. (Required)',
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log('Please enter your GitHub link!')
                        return false
                    }
                }
            },
            {
                // boolean, yes or no answer
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }

        ])
            // this allows to add another project
            .then(projectData => {
                portfolioData.projects.push(projectData);
                // this condition will call the promptProject(portfolioData) function when confirmAddProject evaluates to true. the response is captured in the answer object, 'projectData' in the property 'confirmAddProject'
                if (projectData.confirmAddProject) {
                    return promptProject(portfolioData);
                    // this will trigger if user does not want to add more projects and portfolioData is returned
                } else {
                    return portfolioData;
                }
            });
    };
};
// the Promise is resolved by this .then() method with whatever we wish to take place after the Promise is resolved, which is appended to the function call, this allows the function to prompt the user
promptUser()
    // .then(answers => console.log(answers))
    .then(promptProject)
    // .then(projectAnswers => console.log(projectAnswers));
    .then(portfolioData => {
        console.log(portfolioData);
    });

// const fs = require('fs');
// // with this statement, the object in the module.exports assignment will be reassigned to the generatePage variable in the app.js file
// const generatePage = require('./src/page-template.js');


// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

