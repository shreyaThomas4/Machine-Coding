import { useEffect, useState } from 'react';
import { ProductContainer, Products, PaginationContainer, PaginationItem } from './Pagination.styles';

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const fetchProducts = async () => {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();
        if (data && data.products) {
            setProducts(data.products)
        }
    };

    const selectionHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 10) && selectedPage !== page)
            setPage(selectedPage)
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            {products && products.length > 0 && (
                <ProductContainer>
                    {products.slice(page * 10 - 10, page * 10).map((prod) => {
                        return (
                            <Products key={prod.id}>
                                <img src={prod.thumbnail} alt={prod.title} />
                                <span>{prod.title}</span>
                            </Products>
                        );
                    })}
                </ProductContainer>
            )}
            {products.length > 0 && <PaginationContainer>
                <PaginationItem onClick={() => selectionHandler(page - 1)} disabled={page <= 1}>prev</PaginationItem>
                {[...Array(Math.ceil(products.length / 10))].map((_, i) => {
                    return <PaginationItem selected={page === i + 1} key={i} onClick={() => selectionHandler(i + 1)}>{i + 1}</PaginationItem>
                })}
                <PaginationItem disabled={page >= Math.ceil(products.length / 10)} onClick={() => selectionHandler(page + 1)}>next</PaginationItem>
            </PaginationContainer>}
        </>
    );

}

export default Pagination;
