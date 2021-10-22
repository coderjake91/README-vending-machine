const inquirer = require('inquirer');
const generateREADME = require('./src/README-template');
const { writeFile } = require('./utils/genterate-markdown');

//mock README data to test app
const mockData = {

}

const collectREADMEInfo = () => {

    console.log(`
    =======================================
     Welcome to the README Vending Machine
    =======================================

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
            name: 'authorName',
            message: 'What is your github profile name? (Required)',
            validate: nameInput => {
                if(!nameInput) {
                    console.log('Please enter your github profile name!');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'projectRepo',
            message: "What is the project's github repository name? (Required)",
            validate: repoName => {
                if(!repoName) {
                    console.log('Please enter your github repository name!');
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
            message: 'Please provide instructions for app use (Required).',
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
            name: 'confirmScreenshot',
            message: 'Would you like to include a screenshot for your applicaion?',
            default: true,
        },
        {
            type: 'input',
            name: 'screenshot',
            message: 'You can also include a screenshot to your README by adding the screeshot to the ./assets/images/ folder in the application directory (Please input the ENTIRE file name including the file extension...example: myImage.jpg, IMPORTANT: complete adding the screenshot to the directory now before completing the other prompts',
            when: ({confirmScreenshot}) => {
                if(confirmScreenshot){
                    return true;
                } else {
                    return false;
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
            name: 'testInfo',
            message: 'Please provide your app testing information:',
            when: ({confirmTesting}) => {
                if(confirmTesting){
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'authorEmail',
            message: 'Please provide an email that you would like to be contacted at for additional app/contribution questions (Required)',
            validate: email => {
                if(!email){
                    console.log('Please enter an email for your questions section!');
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]);
}

const collectContributors = (infoREADME) => {
    
    if(!infoREADME.contributors) {
        infoREADME.contributors = [];
        loopMessage = 'a contributor';
    } else {
        loopMessage = 'another contributor'
    }

    return inquirer.prompt([
        //prompt user for their contributors to the project (confirm if they want to keep adding)
        {
            type: 'confirm',
            name: 'confirmContributor',
            message: `Would you like to add ${loopMessage} to your project?`,
            default: true
        },
        {
            type: 'input',
            name: 'profileName',
            message: "Please enter the contributor's github profile name",
            when: ({confirmContributor}) => {
                if(confirmContributor){
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then(contributor => {
        //append each contributor to the infoREADME.contributors array, then call collectContributors again (if confirm === true)
        infoREADME.contributors.push(contributor);
        if(contributor.confirmContributor){
            return collectContributors(infoREADME);
        } else {
            return infoREADME;
        }
    });
}

collectREADMEInfo()
    .then(collectContributors)
    .then(infoREADME => {
        return generateREADME(infoREADME);
        //return JSON.stringify(infoREADME);
    })
    .then(markdown => {
        return writeFile(markdown);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
    })
    .catch(err => {
       console.log(err); 
    });