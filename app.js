const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function managerInfo(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the Manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?"
        }
    ])
    .then(function(answers){
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);

        addTeam();
    })
}

function addTeam(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "addMember",
            message: "Do you want additional members on this team?"
        }
    ])
    .then(function(answers){
        if (answers.addMember){
            inquirer.prompt([
                {
                    type: "list",
                    name: "nextRole",
                    choices: ["Engineer", "Intern"],
                    message: "Please choose from the following:"
                }
            ])
            .then(function(answers){
                let newRole, extraRoleInfo;
                if (answers.nextRole === "Engineer"){
                    newRole = "Engineer";
                    extraRoleInfo = "Github username";
                } else {
                    newRole = "Intern";
                    extraRoleInfo = "school name";
                }
                inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: `What is the ${newRole}'s name?`
                    },
                    {
                        type: "input",
                        name: "id",
                        message: `What is the ${newRole}'s ID?`
                    },
                    {
                        type: "input",
                        name: "email",
                        message: `What is the ${newRole}'s email?`
                    },
                    {
                        type: "input",
                        name: "extraInfo",
                        message: `What is the ${newRole}'s ${extraRoleInfo}?`
                    }
                ])
                .then(function(answers){
                    if (newRole === "Engineer"){
                        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.extraInfo);
                        employees.push(engineer);
                    } else {
                        let intern = new Intern(answers.name, answers.id, answers.email, answers.extraInfo);
                        employees.push(intern);
                    }

                    addTeam();
                })
            })
        } else {
            return render(employees);
        }
    })
    .then(function(response){
        fs.writeFileSync(outputPath, response);
    })
}

managerInfo();