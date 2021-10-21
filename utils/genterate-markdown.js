const fs = require('fs');

//recontextualize fs.writeFile to return a Promise
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if(err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Your README was created successfully!'
            });
        });
    });
}

module.exports = { writeFile };