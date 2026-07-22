const API_BASE = "http://127.0.0.1:8001/api";

async function apiRequest(endpoint, options = {}) {

    let access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    options.headers = {
        ...(options.headers || {}),
        "Authorization": `Bearer ${access}`
    };

    let response = await fetch(`${API_BASE}${endpoint}`, options);

    // If the access token has expired
    if (response.status === 401 && refresh) {

    const refreshResponse = await fetch(`${API_BASE}/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            refresh: refresh
        })
    });

    if (!refreshResponse.ok) {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        alert("Your session has expired. Please login again.");

        window.location.href = "/login/";

        return null;
    }

    const refreshData = await refreshResponse.json();

    localStorage.setItem("access", refreshData.access);

    options.headers["Authorization"] = `Bearer ${refreshData.access}`;

    response = await fetch(`${API_BASE}${endpoint}`, options);
}

    return response;
}