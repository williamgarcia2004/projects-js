import { query } from "./query.js";
import { obtener_filtros } from "./filters/get_filters.js";
import { filter_data } from "./filters/filter_data.js";
import { graficos } from "./graphs.js";

const app = {
    data: null,   // Guarda la respuesta de query()
    ctx: {},      // Contextos de los canvas
    charts: {}    // Instancias de gráficos Chart.js
};

document.addEventListener("click", (e) => {
    const element = e.target;

    if (element.matches(".section-template-content")) {
        const parent = element.parentElement;
        const activos = parent.querySelectorAll(".active");

        if (element.classList.contains("active") && activos.length > 1) {
            element.classList.remove("active");
        } else {
            element.classList.add("active");
        };

        actualizarGraficos(app.data);
    };
});

function obtenerFiltrosActivos() {
    const añosActivos = [...document.querySelectorAll(".section-template-years-content.active")].map(el => parseInt(el.textContent));
    const productosActivos = [...document.querySelectorAll(".section-template-products-content.active")].map(el => el.textContent);
    return { añosActivos, productosActivos };
}

function actualizarGraficos(response) {
    if (!response) return;

    const { añosActivos, productosActivos } = obtenerFiltrosActivos();
    const dataFiltrada = response.filter(d =>
        añosActivos.includes(d.Year) && productosActivos.includes(d.Product)
    );

    if (dataFiltrada.length === 0) {
        console.warn("No hay datos para los filtros seleccionados.");
        return;
    }

    const { 
        facturacion_por_mes, 
        facturacion_por_comunidad_autonoma, 
        cantidad_vendida_por_mes, 
        distribucion_metodos_de_pago 
    } = filter_data(dataFiltrada);

    Object.values(app.charts).forEach(chart => chart?.destroy());

    app.charts.chart1 = graficos(app.ctx.chart1, facturacion_por_mes, "bar"); 
    app.charts.chart2 = graficos(app.ctx.chart2, facturacion_por_comunidad_autonoma, "horizontalBar"); 
    app.charts.chart3 = graficos(app.ctx.chart3, cantidad_vendida_por_mes, "line"); 
    app.charts.chart4 = graficos(app.ctx.chart4, distribucion_metodos_de_pago, "doughnut");  
};

async function main() {
    const response = await query();

    if (typeof response !== "object") {
        const errorSection = document.querySelector(".section-error");
        errorSection.style.display = "flex";
        document.querySelector(".section-error-title").textContent = response;
        document.querySelector(".section-dinamic").innerHTML = "";
        document.querySelector(".section-graphs").innerHTML = "";
        return;
    }

    app.data = response;
    obtener_filtros(response);

    app.ctx.chart1 = document.querySelector("#grafico1").getContext("2d");
    app.ctx.chart2 = document.querySelector("#grafico2").getContext("2d");
    app.ctx.chart3 = document.querySelector("#grafico3").getContext("2d");
    app.ctx.chart4 = document.querySelector("#grafico4").getContext("2d");

    actualizarGraficos(response);
};

main();
