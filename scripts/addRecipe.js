let ingredientRowCount = 0;
let populatedInputIngredientsRow = false;

let addIngredientButton = document.getElementById('addIngredientButton');
addIngredientButton.addEventListener('click', () => addIngredientRow());

let recipeSubmitButton = document.getElementById('recipeSubmit');
recipeSubmitButton.addEventListener('click', () => submitRecipe());


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

//After pressing the add Ingredient button on the ingredient table. 
//It will then populate a new row of selectable Ingredients.
//The selectable ingredients will be the ingredients that have already been added into the ingredients table.
//If you want to have different ingredients, you will need to first add in the ingredients using the ingredients page
//Once you add in the new ingredient, then you will have to delete the line for updating ingredients
//Then add in a line, it will then update the corresponding ingredient line.

function addIngredientRow(){

    let ingredientSelect = document.createElement('select');
    ingredientSelect.id = `ingredientSelect-${ingredientRowCount}`;
    ingredientSelect.classList += "form-select col-6";
    ingredientSelect.ariaLabel = "Default select example";
    ingredientSelect.placeholder = "Ingredient";

    fetch('http://hennenapi.com:3000/api/Ingredient')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to retrieve ingredients');
        }
    })
    .then(ingredients => {
    
        for(let x = 0; x < ingredients.length; x++){

            ingredientSelect.innerHTML += `<option value ="${ingredients[x].id}">${ingredients[x].name}</option>\n`;
        }
        console.log(ingredients); // Process the retrieved ingredients
    })
    .catch(error => {
        console.error('Error retrieving ingredients:', error);
    });

    let inputQuantity = document.createElement('input');
    inputQuantity.type = "number";
    inputQuantity.id = `ingredientQuantityInput-${ingredientRowCount}`;
    inputQuantity.placeholder = 'Quantity';

    let selectOptions = [
        "Teaspoon (tsp)",
        "Tablespoon (tbsp)",
        "Fluid ounce (fl oz)",
        "Cup",
        "Pint",
        "Quart",
        "Gallon",
        "Liter (ml)",
        "Pound (lb)",
        "Ounce (oz)",
        "Gram (g)",
        "Kilogram (kg)",
        "Pcs",
    ]

    let ingredientMeasurementLabelSelect = document.createElement('select');
    ingredientMeasurementLabelSelect.id = `ingredientMeasurementTypeSelect-${ingredientRowCount}`;
    ingredientMeasurementLabelSelect.classList += "form-select";
    ingredientMeasurementLabelSelect.ariaLabel = "Default select example";
    ingredientMeasurementLabelSelect.placeholder = "Ingredient Measurement";

    ingredientMeasurementLabelSelect.innerHTML =`\n`;
    for(let x = 0; x < selectOptions.length; x++){

        ingredientMeasurementLabelSelect.innerHTML += `<option value ="${selectOptions[x]}">${selectOptions[x]}</option>\n`;
    }



    let ingredientDeleteButton = document.createElement('button');
    ingredientDeleteButton.id = `ingredientDeleteButton-${ingredientRowCount}`;
    ingredientDeleteButton.className += 'btn-close';
    ingredientDeleteButton.addEventListener('click', deleteIngredient);


    let table = document.getElementById("recipeTable");
    let tbody = table.getElementsByTagName('tbody')[0];
    let addIngredientRow = document.getElementById('addIngredientRow');

    let newRow = document.createElement("tr");
    newRow.id = `row-${ingredientRowCount}`;



    let ingredientNameCell = document.createElement("td");
    ingredientNameCell.id = `ingredientNameCell-${ingredientRowCount}`;
    let ingredientQuantityCell = document.createElement("td");
    ingredientQuantityCell.id = `ingredientQuantityCell-${ingredientRowCount}`;
    let ingredientMeasurementCell = document.createElement("td");
    ingredientMeasurementCell.id = `ingredientMeasurementCell-${ingredientRowCount}`;
    let ingredientActionCell = document.createElement('td');
    ingredientActionCell.id = `ingredientActionCell-${ingredientRowCount}`;

    ingredientNameCell.className += 'col-6';
    ingredientQuantityCell.className  += 'col-1';
    ingredientMeasurementCell.className  += 'col-4';
    ingredientActionCell.className += 'col-1 text-center align-center';

    ingredientNameCell.appendChild(ingredientSelect);
    ingredientQuantityCell.appendChild(inputQuantity);
    ingredientMeasurementCell.appendChild(ingredientMeasurementLabelSelect);
    // ingredientActionCell.appendChild(ingredientSaveButton);
    ingredientActionCell.appendChild(ingredientDeleteButton);

    newRow.appendChild(ingredientNameCell);
    newRow.appendChild(ingredientQuantityCell);
    newRow.appendChild(ingredientMeasurementCell);
    newRow.appendChild(ingredientActionCell);

    tbody.insertBefore(newRow, addIngredientRow);

    populatedInputIngredientsRow = true;
    ingredientRowCount++;
}


//This just takes the event of the delete ingredient button
//Then deletes the whole row and all of the row's children.
//It is able to find all contents through the format "Row-id" for the row number.
function deleteIngredient(event){

    let button = event.target;
    let buttonID = button.id;
    let row = buttonID.split('-')[1];

    let rowToRemove = document.getElementById(`row-${row}`);

    const table = document.getElementById("recipeTable");
    const tbody = table.getElementsByTagName('tbody')[0];
    console.log(tbody);
    console.log(rowToRemove);
    tbody.removeChild(rowToRemove);
}

function submitRecipe(){

    let ingredients = [];
    const recipeName = document.getElementById('recipeInput').value;
    const recipeDescription = document.getElementById('recipeDescriptionText').value;

    

    let table = document.getElementById('recipeTable');
    let rows = table.getElementsByTagName('tr');
    console.log(rows);

    for(let x = 0; x < rows.length; x++){

        
        let rowId = rows[x].id.split('-')[0];

        if(rowId === "row"){

            console.log(rows[x]);
            let columns = rows[x].childNodes;

            let ingredientSelect = columns[0].firstChild;
            
            let ingredientId = ingredientSelect.value;
            let ingredientName = ingredientSelect[ingredientSelect.selectedIndex].textContent;
            console.log(ingredientId);
            console.log(`ingredientName: ` + ingredientName);

            let ingredientQuantity = columns[1].firstChild.value;
            console.log(ingredientQuantity);

            let measurementType = columns[2].firstChild.value;
            console.log(measurementType);

            let ingredient = {
                id: ingredientId,
                name: ingredientName,
                quantity: ingredientQuantity,
                measurement: measurementType
            };

            ingredients.push(ingredient);

        }
    }

    const recipe = {
        name: recipeName,
        description: recipeDescription,
        quantity: '0',
        measurement: 'Lbs',
        ingredients: ingredients
    }

    fetch('http://hennenapi.com:3000/api/recipes', {
 
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ 

            recipe: recipe
        })
    })
    .then((response) => response.json())
    .then((recipe) => {
      console.log("Recipe added successfully:", recipe);
    })
    .catch((error) => {
      console.error("Error adding recipe:", error);
    });
        

}

