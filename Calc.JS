var display = window.document.getElementById("screen");
var clickedDot = false;
var clickedOperation = "";
var prevNumber;
var didIClickedOperator = false;
var result;

function number(keyPressed) { 
    var displayValue = display.value;

    if (result === "Error") { 
        display.value = "0.";
        prevNumber = 0;
        didIClickedOperator = false;
        clickedOperation = "";
        clickedDot = false; // Ensure dot flag is reset
    }

    if (displayValue === "0." && !clickedDot) {
        display.value = keyPressed.toString() + ".";
        clickedDot = true;
    } else if (displayValue.length < 9 && displayValue.slice(0, 2) === "0." && clickedDot) { 
        display.value = displayValue + keyPressed.toString();
    } else if (displayValue.length < 9 && !clickedDot) {
        display.value = displayValue.slice(0, -1) + keyPressed.toString() + ".";
        clickedDot = true;
    } else if (displayValue.length < 9 && clickedDot) {
        display.value = displayValue + keyPressed.toString();
    }
}

function operator(operation) { 
    if (!didIClickedOperator) {  
        didIClickedOperator = true;
        prevNumber = parseFloat(display.value);
        clickedOperation = operation;
    }

    display.value = "0.";
    clickedDot = false;
}

function addDot() {
    clickedDot = true; // Ensure dot flag is set
}

function clear() {
    display.value = "0";
    prevNumber = 0;
    didIClickedOperator = false;
    clickedOperation = "";
    clickedDot = false; // Reset dot flag
}

function calculateResult() { 
    var currentDisplay = parseFloat(display.value); 
    if (didIClickedOperator) { 
        if (clickedOperation === '+') {
            result = prevNumber + currentDisplay;
        } else if (clickedOperation === '-') {
            result = prevNumber - currentDisplay;
        } else if (clickedOperation === '*') {
            result = prevNumber * currentDisplay;
        } else if (clickedOperation === '/') {
            if (currentDisplay === 0) { 
                result = "Error"; 
            } else {
                result = prevNumber / currentDisplay;
            }
        }

        didIClickedOperator = false;

        if (result === "Error") {
            display.value = result;
        } else {
            clickedDot = result.toString().includes(".");
            display.value = result.toString(); 
        }
        prevNumber = result;
    }
}
