export function obtener_filtros (response) {
    const yearList = [...new Set(
        response.map(element => element.Year)
    )].sort((a, b) => a - b);
    
    const productList = [...new Set(
        response.map(element => element.Product)
    )].sort((a, b) => a.localeCompare(b));

    const $template_years = document.querySelector("#section-template-years").content;
    const $template_products = document.querySelector("#section-template-products").content;

    const $fragmentYears = document.createDocumentFragment();
    const $fragmentProducts = document.createDocumentFragment();

    yearList.forEach((year, index) => {
        let clone = $template_years.cloneNode(true);
        clone.querySelector(".section-template-years-content").textContent = year;

        if (index === 0) clone.querySelector(".section-template-years-content").classList.add("active");

        $fragmentYears.appendChild(clone);
    });

    productList.forEach((product, index) => {
        let clone = $template_products.cloneNode(true);
        clone.querySelector(".section-template-products-content").textContent = product;

        if (index === 0) clone.querySelector(".section-template-products-content").classList.add("active");

        $fragmentProducts.appendChild(clone);
    });

    document.querySelector(".section-dinamic-years").appendChild($fragmentYears);
    document.querySelector(".section-dinamic-products").appendChild($fragmentProducts);
};