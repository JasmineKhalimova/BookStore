import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import ShopCard from './ShopCard';
import Card from './Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container"
        >
            <div className="row">
                <div className="col-12">
                    {product && product.description && <ShopCard product={product} showViewProductButton={false} />}
                </div>
                <div>
                    <h4 className='mb-4 mt-4 border-bottom pt-4 pb-1'>Related Products</h4>
                    <div className="d-flex mt-4 g-col-6 w-50">
                        {relatedProduct.map((p, i) => (
                            <div className="mb-3" key={i}>
                                <Card product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Product;