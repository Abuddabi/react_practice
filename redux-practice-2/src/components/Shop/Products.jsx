import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = ({ items }) => {
    const productItems = items.map((item) => (
        <ProductItem key={item.id} itemData={item} />
    ));

    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>{productItems}</ul>
        </section>
    );
};

export default Products;
