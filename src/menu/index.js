const inquirer = require("inquirer");

const menu = async () => {
    let response = {};
    let options = [
        {
            key: 1,
            value: "1- agregar informacion personal"
        }, {
            key: 2,
            value: "2-agregar informacion nucleo familiar",
        }, {
            key: 0,
            value: "0- Salir"
        }
    ]
    let repeat = true;
    while (repeat) {
        console.log("_________________Menu____________________");
        options.forEach((item) => console.log(item.value))
        console.log("_________________Menu____________________");
        const questions = options.map((item) => item.key)
        const option = await getOption(questions);
        switch (option) {
            case "0":
                repeat = false;
                console.log("hasta luego");
                break;
            case "1":
                console.clear();
                response.personal = await personalInfo();
                console.clear();
                break;
                case "2":
                console.clear();
                response.family = await familyInfo();
                console.clear();
                break;
            default:
                console.clear();
                console.log("opcion no valida, ingrese una opcion valida")
                break;
        }
        options = options.filter((k)=>k.key !== Number(option))
    }
    return  response;
}


const optionsQuestions = [
    {
        type: "input",
        name: "name",
        message: "Ingrese su Nombre",
        validate: (name) => name !== "" || "El nombre es requerido"

    },
    {
        type: "input",
        name: "lastname",
        message: "Ingrese su Apellido"
    },
    {
        type: "number",
        name: "age",
        message: "Ingrese su edad",
        validate: (age) => !(Number.isNaN(age) || Number(age) <= 0) || "Edad no valida",
        filter: (age) => Number.isNaN(age) || Number(age) <= 0 ? '' : age
    }
]
const getOption = async (options) => {
    const prompts = [
        {
            type: 'input',
            name: 'value',
            message: 'Seleccione una opción',
            validate: (option) => !(Number.isNaN(option) || !options.includes(Number(option))) || "Opción no valida, por favor ingrese una opcion valida",
            filter: (option) => Number.isNaN(option) || !options.includes(Number(option)) ? '' : option
        },
    ]
    const answers = await inquirer.prompt(prompts)
    return answers.value
}



const personalInfo = async () => {
    console.log("1- agregar informacion personal");
    return await inquirer.prompt(optionsQuestions);
}

const familyInfo = async () => {
    const family = [];
    let repeat = true;
    do {
        const item = await inquirer.prompt([
            ...optionsQuestions,
            {
                type: "confirm",
                name: "parent",
                message: "¿Es pariente sangineo?",
            }
        ]);

        family.push(item)

        const exit = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "repeat",
                    message: "Desea agregar otro familiar?",
                },
            ]);
        ({ repeat } = exit )
        console.clear();
    }while (repeat)
    return  family;
}

module.exports = {
    menu
}


