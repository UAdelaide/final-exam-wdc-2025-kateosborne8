/* LET'S GET A DOGGO! */

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

document.getElementById("doggo-otd").setAttribute("src", getDoggo());
