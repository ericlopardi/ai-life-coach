const logInfo = (message) => {
    console.log(`(INFO) ${new Date().toISOString()} - ${message}`);
}

const logError = (message) => {
    console.log(`(ERROR) ${new Date().toISOString()} = ${message}`);
}

module.exports = { logInfo, logError }