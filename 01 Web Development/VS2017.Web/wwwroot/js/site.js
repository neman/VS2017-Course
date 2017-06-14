// Write your Javascript code.
let elm = document.querySelector("#greeting");

function hello(greeting) {
    elm.textContent +=  `${greeting} World!!`;
}

hello("Hello") 