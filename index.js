const inquirer = require('inquirer');
const generateREADME = require('./src/README-template');
const { writeFile } = require('./utils/genterate-markdown');

//mock README data to test app
const mockData = {

}

const collectREADMEInfo = () => {

    console.log(`
    ===================================
     Welcome to README Vending Machine
    ===================================

    Let's generate your project's custom README!
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name: 'project',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if(!nameInput) {
                    console.log('Please enter your desired project name!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provide a description of your project. (Required)',
            validate: description => {
                if(!description){
                    console.log('Please enter a description for your project!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Please provide some installation instructions for your app users...(Required)',
            validate: installation => {
                if(!installation){
                    console.log('Please enter installation instructions for your project!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: `Please provide instructions for app use (Required).
                      You can also include a screenshot to your README (if desired) by adding the screeshot
                      to the assets/images folder in the application directory`,
            validate: usage => {
                if(!usage){
                    console.log('Please enter usage instructions for your application!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmTesting',
            message: 'Would you like to include testing information for your applicaion?',
            default: true,
        },
        {
            type: 'input',
            name: 'about',
            message: 'Please provide your app testing information:',
            when: ({confirmTesting}) => {
                if(confirmTesting){
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
}

const collectContributors = (infoREADME) => {
    
    if(!infoREADME.contributors) {
        infoREADME.contributors = [];
    }

    return inquirer.prompt([
        //prompt user for their contributors to the project (confirm if they want to keep adding)
    ])
    .then(contributors => {
        //append each contributor to the infoREADME.contributors array, then call collectContributors again (if confirm === true)
    })
}