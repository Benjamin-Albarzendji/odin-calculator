//Global values for the calculator
let value1 = 0;
let value2 = 0
let calcOperator = "";
let toClear = 0;
let calculations = 0

main();

//Function that initializes the calculator
function main() {
  //Adds eventListeners
  eventListeners();
}

function eventListeners() {
  // Eventlistener for keydown events
  window.addEventListener("keydown", (e) => {
    let keydownValue = document.querySelector(`[data-key ="${e.keyCode}"]`);
    if (keydownValue) {
      inputValue(keydownValue.value);
    }
  });
  //Eventlistener for click events
  buttonContainer = document.querySelector(".mainbuttons");
  childButtons = buttonContainer.querySelectorAll("button");
  childButtons.forEach((button) => {
    button.addEventListener("click", () => {
      inputValue(button.value);
    });
  });
}

//Function that adjusts the inputValue
function inputValue(e) {
  //Grabs the current inputfield values
  let inputfield = document.querySelector("#current");
  let textContent = inputfield.textContent;
  let upperValue = document.querySelector("#previous");
  
  //Checks if its a specialOperator
  specialOperatorCheck = isSpecialOperator(e);
  
  //Checks if its a specialOperator trying to work on nothing
  if (specialOperatorCheck && textContent ===""){
    return console.log("hello")
  }

  //Checks if a special operator has been chosen, to clear the field
  if (toClear !== 0) {
    toClear = 0;
    upperValue.textContent = `${textContent} ${calcOperator}`;
    inputfield.textContent = "";  
  }

  if (calculations === 0){
    console.log("maybe")
  //Decides if the specialOperator was an initial click or if to initiate calculation
  if (specialOperatorCheck && value1 === 0) {
    value1 = parseFloat(textContent);
    toClear = 1;
    return;

  } else if (specialOperatorCheck && value1 !== 0) {
    upperValue.textContent = `${textContent} ${e}`;
    value2 = parseFloat(textContent);
    return calculate(value1, value2, calcOperator);
  }
  }

  if (calculations !== 0){
    if (specialOperatorCheck)
    {
        console.log("wtf")
        value2 = parseFloat(textContent)
        return calculate(value1, value2, calcOperator);
    }


  }
  


  //     // Checks if a "dot" or "." has been input and handles that case
  //   } if (e === ".") {
  //     if (
  //       //Checks if there it's an empty inputfield or a special operator was the last entered value. Will not allow a "." then
  //       specialOperators.includes(textContent.charAt(textContent.length - 1)) ||
  //       textContent.length === 0
  //     ) {
  //       return;
  //       //Makes sure the "." character can only be added on either side of a special operator.
  //     } else if (textContent.includes(".")) {
  //       specialOperators.forEach((operator) => {
  //         if (textContent.includes(operator) === true) {
  //           let operatorIndex = textContent.indexOf(operator);
  //           let dotIndex = textContent.indexOf(".");

  //           if (operatorIndex > dotIndex) {
  //             let dotCount = textContent.split(".");
  //             if (dotCount.length < 3) {
  //               inputfield.textContent += e;
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       inputfield.textContent += e;
  //     }
  //   } else {
  inputfield.textContent += e;
  //   }
  // }
}

function isSpecialOperator(e) {
  //List of special operators
  let specialOperators = ["+", "-", "*", "/", "="];

  if (specialOperators.includes(e)) {
    //Makes sure only one special operator is active
    operatorButtonsContainer = document.querySelector(".col4");
    operatorButtons = operatorButtonsContainer.querySelectorAll("button");
    operatorButtons.forEach((button) => {
      //Restores all special operators to their default state
      button.id = "default";
      if (e === button.value) {
        //Checks if the special operator was already clicked
        if (calcOperator === e) {
          button.id = "default";
        } else {
          button.id = "clicked";
          calcOperator = e;
        }
      }
    });
    return true;
  }
  
  return false;
}

function calculate(val1, val2, operator) {
  total = val1 + val2;

  let inputfield = document.querySelector("#current");
  let textContent = inputfield.textContent;
  let upperValue = document.querySelector("#previous");
  let upperValueNumber = upperValue.textContent;
  inputfield.textContent = total;
  upperValue.textContent = `${val1} ${calcOperator} ${val2} = ${total}`
  value1 = total
  toClear = 1;
  calculations += 1;
  calcOperator = ""
}
