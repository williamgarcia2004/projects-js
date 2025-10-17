export async function query () {
    try {
        const query = await fetch("db/db.json");
        if (!query.ok) throw {message: "La consulta a la base de datos ha fallado!!"};

        const response = await query.json();
        return response;
    } catch (error) {
        return `Error: ${error.message}`;
    };
};