const API = "http://127.0.0.1:8001/api";

document.addEventListener("DOMContentLoaded", loadCart);

async function loadCart() {

    const token = localStorage.getItem("access");

    const response = await fetch(

        `${API}/cart/view/`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    const result = await response.json();

    const container = document.getElementById("cartContainer");

    container.innerHTML = "";

    result.data.forEach(item => {

        container.innerHTML += `

        <div class="card mb-3">

            <div class="row g-0">

                <div class="col-md-3">

                    <img
                        src="http://127.0.0.1:8001${item.product_image}"
                        class="img-fluid">

                </div>

                <div class="col-md-9">

                    <div class="card-body">

                        <h4>

                            ${item.product_name}

                        </h4>

                        <h5>

                            ₹${item.product_price}

                        </h5>

                        <h5>

                            Quantity : ${item.quantity}

                        </h5>

                        <h4>

                            Total : ₹${item.total_price}

                        </h4>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}