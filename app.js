// for display meal item which user want to search
function displayMeal() {
    const searchInput = document.getElementById('search-input').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(res => res.json())
        .then(data => displayMealResult(data.meals));
}

// for display meal result
const displayMealResult = items => {
    let dataDisplay = '';

    if (items === null) {
        dataDisplay = `
            <div class="col off-5">
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Sorry!</strong> No meal found for you!!!!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
        `;

        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = dataDisplay;
        dataDisplay = '';
        document.getElementById('search-input').value = '';
    }
    else{
        items.forEach(item => {
            dataDisplay += `
                <div class="col-3">
                    <div class="card h-100" style="width: 300px;" onClick="mealDetails(${item.idMeal})">
                        <img src="${item.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body mealName">
                            <h3>${item.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `
        })
        
        document.getElementById("mealDetails").innerHTML = "";
        document.getElementById("searchResult").innerHTML = dataDisplay;
        dataDisplay = '';
        document.getElementById('search-input').value = '';
    }
}

// for unique meal details
const mealDetails = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => showMealDetails(data.meals[0]));
}

// for the details
const showMealDetails = meal => {
    
    let mealDetails = '';
    let ingredientList = '';
    const availableIngredients = [];

    for(let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        
        if(ingredient) {
            availableIngredients.push(ingredient);
        }
    }

    for(let i = 0; i < availableIngredients.length; i++) {
        ingredientList += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flexCheckDefault" checked>
                <label class="form-check-label" for="flexCheckDefault">${availableIngredients[i]}</label>
            </div>
        `
    }

    mealDetails = `
        <div class="row">
            <div class="col-4 offset-3">
                <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2>${meal.strMeal}</h2>
                        <h4>Ingredients</h4>
                        ` + ingredientList + `
                    </div>
                </div>
            </div>
        </div>
    `

    document.getElementById("mealDetails").innerHTML = mealDetails;
    mealDetails = '';
    ingredientList = '';
}