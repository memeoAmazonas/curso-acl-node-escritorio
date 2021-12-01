const fs = require('fs'), path = require("path")
const createBody = require("./formatText")
const createFile = (data, route) =>{
    !fs.existsSync(route) && fs.mkdirSync(route);
    fs.writeFileSync(path.join(route,"info.html"), createBody(data),  (err)=> {
        if (err) throw err;
        console.log("archivo creado exitosamente");
    });
}

function existDirectory(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    //existDirectory(dirname);
    fs.mkdirSync(dirname);
}

module.exports = createFile;
