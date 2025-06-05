const display = document.getElementById("disp");
const buttons = document.querySelectorAll("button");

let cur = "";
let prev = "";
let opr = null;

function updateDisplay() {
    display.textContent = cur || prev || "0";
}

function formatResult(result) {
    let str = result.toString();
    if (cur === "" && prev === "" && opr === null && display.textContent !== "0") {
        display.textContent = "0";
    }
    if (str.length > 10) {
        if (!Number.isInteger(result)) {
            str = result.toFixed(9).slice(0, 10); 
        } else {
            str = str.slice(0, 10);
        }
    }

    return str;
}

function compute() {
    const a = parseFloat(prev);
    const b = parseFloat(cur);
    let result;

    switch (opr) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
            if (b === 0) {
                result = "Error";
            } else {
                result = a / b;
            }
            break;
        default: return;
    }

    if (result === "Error") {
        cur = result;
    } else {
        cur = formatResult(result);
    }

    prev = "";
    opr = null;
}

buttons.forEach(button => {
    const value = button.id;

    button.addEventListener("click", () => {
        if (!isNaN(value)) {
            if (cur.length < 10) {
                cur += value;
            }
        } else if (value === ".") {
            if (!cur.includes(".") && cur.length < 9) {
                cur += ".";
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (cur === "") return;
            if (prev && opr) {
                compute();
            } else {
                prev = cur;
            }
            opr = value;
            cur = "";
        } else if (value === "=") {
            if (prev && opr && cur) {
                compute();
            }
        }

        updateDisplay();
    });
});
