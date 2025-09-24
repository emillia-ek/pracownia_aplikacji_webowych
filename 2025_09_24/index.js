
const grades = [6,1,4];

function showGrades() {
    if (grades.length === 0) {
        console.log("You dont't pass the class since you have no grades");
    } else {
        for (let i = 0; i < grades.length; i++) {
            console.log(`grade ${i + 1}: ${grades[i]}`);
        }
    }
}
function calcAverage() {
    if (grades.length === 0) {
        console.log("no grades to calculate = no pass the class");
        return;
    }
    let sum = 0;
    for (let g of grades) {
        sum += g;
    }
    const avg = sum / grades.length;
    console.log(`average: ${avg.toFixed(2)}`);
}

const readline = require("node:readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function showMenu() {
    console.log("\nproVulcan (nie ma aktualizacji o połnocy wiec sie nie zawiesza:");
    console.log("1. show grades");
    console.log("2. calc average");
    console.log("3. add grade");
    console.log("4. exit");

    rl.question("choose option: ", (opt) => {
        switch (opt) {
            case "1":
                showGrades();
                break;
            case "2":
                calcAverage();
                break;
            case "3":
                rl.question("enter grade (1-5): ", (g) => {
                    const grade = parseInt(g);
                    if (grade >= 1 && grade <= 5) {
                        grades.push(grade);
                        console.log(`added grade: ${grade}`);
                    } else {
                        console.log("wrong grade");
                    }
                    return showMenu();
                })
                return;
            case "4":
                console.log("Ciao :D");
                rl.close();
                return;
            default:
                console.log("invalid option");
        }
        showMenu();
    })
}

showMenu()