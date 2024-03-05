//The improved copy of 2nd March, 2024 class lesson

/* 
Each Browser comes with a mini-storage called localStorage.
It's normally used to store some login credentials.
I use the localStorage to store and persist collected data. 
This is not a standard pracitce and it is not encouraged beyond mere practices.
The data is only stored on the used browser and can only be viewed by that particular browser.
If the browser is unstalled or it's storage is cleared, the data is gone forever.
For the fun of pracitce, let's store our data on localStorage.
After all, the information here is not useful or needed.
 */


//We get HTML section with the id "display-section".
//We name it container.
//Later container will be used to display the data.
const container = document.getElementById("display-section")

//The function below will be automatically called once the page loads.
//In this function, a function named customDataCollector is called.
//Therefore, this function will call customDataCollector automatically.
document.addEventListener('DOMContentLoaded', customDataCollector())

//customDataCollector function collects data from the form and stores it in the localstorage
function customDataCollector() {
    //We get our form and store in a variable named "feedbackForm"
    const feedbackForm = document.getElementById('feedbackForm');

    //We add event listener to our form so that once the submit button
    //is hit/clicked, it'll call the anonymous/nameless function.
    //Many processes take place in the anonymous function.
    feedbackForm.addEventListener('submit', function (event) {

        //This fubction stops the default behaviour of an HTML form.
        //It isn't really a big deal, as it won't break our codes if we
        //do not put it there but make sure you put it there.
        event.preventDefault()

        //We get form fields by their id's and store them in variables to be used later.
        const nameInput = document.getElementById("name")
        const emailInput = document.getElementById("email")
        const commentInput = document.getElementById("comment")


        //We get values (exact words the user enters into the form fields)
        //and trim away unnecessary white spaces
        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const comment = commentInput.value.trim()


        //We check whether the three fields are all filled.
        //"!" stands for "not/no" and "||" stands for "or".
        //So if no name or no email or no comment; 
        //the browser will alert the message "Please, fill out all fields" and return/break the process.
        //However, this will never happen because we've added "required" to each input field.
        //With required, the form will not even submit when a field is left unfilled.
        //To see the message, remove required from the three fields 
        //and then try to submit with one or more of the fields unfilled.
        if (!name || !email || !comment) {
            alert('Please fill out all fields.')
            return
        }


        //We combine name, email and comment into a single object.
        //We have the options of submitting the inputs one by one or
        //bind them into one bundle and submit at once.
        //Here using the curly braces, we bind them into one javascript object
        //and name the object feedbackData.
        const feedbackData = {
            name: name,
            email: email,
            comment: comment
        }

        //We try to get a data with the name 'Database' from the localStorage
        //Data from localStorage will be returned as a JSON object.
        const JSONdata = localStorage.getItem('Database')

        //JSON object is a bit different from javascript object and we need a javascript object now.
        //Therfore, we call a JSON function to convert the JSON object into javascript object.
        //The javascript object is given the name database
        const database = JSON.parse(JSONdata)

        //We don't really know whether 'Database' exists or not.
        //So we're checking if a data is returned from the localStorage or not.
        if (!database) {

            //If no data is returned from the localStorage,
            //maybe because the user is making a comment for the first time,
            //so the user has no record;
            //it creates an empty database, an empty array actually.
            const database = []

            //Using the javascript spread operator, we add feedbackData to the newly created 
            //database/array to produce a new array with one javascript object/feedbackData,
            //and sets the new array to a variable named feedbackDtabase2.
            const feedbackDatabase2 = [...database, feedbackData]



            //Remeber we have converted our database to javascript object.
            //However, we cannot return it like that to localStorage,
            //we have to convert it back to a JSON object.
            //JSON.stringify() does that for us.
            const JSONdatabase = JSON.stringify(feedbackDatabase2)

            //Now, we send it back to the localstorage.
            localStorage.setItem('Database', JSONdatabase)

        } else {
            //If database already exists,
            //because the user has made and stored, at least, a comment before;
            //we add the new feedbackData to the already exist database to create a new array 
            //named feedbackDatabase2
            const feedbackDatabase2 = [...database, feedbackData]

            //We stringify and return feedbackDatabase2 to the localstorage.
            //Note that the two steps have been combined into one. It's easier like this.
            localStorage.setItem('Database', JSON.stringify(feedbackDatabase2))

        }


        //By setting input fields to empty strings,
        //we cleaar them for another use in the future.
        nameInput.value = ''
        emailInput.value = ''
        comment.value = ''

        //We're done with collecting and saving the data.
        //Let's go to displaying the data.
    }
    )
}


