const { menu } = require("./menu")
const createFile = require("./files")
var path = require('path');
const init = async () =>{
    response = await menu();
    if (Object.keys(response).length > 0){
        const route =`${path.resolve(__dirname)}/info/${response.personal.name}_${response.personal.lastname}`
        createFile(response,route)
    }
}
init();

