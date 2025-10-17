export function graficos(ctx, data, tipo) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const baseConfig = {
        type: tipo === "horizontalBar" ? "bar" : tipo,
        data: {
            labels,
            datasets: [{
                label: "Valor total (€)",
                data: values,
                borderWidth: 1,
                backgroundColor: generarColores(values.length),
                fill: tipo === "line" 
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: tipo === "pie" },
                title: {
                    display: true,
                    text: obtenerTitulo(tipo)
                }
            },
            animation: {
                duration: 1000,
                easing: "easeOutQuart",
                animateScale: true,
                animateRotate: true,
                onComplete: (animation) => {
                    animation.chart._animationsDisabled = false;
                }
            },
            scales: tipo === "doughnut" ? {} : {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            },
            indexAxis: tipo === "horizontalBar" ? "y" : "x"
        }
    };

    return new Chart(ctx, baseConfig);
};

function generarColores(n) {
    const colores = [];
    for (let i = 0; i < n; i++) {
        colores.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
    }
    return colores;
}

function obtenerTitulo(tipo) {
    switch (tipo) {
        case "bar": return "Facturación por Mes";
        case "horizontalBar": return "Facturación por Comunidad Autónoma";
        case "line": return "Cantidad Vendida por Mes";
        case "doughnut": return "Distribución por Método de Pago";
        default: return "Gráfico";
    };
};