//A function to get data from the localStorage and display them
function display() {

    //First, we try to get database from the localstorage.
    const database = localStorage.getItem('Database')

    //We're checking if database exists or not.
    //If it does not exist, there's nothing to display;
    //hence, it stops the entire process. No point going further.
    if (!database) {
        return
    }

    //Else,if database is returned from the localstorage,
    //we convert to it to a javascript object as usual.
    const objectDatabase = JSON.parse(database)


    //objectDatabase is an array/[] of javascript object/{}.
    //So objectDatabase looks like [{}, {}, {}, {}, {}].
    //We're going to loop through the content of objectDatabase, using map.
    //map is a javascript function that loops through an array
    //and performs a particular instruction/function on each item in the array.
    //We're going to call map and inside map we'll initiate an anonymous/nameless function.
    //We'll give eachObject from objectDatabase as a parameter to the anonymous function.
    //The anonymouse function will deliver eachObject to another function named customGenerator.
    //This is it: map will take the first object from objectDatabase 
    //and deliver it to the anonymous function,
    //the anonymous function will deliver it to customGenerator.
    //This process will continue until the last object in objectDatabase has passed through the same process.
    //Note that the entire objectDatabase/array is packed along with each object to customGeberator.
    //This is not compulsory but in our case, we're going to need something from the objectDatabase.
    //Also, note the name eachObject is given by me; you can give your own oneObject or anything.
    objectDatabase.map(
        function (eachObject) {
            return customGenerator(eachObject, objectDatabase)
        }
    )
}

//customGenerator will go and work on eachObject.
//But before going to customGenerator, let's for the sake of convenience, 
//create a function that can create any HTML element,add class and id to the element. 
//className and id are given empty strings as default value,
//in case no className or id is provided when the function is called,
// the empty string will be used. So only type is compulsory.
function customCreateElement(type, className = "", id = "") {

    //This will create an element (div, section, h1, p...) based on the given first parameter.
    const customElement = document.createElement(type)

    //This will add class to the element based on the second parameter.
    customElement.classList = className

    //This will add id to the element based on the third parameter.
    customElement.id = id

    //A fully-custom-made HTML element is returned.
    return customElement

}



//customGenrator receives eachObject and objectDatabase.
//It performs same operations on eachObject.
function customGenerator(eachObject, objectDatabase) {

    //For eachObject, HTML elements are created, using our customCreateElement.
    //We use the names as their classes.
    //To generate a unique id for each element, 
    //we get the index number of each element and join it to its name.
    //Use developer tool of your browser (press f12 key and observe the elements) to see the generated unique id.
    const card = customCreateElement("div", "card")
    const nameContainer = customCreateElement("h2", "name-container", `name${objectDatabase.indexOf(eachObject)}`)
    const emailContainer = customCreateElement("p", "email-container", `email${objectDatabase.indexOf(eachObject)}`)
    const numberContainer = customCreateElement("span", "number-container", `number${objectDatabase.indexOf(eachObject)}`)
    const commentContainer = customCreateElement("p", "comment-container", `comment${objectDatabase.indexOf(eachObject)}`)


    //We're adding contents of eachObject to the created HTML elements
    nameContainer.innerHTML = eachObject.name
    emailContainer.innerHTML = eachObject.email
    commentContainer.innerHTML = eachObject.comment

    //To automatically generate the serial numbers you see ontop of each card, 
    //the index of eachObject is gotten and then increamented by 1, because an array index starts from 0.
    //So, we increase the first one from 0 to 1, the second one from 1 to 2, and so on.
    //The number is added to numberContainer.
    numberContainer.innerHTML = objectDatabase.indexOf(eachObject) + 1

    //For eachObject, we use a copy of a div earlier created and named card.
    //We, one after the other, append the created HTML elements to the card/a div.
    card.appendChild(nameContainer)
    card.appendChild(emailContainer)
    card.appendChild(numberContainer)
    card.appendChild(commentContainer)


    //Having loaded the card, we append/add it to an HTML section named container.
    container.appendChild(card)

}





//We call the display function to display our work.
display()

/*
                            WE'RE DONE! HURRAY! BYE!
*/



