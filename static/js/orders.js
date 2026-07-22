document.addEventListener("DOMContentLoaded", loadOrders);

async function loadOrders() {

    try {

        const response = await apiRequest("/orders/");

        if (!response) {
            return;
        }

        const result = await response.json();

        const container = document.getElementById("ordersContainer");

        container.innerHTML = "";

        if (result.data.length === 0) {

            container.innerHTML = `
                <div class="alert alert-info text-center">
                    <h4>No Orders Found 📦</h4>
                    <p>Start shopping to place your first order.</p>
                </div>
            `;

            return;
        }

        result.data.forEach(order => {

            let itemsHTML = "";

            order.items.forEach(item => {

                itemsHTML += `
                    <li class="list-group-item d-flex justify-content-between">
                        <span>
                            ${item.product_name} × ${item.quantity}
                        </span>
                        <strong>₹${item.total_price}</strong>
                    </li>
                `;

            });

            container.innerHTML += `
            <div
                class="card shadow mb-4"
                style="cursor:pointer"
                onclick="viewOrder(${order.id})">
                    <div class="card-header d-flex justify-content-between">

                        <strong>Order #${order.id}</strong>

                        <span class="badge bg-warning text-dark">
                            ${order.status}
                        </span>

                    </div>

                    <div class="card-body">

                        <p>
                            <strong>Date:</strong>
                            ${new Date(order.created_at).toLocaleString()}
                        </p>

                        <ul class="list-group mb-3">

                            ${itemsHTML}

                        </ul>

                        <h5 class="text-success text-end">
                            Total : ₹${order.total_amount}
                        </h5>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load orders.");

    }

}

function viewOrder(orderId) {

    window.location.href = `/orders/${orderId}/`;

}