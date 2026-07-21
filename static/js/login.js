document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {

        username: document.getElementById("username").value,
        password: document.getElementById("password").value

    };

    try {

        const response = await fetch("http://127.0.0.1:8001/api/login/", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        const message = document.getElementById("message");

        if (response.ok) {

            // Save tokens

            localStorage.setItem("access", result.access);

            localStorage.setItem("refresh", result.refresh);

            message.innerHTML = `
                <div class="alert alert-success">
                    Login Successful
                </div>
            `;

            setTimeout(() => {

                window.location.href = "/";

            }, 1000);

        }

        else {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Invalid Email or Password
                </div>
            `;

        }

    }

    catch (err) {

        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                Cannot connect to backend.
            </div>
        `;

        console.log(err);

    }

});