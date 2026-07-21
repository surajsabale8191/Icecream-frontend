document.addEventListener("DOMContentLoaded", async function () {

    const access = localStorage.getItem("access");

    // User is not logged in
    if (!access) {

        alert("Please login first.");

        window.location.href = "/login/";

        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8001/api/profile/", {

            method: "GET",

            headers: {

                "Authorization": `Bearer ${access}`,

                "Content-Type": "application/json"

            }

        });

        const result = await response.json();

        if (response.ok) {

            document.getElementById("first_name").innerText = result.data.first_name;

            document.getElementById("last_name").innerText = result.data.last_name;

            document.getElementById("username").innerText = result.data.username;

            document.getElementById("email").innerText = result.data.email;

        }

        else {

            alert("Session expired. Please login again.");

            localStorage.clear();

            window.location.href = "/login/";

        }

    }

    catch (error) {

        console.log(error);

        alert("Cannot connect to backend.");

    }

});