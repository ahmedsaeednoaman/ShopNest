import React, { useEffect, useState } from "react";
import axios from "axios";


const ahmed = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setErrror] = useState("");

    useEffect(() => {
        const FetchProducts = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
            } catch (err) {
                setError("حدث خطأ أثناء تحميل المنتجات");

            } finally {
                setLoading(false);
            }


        }
        FetchProducts();

    }, []);

    return (
        <div>
            {Products.map((product) => (
                <div key={product.id}>
                    <img src={product.image} alt={product.titie} />
                    <h3>{product.titie}</h3>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};
