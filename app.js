//Improved copy of 2nd March, 2024 class lesson

const container = document.getElementById("display-section")


document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault()

        //Get form elements by their id's
        const nameInput = document.getElementById("name")
        const emailInput = document.getElementById("email")
        const commentInput = document.getElementById("comment")


        //Get values from the inputs
        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const comment = commentInput.value.trim()


        //Validation
        if (!name || !email || !comment) {
            alert('Please fill out all fields')
            return
        }


        //Combine name, email and comment into a single object
        const feedbackData = {
            name: name,
            email: email,
            comment: comment
        }

        //Try to get data from the localStorage
        const database = JSON.parse(localStorage.getItem('Database'))

        //Checking if data is returned from the localStorage or not
        if (!database) {

            //If no data is returned from the localStorage,
            //maybe because the user is making a comment for the first time,
            //it creates an empty array named database
            const database = []

            //Using the spread operator, it adds feedbackData array to database to produce a new array,
            //and sets the new array to a variable named feedbackDtabase2.
            const feedbackDatabase2 = [...database, feedbackData]

            //It returns feedbackDatabase2 to the localstorage
            localStorage.setItem('Database', JSON.stringify(feedbackDatabase2))

        } else {
            //However, if database already exists,
            //because the user has made, at least, a comment before;
            //it adds feedbackData to the retruned database to create a new array named feedbackDatabase2
            const feedbackDatabase2 = [...database, feedbackData]

            //It returns feedbackDatabase2 to the localstorage
            localStorage.setItem('Database', JSON.stringify(feedbackDatabase2))

        }


        //Cleaar form fields after submission
        nameInput.value = ''
        emailInput.value = ''
        comment.value = ''
    }
    )
})


//A function to get data from the localStorage and display
function display() {

    //Try to get database from the localstorage
    const database = localStorage.getItem('Database')

    //If database does not exist, there's nothing to display;
    //hence, it stops the process.
    if (!database) {
        return
    }

    //Else,f database is returned from the localstorage,
    //it'll be returned as a JSON object; JSON.parse(database) is called
    //to turn the database into a javascript object and save it as a new array named objectDatabase.
    const objectDatabase = JSON.parse(database)


    //It loops through the content of objectDatabase.
    //Each item in objectDatabase is given the name eachObject.
    //It is then passed to the function customGenerator
    objectDatabase.map(eachObject =>customGenerator(eachObject, objectDatabase))

}


//customGenrator receives each object and the database
//It performs these activities on each object
function customGenerator(eachObject, objectDatabase){

    //For each object, HTML elements are created, using our customCreateElement.
    //See thr definition of customCreateElement far far below.
    const card = customCreateElement("div", "card")
    const nameContainer = customCreateElement("h2", "name-container")
    const emailContainer = customCreateElement("p", "email-container")
    const numberContainer = customCreateElement("span", "number-container")
    const commentContainer = customCreateElement("p", "comment-container")


    //Adding content to the created HTML elements
    nameContainer.innerHTML = eachObject.name
    emailContainer.innerHTML = eachObject.email
    commentContainer.innerHTML = eachObject.comment

    //To generate serial numbers, 
    //the index of each object is gotten and then increamented by one.
    //The number is added to numberContainer.
    numberContainer.innerHTML = objectDatabase.indexOf(eachObject) + 1

    //For each object, it uses a copy of a div earlier created and named card.
    //It appends the created HTML element to the div.
    card.appendChild(nameContainer)
    card.appendChild(emailContainer)
    card.appendChild(numberContainer)
    card.appendChild(commentContainer)


    //Add each card to parent ealier created and named container.
    container.appendChild(card)

}


//For the sake of convenience, a function that can create any HTML element,
//add class and id is created. ClassName and id are given empty strings as default value
//in case no className or id is provided when the function is called.
function customCreateElement(type, className = "", id = "") {

    //Create the element (div, section, h1, p...) based on the given first parameter
    const customElement = document.createElement(type)

    //Add class to the element based on the second parameter
    customElement.classList = className

    //Add id to the element based on the third parameter
    customElement.id = id

    return customElement

}


//Call the display function
display()


/*
                            WE'RE DONE!
*/



