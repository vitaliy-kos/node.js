const uuid = require('uuid');

function generateId() {
    const id = uuid.v4();
    
    return id;
}

module.exports = { generateId }