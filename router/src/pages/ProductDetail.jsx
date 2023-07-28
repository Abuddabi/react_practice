import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
    const params = useParams();

    const id = params.id;

    return (
        <>
            <h1>{id} Product Details!</h1>
            <p>
                <Link to=".." relative="path">
                    Back
                </Link>
            </p>
        </>
    );
};

export default ProductDetail;
