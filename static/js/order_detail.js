document.addEventListener("DOMContentLoaded", loadOrderDetails);

async function loadOrderDetails() {

    try {

        const response = await apiRequest(`/orders/${ORDER_ID}/`);

        if (!response) {
            return;
        }

        const result = await response.json();

        const container = document.getElementById("orderDetailContainer");

        if (!result.status) {

            container.innerHTML = `
                <div class="alert alert-danger">
                    Order not found.
                </div>
            `;

            return;
        }

        const order = result.data;

        let itemsHTML = "";

        order.items.forEach(item => {

            itemsHTML += `

                <tr>

                    <td>${item.product_name}</td>

                    <td>₹${item.price}</td>

                    <td>${item.quantity}</td>

                    <td>₹${item.total_price}</td>

                </tr>

            `;

        });

        container.innerHTML = `

            <div class="card shadow">

                <div class="card-header d-flex justify-content-between">

                    <h4>Order #${order.id}</h4>

                    <span class="badge ${getStatusBadge(order.status)}">
                        ${order.status}
                    </span>

                </div>

                <div class="card-body">

                    <p>
                        <strong>Date :</strong>
                        ${new Date(order.created_at).toLocaleString()}
                    </p>

                    <div class="table-responsive">

                        <table class="table table-bordered">

                            <thead>

                                <tr>

                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>

                                </tr>

                            </thead>

                            <tbody>

                                ${itemsHTML}

                            </tbody>

                        </table>

                    </div>

                    <h3 class="text-end text-success">

                        Grand Total : ₹${order.total_amount}

                    </h3>

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load order details.");

    }

}

function getStatusBadge(status) {

    switch (status) {

        case "Pending":
            return "bg-warning text-dark";

        case "Processing":
            return "bg-info";

        case "Shipped":
            return "bg-primary";

        case "Delivered":
            return "bg-success";

        case "Cancelled":
            return "bg-danger";

        default:
            return "bg-secondary";
    }

}