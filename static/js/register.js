document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirm_password: document.getElementById("confirm_password").value,
    };

    try {

        const response = await fetch("http://127.0.0.1:8001/api/register/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        const messageDiv = document.getElementById("message");

        if (response.ok) {

            messageDiv.innerHTML = `
                <div class="alert alert-success">
                    ${result.message}
                </div>
            `;

            document.getElementById("registerForm").reset();

            // Redirect after 2 seconds
            // setTimeout(() => {
            //     window.location.href = "/login/";
            // }, 2000);

        } else {

            let errors = "";

            for (let key in result) {
                errors += `<p>${key}: ${result[key]}</p>`;
            }

            messageDiv.innerHTML = `
                <div class="alert alert-danger">
                    ${errors}
                </div>
            `;
        }

    } catch (error) {

        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                Cannot connect to the backend server.
            </div>
        `;

        console.error(error);
    }

});