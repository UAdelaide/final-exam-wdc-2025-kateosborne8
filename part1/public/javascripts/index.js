/* LET'S GET A DOGGO! */

const app = Vue.createApp({
    data() {
        return {
            button_text: "click here"
        };
    },
    methods: {
        click_button() {
            this.button_text = "Now you can sign up at the top of the page with that button";
            document.getElementById("real-signup").style.display = "block";
            document.getElementById("signup-button").style.display = "block";
        }
    },
    mounted() {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                const obj = JSON.parse(this.responseText);

                vueinst.listings = obj;
            }
        };

        xhttp.open("GET", "/api/dogs", true);
        xhttp.getResponseHeader("Content-type", "application/json");

        xhttp.send();


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
    }
});

app.mount('#app');
