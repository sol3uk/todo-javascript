/**
 * function isValidateTodoName(name)
 * @param {String} name The name of the todo
 * Returns true or false if the todo name is valid
 */
function isValidateTodoName(name) {
    const nameWithoutSpaces = name.trim();
    if (name.length >= 1 && nameWithoutSpaces.length >= 1) {
        return name;
    }
    return false;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}