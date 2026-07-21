document.addEventListener("DOMContentLoaded", function () {

    const access = localStorage.getItem("access");

    if (access) {

        document.getElementById("loginNav").classList.add("d-none");
        document.getElementById("registerNav").classList.add("d-none");

        document.getElementById("profileNav").classList.remove("d-none");
        document.getElementById("changePasswordNav").classList.remove("d-none");
        document.getElementById("logoutNav").classList.remove("d-none");
    }
    
    // Logout
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", async function (e) {

            e.preventDefault();

            const refresh = localStorage.getItem("refresh");
            const access = localStorage.getItem("access");

            try {

                const response = await fetch("http://127.0.0.1:8001/api/logout/", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        "Authorization": `Bearer ${access}`

                    },

                    body: JSON.stringify({

                        refresh: refresh

                    })

                });

                if (response.ok) {

                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");

                    alert("Logged out successfully.");

                    window.location.href = "/login/";

                } else {

                    alert("Logout failed.");

                }

            } catch (error) {

                console.log(error);

                alert("Cannot connect to backend.");

            }

        });

    }

});