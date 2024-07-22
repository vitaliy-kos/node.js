const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'users.json');

function getUsersFromFile() {
    return JSON.parse(
        fs.readFileSync(usersFilePath, 'utf-8', (err) => {
            if (err) throw new Error('Error while reading file!');
        })
    );
}

function saveUsersFile(data) {
    fs.writeFileSync(usersFilePath, JSON.stringify(data), (err) => {
        if (err) throw new Error('Error while writing file!');
    }); 
}

module.exports = { getUsersFromFile, saveUsersFile }