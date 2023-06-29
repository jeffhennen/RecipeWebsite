let p = $('#test');
let div = $('.my-class');
let ul = $('ul');

console.log(p);
console.log(div);
console.log(ul);

console.log(p.text());
p.text('New Text');
console.log(p.text);

div.prepend('<p>prepended paragraph</p>');
div.append('<p>Appended paragraph</p>');
div.before('<p>paragraph that was added before the div</p>');
div.after('<p>Paragraph that was added after the div</p>');
div.empty();
ul.remove();

let image_input = document.querySelector("#image_input");
var uploaded_image = "";
$('#image_input').on('change', () => {

  console.log(image_input.value);
  const reader = new FileReader();
  reader.addEventListener('load', () => {

    uploaded_image = reader.result;
    document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(image_input.files[0]);
});



$('input').hide();
setTimeout(() => $('input').show(), 2000);

function fetchData() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'http://hennenapi.com:3000/api/recipes',
        method: 'GET',
        success: function(data) {
          resolve(data); // Resolve the promise with the data
        },
        error: function(error) {
          reject(error); // Reject the promise with the error
        }
      });
    });
}

fetchData().then(function(data){

    let recipes = document.createElement('div');
    recipes.className = 'row justify-content-center pt-3';
    recipes.id = 'recipesContainer';
    $('#mainContainer').append(recipes);
    for(let x = 0; x < data.length; x++){

        
        createRecipeCard($('#recipesContainer').append(createRecipeCard(data[x])));

    }
});

function createRecipeCard(recipe){

    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer col-md-3 ms-3 me-3';

    let image = document.createElement('img');
    image.src = ""

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h5');
    title.innerText = recipe.name;
    title.className = 'card-title text-center';

    let text = document.createElement('p');
    text.innerHTML = `${recipe.quantity} ${recipe.measurement}<br>${recipe.description}`;
    text.className = 'card-text text-center'

    let link = document.createElement('a');
    link.href = '#';
    link.className = 'stretched-link';

    
    
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(link);
    card.appendChild(cardBody);


    return card;
}

let initListOfTasks = () => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-container');
    tasks.forEach((task) => {
        createTaskCard(task);
    });
};

initListOfTasks();