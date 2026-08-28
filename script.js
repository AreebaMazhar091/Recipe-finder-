async function searchRecipes() {

    const meal = document.getElementById("searchInput").value.trim();
    const recipes = document.getElementById("recipes");
    const message = document.getElementById("message");

    if (meal === "") {
        message.textContent = "Please enter a meal name.";
        recipes.innerHTML = "";
        return;
    }

    message.textContent = "Searching...";
    recipes.innerHTML = "";

    try {

        const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s="
            + encodeURIComponent(meal)
        );

        const data = await response.json();

        if (!data.meals) {
            message.textContent = "No recipes found.";
            return;
        }

        message.textContent =
            data.meals.length + " recipe(s) found.";

        data.meals.forEach(function(recipe) {

            let ingredients = "";

            // Get ingredients and measurements
            for (let i = 1; i <= 20; i++) {

                const ingredient = recipe["strIngredient" + i];
                const measure = recipe["strMeasure" + i];

                if (ingredient && ingredient.trim() !== "") {

                    ingredients += `
                        <li>
                            ${measure} ${ingredient}
                        </li>
                    `;
                }
            }

            recipes.innerHTML += `

                <div class="col-md-6 col-lg-4 mb-4">

                    <div class="card h-100 shadow-sm">

                        <img
                            src="${recipe.strMealThumb}"
                            class="card-img-top"
                            alt="${recipe.strMeal}"
                        >

                        <div class="card-body">

                            <h4 class="card-title">
                                ${recipe.strMeal}
                            </h4>

                            <p>
                                <strong>Category:</strong>
                                ${recipe.strCategory}
                            </p>

                            <p>
                                <strong>Cuisine:</strong>
                                ${recipe.strArea}
                            </p>

                            <h5>Ingredients</h5>

                            <ul>
                                ${ingredients}
                            </ul>

                            <h5>Instructions</h5>

                            <p>
                                ${recipe.strInstructions}
                            </p>

                        </div>

                    </div>

                </div>

            `;
        });

    } catch (error) {

        message.textContent =
            "Something went wrong. Please try again.";

        console.log(error);
    }
}
