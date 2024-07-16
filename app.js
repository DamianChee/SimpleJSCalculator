/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let total = 0;
let current = 0;
let stringOfNumbers = "";
let operator = "";
let equalUsed = false;

/*------------------------ Cached Element References ------------------------*/

// Buttons
const allButtons = document.querySelectorAll(".button");
// Display
const display = document.querySelector(".display");
// My OCD issues
display.innerText = "0";

/*----------------------------- Event Listeners -----------------------------*/

for (btn of allButtons) {
  btn.addEventListener("click", (event) => {
    handleClick(event.target);
  });
}

/*-------------------------------- Functions --------------------------------*/

function calculate(num1, num2, operator) {
  if (operator === "+") return num1 + num2;
  else if (operator === "-") return num1 - num2;
  else if (operator === "*") return num1 * num2;
  else if (operator === "/") return num1 / num2;
  else return;
}

function changeDisplay() {
  display.innerText = current;
}

function handleClick(btn) {
  handleNumberButtons(btn);
  handleOperators(btn);
  handleEquals(btn);
}

/**
 * For numbers
 * 1.
 * If my stringOfNumbers is 0, don't add more 0s behind the string
 *
 * 2.
 * If I click a number after equals, start a new calculation
 * else add the number to the string
 *
 * 3.
 * Parse it and save into 'current'
 * Update/Render the changes of clicking a number
 */
function handleNumberButtons(btn) {
  if (btn.classList.contains("number")) {
    if (btn.innerText === "0" && stringOfNumbers === "0") return;
    if (equalUsed) {
      stringOfNumbers = btn.innerText;
      equalUsed = false;
    } else {
      stringOfNumbers += btn.innerText;
    }

    current = parseInt(stringOfNumbers);
    changeDisplay();
  }
}

/**
 * For operators
 * 1.
 * If C is clicked, reset everything
 *
 * 2a.
 * If any + - * / is clicked, check
 *   if it's (x + y) + z, where x + y = total, then calculate total + z
 *   Else if there is no total (0), use total to store current (which is parseInt(stringOfNumbers))
 *     In this case, x + y where x is now total, stringOfNumbers will now represent y
 *
 * 2b.
 * If equal was last 'operator' used, no need to bother x + y + z, there is only x + y
 *
 * 3.
 * Set equalUsed to false, as the last operator used is either C, +, -, * or /
 */
function handleOperators(btn) {
  if (btn.classList.contains("operator")) {
    if (btn.innerText === "C") {
      stringOfNumbers = "";
      total = 0;
      current = 0;
    } else if (
      btn.innerText === "+" ||
      btn.innerText === "-" ||
      btn.innerText === "*" ||
      btn.innerText === "/"
    ) {
      if (total !== 0 && !equalUsed) {
        current = calculate(total, parseInt(stringOfNumbers), operator);
        total = current;
        operator = btn.innerText;
        stringOfNumbers = "";
      } else {
        total = current;
        operator = btn.innerText;
        stringOfNumbers = "";
      }
    }

    equalUsed = false;
    changeDisplay();
  }
}

/**
 * For equals
 *
 * If equals is clicked while stringOfNumbers is nothing or 0, nothing should
 * happen
 *
 * If equals is clicked, perform calculation of x [operator] y,
 * Set total to current as a saved x value, in case user presses + - * / after
 * Set equalUsed to true for the other keys and use cases
 * Update display after calculation
 *
 * Side Effect: This means after I click e.g. 1 + 1, I can keep pressing equals
 *   to make my calculations keep + 1, so it becomes
 *   1 + 1 = 2
 *   2 + 1 = 3
 *   3 + 1 = 4... etc.
 */
function handleEquals(btn) {
  if (btn.classList.contains("equals")) {
    if (stringOfNumbers === "" || stringOfNumbers === "0") {
      console.log("You did an oopies, stringOfNumbers is blank!");
      return;
    }

    current = calculate(total, parseInt(stringOfNumbers), operator);
    total = current;
    equalUsed = true;

    changeDisplay();
  }
}
