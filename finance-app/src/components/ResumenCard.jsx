import { Link } from "react-router-dom";

function ResumenCard({titulo, pagina}) {
    return (
        <div>
            <h2>{titulo}</h2>
            <Link to={pagina}>
                <p>+</p>
            </Link>
            <p>$100</p>
        </div>
    );
}

export default ResumenCard;