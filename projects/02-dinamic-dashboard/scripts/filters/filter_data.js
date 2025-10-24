export function filter_data (data) {
    const MESES = [...new Set(data.map(dat => dat.Month))];
    const COMUNIDADES_AUTONOMAS = [...new Set(data.map(dat => dat.Community))];
    const METODOS_DE_PAGO = [...new Set(data.map(dat => dat.PaymentMethod))];

    const facturacion_por_mes = {};
    const facturacion_por_comunidad_autonoma = {};
    const cantidad_vendida_por_mes = {};
    const distribucion_metodos_de_pago = {};

    MESES.forEach(mes => {
        const mes_filter = data.filter(dat => dat.Month === mes);
        const mes_value = parseFloat(mes_filter.reduce((acum, item) => acum + item.Value, 0).toFixed(2));
        const product_count = mes_filter.length;

        facturacion_por_mes[mes] = mes_value;
        cantidad_vendida_por_mes[mes] = product_count;
    }); 

    COMUNIDADES_AUTONOMAS.forEach(comunidad => {
        const comunidad_filter = data.filter(dat => dat.Community === comunidad);
        const comunidad_value = parseFloat(comunidad_filter.reduce((acum, item) => acum + item.Value, 0).toFixed(2));
        facturacion_por_comunidad_autonoma[comunidad] = comunidad_value;
    });

    METODOS_DE_PAGO.forEach(metodo => {
        const metodo_pago_filter = data.filter(dat => dat.PaymentMethod === metodo);
        const metodo_pago_value = parseFloat(metodo_pago_filter.reduce((acum, item) => acum + item.Value, 0).toFixed(2));
        distribucion_metodos_de_pago[metodo] = metodo_pago_value;
    });

    return { facturacion_por_mes, facturacion_por_comunidad_autonoma, cantidad_vendida_por_mes, distribucion_metodos_de_pago };
};