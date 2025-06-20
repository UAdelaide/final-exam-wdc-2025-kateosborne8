/* LET'S GET A DOGGO! */

async function getDoggo() {
    try {
        const response = await featch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        return data.message;
    } catch {
        
    }
}