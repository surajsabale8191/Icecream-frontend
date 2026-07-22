const API = "http://127.0.0.1:8001/api";

document.addEventListener("DOMContentLoaded", loadCart);

async function loadCart() {

    const token = localStorage.getItem("access");

    const response = await apiRequest("/cart/view/");

    if (!response) {
        return;
    }

    const result = await response.json();
    if (!result.data) {
    console.log(result);
    return;
}

    const container = document.getElementById("cartContainer");

    container.innerHTML = "";
    if (result.data.length === 0) {

        container.innerHTML = `

            <div class="alert alert-info text-center">

                <h4>Your cart is empty 🛒</h4>

                <p>Add some delicious ice creams!</p>

            </div>

        `;

        return;
    }

    let grandTotal = 0;

    result.data.forEach(item => {

        grandTotal += parseFloat(item.total_price);

        container.innerHTML += `

        <div class="card mb-3 shadow">

            <div class="row g-0">

                <div class="col-md-3">

                    <img
                        src="http://127.0.0.1:8001${item.product_image}"
                        class="img-fluid rounded-start"
                        style="height:200px; object-fit:cover; width:100%;">

                </div>

                <div class="col-md-9">

                    <div class="card-body">

                        <h4>${item.product_name}</h4>

                        <h5 class="text-success">
                            ₹${item.product_price}
                        </h5>

                        <div class="d-flex align-items-center gap-2 my-3">

                            <button
                                class="btn btn-danger"
                                onclick="decreaseQuantity(${item.id})">
                                -
                            </button>

                            <span class="fs-5">
                                ${item.quantity}
                            </span>

                            <button
                                class="btn btn-success"
                                onclick="increaseQuantity(${item.id})">
                                +
                            </button>

                        </div>

                        <h5>
                            Total : ₹${item.total_price}
                        </h5>

                        <button
                            class="btn btn-outline-danger mt-2"
                            onclick="removeItem(${item.id})">

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    // Cart Summary
    container.innerHTML += `

    <div class="card shadow mt-4">

        <div class="card-body text-end">

            <h3 class="text-success">
                Grand Total : ₹${grandTotal.toFixed(2)}
            </h3>

            <button
                class="btn btn-warning btn-lg mt-3"
                onclick="placeOrder()">

                🛒 Place Order

            </button>

        </div>

    </div>

    `;
}

async function increaseQuantity(cartId) {

    const token = localStorage.getItem("access");

    await apiRequest(`/cart/increase/${cartId}/`, {
        method: "PUT"
    });

    loadCart();

}

async function decreaseQuantity(cartId) {

    const token = localStorage.getItem("access");

    await apiRequest(`/cart/decrease/${cartId}/`, {
        method: "PUT"
    });

    loadCart();

}


async function removeItem(cartId) {

    const token = localStorage.getItem("access");

    const confirmDelete = confirm(
        "Remove this item from cart?"
    );

    if (!confirmDelete)
        return;

    await fetch(
        `${API}/cart/remove/${cartId}/`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    loadCart();

}

async function placeOrder() {

    const confirmOrder = confirm(
        "Are you sure you want to place this order?"
    );

    if (!confirmOrder) {
        return;
    }

    try {

        const response = await apiRequest("/orders/checkout/", {
            method: "POST"
        });

        const result = await response.json();

        if (response.ok) {

            alert(result.message);

            loadCart();

            window.location.href = "/orders/";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }
}