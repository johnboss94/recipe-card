const toggleRecipe = () => {
    const instructionsDiv = document.getElementById('instructions');
    instructionsDiv.classList.toggle('animate__animated');
    instructionsDiv.classList.toggle('animate__fadeInDown');
    instructionsDiv.classList.toggle('hidden');
};

const getData = async () => {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(function (response) {
        return response.json();
    }).then(function (data) {
        const meal = data.meals[0];
        console.log({ meal });

        // Meal name
        // Category
        // Image
        // ingredients and measurements
        // cooking instructions
        // link to original recipe
        // tags

        document.getElementById('mealName').innerHTML = meal.strMeal;
        document.getElementById('mealCategory').innerHTML = meal.strCategory;
        document.getElementById('mealImage').src = meal.strMealThumb;
        document.getElementById('mealInstructions').innerHTML = meal.strInstructions;
        // document.getElementById('mealLinkToOriginalRecipe').href = meal.strSource;

        // Ik heb de ingredients en meaurements in stappen gedaan. Ik probeerde het eerst allemaal tegelijk te doen, maar dat gaf niet het gewenste resultaat. Plus, dit is veel duidelijker om te lezen, wel helaas meer code dan nodig heb ik het idee.

        var ingredients = [];
        var measurements = [];
        var ingredientsAndMeasurements = [];

        for (const [name, val] of Object.entries(meal)) {
            if (name.startsWith('strIngredient') && varIsnotEmpty(val)) {
                ingredients.push(val);
            }

            if (name.startsWith('strMeasure') && varIsnotEmpty(val)) {
                measurements.push(val);
            }
        }


        var listItemsHtml = '';
        ingredients.map((ing, index) => {
            if (measurements[index] !== '') {
                ingredientsAndMeasurements.push(`${ing} (${measurements[index].trim()})`);
            }
        });

        ingredientsAndMeasurements.map((ing, index) => {
            if (index === ingredientsAndMeasurements.length - 1) {
                listItemsHtml = listItemsHtml + `${ing}.`;
            } else {
                listItemsHtml = listItemsHtml + `${ing}, `;
            }
        });

        document.getElementById('mealIngredientsAndMeasurements').innerHTML = listItemsHtml;
        console.log(meal.strTags);

        const mealTags = meal.strTags;

        if (varIsnotEmpty(mealTags)) {
            let tags = mealTags;

            // tags = 'test,test 2,testing 3,blah 4, hup 5';

            tags = tags.split(',');
            console.log(tags);
            let tagStr = '';
            tags.map((tag) => {
                const html = "<button class='btn--square-gray btn--tag'>#" + tag + "</button>"
                tagStr += html;
                return html;
            });

            document.getElementById('mealTags').innerHTML = tagStr;
        }

    })
        .catch(function (error) {
            if (error) {
                console.log(error);
            }
        });
}

try {
    getData();
} catch (e) {
    console.log(e);
}


const varIsnotEmpty = (val) => {
    return val !== '' && val !== null && val !== undefined;
};