# CAD-3MTT-improved-class-lesson-form-javascript

---

# JAvascript Class

In the CAD-3MTT class of 2nd March 2024, we added some javascript codes to an HTML form to created in the previous class. It was awesome.

However, the only thing after hitting the submit button is that the collected data is displayed as an alert; the data does not persist. The lesson was purely a frontend lesson; hence, it ended at collecting and displaying the output through alert. 

## What I did

Having, on my own, been tinkering with MongoDB in the MERN stacks (ReactJs and NextJs), with MySql through Laravel; Postgres through Django and MedusaJs, I asked myself,  "Why can't we persist the collected data in the frontend, at least temporarily, by saving it into the localstorage on the browser?" and that is what I did here. 

## Afterwards
The app now can persist the inputs received. It

1. receives inputs from users.
2. validates the inputs.
3. stores the inputs in the localStorage of the user's browser.
4. retrieves the inputs from the localStorage.
5. sends the input to the HTML page for display.

Therefore, after the user fills the form, submits and refreshes their browser, the user can view inputs displayed as a card.

Therefore, CR (Create and Read) of the CRUD (Create Read Update and Delete) operations are perfomed with pure/vanilla javascript. The UD (Update and Delete) will be added later.

TThis is just for the fun of practice and learning. The code has detailed comments. I hope it will help fellow CAD-3MTT learners or any javasript learner.

Parts of the javascript codes belong to my instructor whose name I don't even know, not talk of referencing.

See the demo [here](https://aademola1979.github.io/CAD-3MTT-improved-class-lesson-form-javascript/).

---
