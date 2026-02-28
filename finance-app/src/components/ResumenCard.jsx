function ResumenCard(titulo) {
    return (
        <div>
            <h2>{titulo}</h2>
            <Link to="/HistorialGastos">
                <p>Ver más</p>
            </Link>
        </div>
    );
}

export default Metas;