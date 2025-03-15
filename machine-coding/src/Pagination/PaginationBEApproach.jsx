import { useEffect, useState } from 'react';
import { ProductContainer, Products, PaginationContainer, PaginationItem } from './Pagination.styles';

const Pagination = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    const fetchProducts = async () => {
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
        const data = await response.json();
        if (data && data.products) {
            setProducts(data.products);
            setTotalPages(Math.ceil(data.total / 10));
        }
    };

    const selectionHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page)
            setPage(selectedPage);
    }

    useEffect(() => {
        fetchProducts();
    }, [page]);

    return (
        <>
            {products && totalPages > 0 && (
                <ProductContainer>
                    {products.map((prod) => {
                        return (
                            <Products key={prod.id}>
                                <img src={prod.thumbnail} alt={prod.title} />
                                <span>{prod.title}</span>
                            </Products>
                        );
                    })}
                </ProductContainer>
            )}
            {totalPages > 0 && <PaginationContainer>
                <PaginationItem onClick={() => selectionHandler(page - 1)} disabled={page <= 1}>prev</PaginationItem>
                {[...Array(Math.ceil(totalPages))].map((_, i) => {
                    return <PaginationItem selected={page === i + 1} key={i} onClick={() => selectionHandler(i + 1)}>{i + 1}</PaginationItem>
                })}
                <PaginationItem disabled={page >= Math.ceil(totalPages)} onClick={() => selectionHandler(page + 1)}>next</PaginationItem>
            </PaginationContainer>}
        </>
    );

}

export default Pagination;
