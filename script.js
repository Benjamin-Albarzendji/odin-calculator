//Global values for the calculator
let value1 = "";
let value2 = "";
let pressCheck = "";
let calcOperator = "";
let toClear = 0;
let calculations = 0;

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
  let buttonContainer = document.querySelector(".mainbuttons");
  let childButtons = buttonContainer.querySelectorAll("button");
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

  //Checks if its a specialOperator
  specialOperatorCheck = isSpecialOperator(e);

  //Checks if its a specialOperator trying to work on nothing
  if (specialOperatorCheck && textContent === "") {
    return;
  }

  //Checks if a special operator has been chosen, to clear the field
  if (toClear !== 0) {
    if (specialOperatorCheck) {
      return;
    } else {
      toClear = 0;

      inputfield.textContent = "";
    }
  }

  //Decides if the specialOperator was an initial click or if to initiate calculation
  if (calculations === 0) {
    if (specialOperatorCheck && value1 === "") {
      value1 = textContent
      toClear = 1;
      return;

      //Decides if it's time to make a calculation on the first pair of values
    } 
    // else if (specialOperatorCheck && value1 !== "") {
    //   value2 = textContent;
    //   return calculate(value1, value2, calcOperator);
    // }
  }

//   if (calculations !== 0) {
//     if (specialOperatorCheck) {
//       value2 = textContent
//       return calculate(value1, value2, calcOperator);
//     }
//   }


//Handles "0" at the start. Allows only dot to follow, otherwise replaces it 
if (textContent === "0"){
    if (e === "."){
        inputfield.textContent += e;
        return
    }
    else {
        inputfield.textContent = e
        return
    }
}
  // Checks if a "dot" or "." has been input and handles that case
  if (e === "."){
    if (textContent.includes(".")){
        return
    }
  }

  //Inputs the digit if everything went well
  inputfield.textContent += e;
}

function isSpecialOperator(e) {
  //Grabs the inputfields
  let inputfield = document.querySelector("#current");
  let textContent = inputfield.textContent;
  let upperValue = document.querySelector("#previous");

    //Operator buttons
    let operatorButtonsContainer = document.querySelector(".col4");
    let operatorButtons = operatorButtonsContainer.querySelectorAll("button");

  //List of special operators
  let specialOperators = ["+", "-", "x", "/", "="];

  //Equal Button
  if (e === "=") {
    if (value1 !== "" && textContent !== "" && toClear === 0) {
      value2 = textContent;
      calculate(value1, value2, "");
      pressCheck = "";
      operatorButtons.forEach((button) => {
        //Restores all special operators to their default state
        button.id = "default";     
      });

      return true;
    }
  }
  //Disables the equal button when the toClear value is not 0, for correct behaviour.
  if (e === "=" && toClear !== 0) {
    return true;
  }


  //Checks for the remaining special operators that !== "="
  if (specialOperators.includes(e)) {
    //Does not  allow for special operators on a initial empty field
    if (textContent.length === 0 && value1 === "") {
      return true;
    }

    //Corrects the behaviour of spcecial operator button so it does not override the operator of an on-going calculation
    if (value1 !== "" && textContent !== "" && toClear === 0) {
        value2 = textContent;
      calculate(value1, value2, e)
      toClear = 1;
      operatorButtons.forEach((button) => {
        //Restores all special operators to their default state
        button.id = "default";
        if (e === button.value) {
          //Checks if the special operator was already clicked
          if (pressCheck === e) {
            button.id = "default";
            pressCheck = e;
          } else {
            button.id = "clicked";
            pressCheck = e;
            calcOperator = e;
          }
        }
      });
      return true;
    }

    //Makes sure only one special operator is active
    operatorButtons.forEach((button) => {
      //Restores all special operators to their default state
      button.id = "default";
      if (e === button.value) {
        //Checks if the special operator was already clicked
        if (pressCheck === e) {
          button.id = "default";
          pressCheck = "";
        } else {
          button.id = "clicked";
          pressCheck = e;
          calcOperator = e;
          upperValue.textContent = `${textContent} ${calcOperator}`;
        }
      }
    });

    return true;
  }

  // If not special operator
  return false;
}


function calculate(val1, val2, operator) {
    
    //The function calculates with calcOperator. The operator var is cosmetic
    let total = 0
    if (calcOperator === "-"){
        total = parseFloat(val1) - parseFloat(val2)
    }

    else if (calcOperator ==="+") {
        total = parseFloat(val1) + parseFloat(val2)
    }

    else if (calcOperator ==="/"){
        total = parseFloat(val1) / parseFloat(val2)
    }

    else {
        total = parseFloat(val1) * parseFloat(val2)
    }
    
  
//Checks if int or float
  if (parseInt(total)){
    total = parseInt(total)
  }

  //Limits the decimal numbers if float
  else {
    
    total = total.toFixed(3)
  }
  
  let inputfield = document.querySelector("#current");
  let upperValue = document.querySelector("#previous");
  inputfield.textContent = total;
  upperValue.textContent = `${total} ${operator}`;
  value1 = total;
  toClear = 1;
  calculations += 1;
}
