const updateRecipeNameButton = document.getElementById("recipeSubmit");
updateRecipeNameButton.addEventListener('click', updateRecipeName);
function updateRecipeName(){

    let recipeNameInputValue = document.getElementById("recipeNameInput").value;
    if(recipeNameInputValue != ""){
        const word = recipeNameInputValue
        const firstLetter = word.charAt(0);
        const firstLetterCap = firstLetter.toUpperCase();
        const remainingLetters = word.slice(1);
        const capitalizedWord = firstLetterCap + remainingLetters

        document.getElementById("recipeName").innerHTML = capitalizedWord;
        document.getElementById("recipeNameInput").value = "";
    }else{
        alert("The recipe input does not have a value");
    }
};

const addIngredientButton = document.getElementById("ingredientSubmit");
addIngredientButton.addEventListener('click', addIngredient);
function addIngredient(){

    let ingredientName = document.getElementById("ingredientNameInput").value;
    let ingredientQuantity = document.getElementById("ingredientQuantityInput").value;
    let select = document.getElementById("ingredientMeasurementTypeSelect");
    let ingredientMeasurementType = select.value;

    let quantityCheck = false, nameCheck = false;
    let failureMessage = "";

    if(ingredientName != ""){
        
        nameCheck = true;
    }else{
        failureMessage += "The Ingredient name needs to have a value\n";
    }

    if(ingredientQuantity > 0){

        quantityCheck = true;        
    }else{

        failureMessage += "The quantity needs to be greater than 0";
    }

    if(quantityCheck && nameCheck){

        let table = document.getElementById("recipeTable");

        let row2 = document.createElement("tr");

        let ingredientNameCell = document.createElement("td");
        let ingredientQuantityCell = document.createElement("td");
        let ingredientMeasurementTypeCell = document.createElement("td");

        ingredientNameCell.className += 'col-6';
        ingredientQuantityCell.className  += 'col-2';
        ingredientMeasurementTypeCell.className  += 'col-4';

        ingredientNameCell.innerHTML = ingredientName;
        ingredientQuantityCell.innerHTML = ingredientQuantity;
        ingredientMeasurementTypeCell.innerHTML = ingredientMeasurementType;

        table.appendChild(row2);
        row2.appendChild(ingredientNameCell);
        row2.appendChild(ingredientQuantityCell);
        row2.appendChild(ingredientMeasurementTypeCell);

        document.getElementById("ingredientNameInput").value = ""
        document.getElementById("ingredientQuantityInput").value = ""
        select.selectedIndex = 0;
        
    }else{

        alert(failureMessage);
    }
};

