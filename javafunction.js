// Task 1: 
// The user clicked the Increase Counter button until the counter showed 27.  
// The "simple for loop" and "repetition with condition" behaved as described.

// declaring the counter.
let counter = 0;

function updateCount() {
  document.getElementById("counter").innerHTML = counter;
}

// **Simple Functions**
// counting up
function tickUp() {
    counter++;
    updateCount();
}

//counting down
function tickDown() {
    counter--;
    updateCount();
}

// **Simple For Loop**
function runForLoop() {
    let result = "";
    for (let i = 0; i <= counter; i++) {
    result += i + " ";
    }
    document.getElementById("forLoopResult").innerHTML = result;
}

// **Repetition with Condition**
function showOddNumbers() {
    let result = "";
    for (let i = 1; i <= counter; i++) {
        if (i % 2 !== 0) {
            result += i + " ";
        }
    }
    document.getElementById("oddNumberResult").innerHTML = result;
}


// Task 2
// **Arrays**
function addMultiplesToArray() {
    let arr = [];
    for (let i = counter; i >= 5; i--) {
        if (i % 5 === 0) {
            arr.push(i);
        }
    }
    console.log(arr);
}

// **Objects and Form Fields**

function printCarObject(){
    let carType = document.getElementById("carType").value;
    let carMPG = document.getElementById("carMPG").value;
    let carColor = document.getElementById("carColor").value;

    let carObject = {
        cType: carType,
        cMPG: carMPG,
        cColor: carColor
    };

    console.log(carObject);
}

// **Objects and Form Fields pt. 2**
function loadCar(num) {
    let car;
    if (num ===1) {
        car = carObject1;
    } 
    else if (num === 2) {
        car = carObject2;
    } 
    else if (num === 3) {
        car = carObject3;
  }

  document.getElementById("carType").value = car.cType;
  document.getElementById("carMPG").value = car.cMPG;
  document.getElementById("carColor").value = car.cColor;
}

// **Changing Styles**
function changeColor(choice){
    let styleParagraph = document.getElementById("styleParagraph");

    if (choice === 1) {
        styleParagraph.style.color = "red";
    } 
    else if (choice === 2) {
        styleParagraph.style.color = "green";
    } 
    else if (choice === 3) {
        styleParagraph.style.color = "blue";
    }
}