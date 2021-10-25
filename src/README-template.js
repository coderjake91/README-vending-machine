const generateTestSection = testResponse => {
    if(testResponse.confirmTesting){
        return `
${testResponse.testInfo}
        `;
    } else {
        return 'no current test method';
    }
}

const generateScreenshot = sections => {
    if(sections.confirmScreenshot){
        return `
## Screenshot

![Application Screenshot](./assets/images/${sections.screenshot})
        `;
    } else {
        return '';
    }
}

//generate README structure
module.exports = (infoREADME) => {

    const { contributors, ...otherSections } = infoREADME;
    console.log(contributors, otherSections);
    return `
    
# ${otherSections.project}
![GitHub top language](https://img.shields.io/github/languages/top/${otherSections.authorName}/${otherSections.projectRepo})

## License

![GitHub](https://img.shields.io/github/license/${otherSections.authorName}/${otherSections.projectRepo})

## Description
    
${otherSections.description}

${generateScreenshot(otherSections)}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Tests](#tests)
* [Questions](#questions)
    
## Installation

${otherSections.installation}

## Usage

${otherSections.usage}

## Credits
${contributors
.filter( ({ confirmContributor }) => confirmContributor)
.map(({ profileName }) => {
return `
*[@${profileName}](https://github.com/${profileName})
`;
})}

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Tests
${generateTestSection(otherSections)}

## Questions

Please send additional questions to [@${otherSections.authorName}](https://github.com/${otherSections.authorName}), email: ${otherSections.authorEmail}`;
}