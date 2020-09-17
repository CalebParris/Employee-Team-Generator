const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
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
        console.log(answers);
        
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);
        console.log(employees);

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
        console.log(answers);
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
                console.log(answers);
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
                    console.log(newRole);
                    console.log(answers);
                    if (newRole === "Engineer"){
                        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.extraInfo);
                        employees.push(engineer);
                        console.log(employees);
                    } else {
                        let intern = new Intern(answers.name, answers.id, answers.email, answers.extraInfo);
                        employees.push(intern);
                        console.log(employees);
                    }

                    addTeam();
                })
            })
        } else {
            console.log(employees);
            render(employees);
            return false;
        }
    })
}

managerInfo();