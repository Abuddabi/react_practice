import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const params = useParams();

    const id = params.id;

    return <h1>{id} Product Details!</h1>;
};

export default ProductDetail;
