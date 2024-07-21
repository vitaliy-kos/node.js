const uuid = require('uuid');

function generateId() {
    const id = uuid.v4();
    console.log(id);
}

module.exports = { generateId }