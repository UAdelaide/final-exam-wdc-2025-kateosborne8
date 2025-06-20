/* LET'S GET A DOGGO! */

var vueinst = new Vue({
    el: '#app',
    data: {
        text: "blah"
    },
    methods: {
        blah() {
            
        }
    }
});

async function getDoggo() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        return data.message;
    } catch (err) {
        /* Oh no! No doggo! */
        console.log("Failed to retrieve a doggo...");
        return null;
    }
}

async function showDoggo() {
    const url = await getDoggo();
    if (url) {
        document.getElementById("doggo-otd").setAttribute("src", url);
    }
}

showDoggo();
