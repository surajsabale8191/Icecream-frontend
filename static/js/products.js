const API = "http://127.0.0.1:8001/api";

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

    loadCategories();

});

async function loadProducts(search = "", category = "") {

    let url = `${API}/products/?`;

    if (search) {
        url += `search=${search}&`;
    }

    if (category) {
        url += `category=${category}`;
    }

const response = await fetch(url);

    const result = await response.json();

    const container = document.getElementById("productContainer");

    container.innerHTML = "";

    result.data.forEach(product => {

        container.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow">

                <img
                    src="http://127.0.0.1:8001${product.image}"
                    class="card-img-top"
                    style="height:250px;object-fit:cover;">

                <div class="card-body">

                    <h5>${product.name}</h5>

                    <p>${product.description}</p>

                    <h4 class="text-success">

                        ₹${product.price}

                    </h4>

                    <button
                        class="btn btn-warning w-100">

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

async function loadCategories() {

    const response = await fetch(`${API}/categories/`);

    const result = await response.json();

    const select = document.getElementById("categoryFilter");

    result.data.forEach(category => {

        select.innerHTML += `

        <option value="${category.slug}">

            ${category.name}

        </option>

        `;

    });

}

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("keyup", function () {

    loadProducts(
        searchBox.value,
        categoryFilter.value
    );

});

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", function () {

    loadProducts(
        searchBox.value,
        categoryFilter.value
    );

});