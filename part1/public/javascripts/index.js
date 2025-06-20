/* LET'S GET A DOGGO! */

vueinst new Vue({
    el: '#app',
    data: {
        text: "blah"
    },
    methods: {
        
    }
}

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
