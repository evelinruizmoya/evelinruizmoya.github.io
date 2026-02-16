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
// **Simple For Loop**



// **Repetition with Condition**




// **Arrays**




// **Objects and Form Fields**





// **Objects and Form Fields pt. 2**




// **Changing Styles**




