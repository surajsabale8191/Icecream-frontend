document.getElementById("passwordForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const access = localStorage.getItem("access");

    const data = {
        old_password: document.getElementById("old_password").value,
        new_password: document.getElementById("new_password").value,
        confirm_password: document.getElementById("confirm_password").value,
    };

    try {

        const response = await fetch("http://127.0.0.1:8001/api/change-password/", {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access,
            },

            body: JSON.stringify(data),

        });

        const result = await response.json();

        const message = document.getElementById("message");

        if (response.ok) {

            message.innerHTML = `
                <div class="alert alert-success">
                    ${result.message}
                </div>
            `;

            document.getElementById("passwordForm").reset();

        } else {

            message.innerHTML = `
                <div class="alert alert-danger">
                    ${JSON.stringify(result)}
                </div>
            `;

        }

    } catch (error) {

        console.log(error);

    }

});