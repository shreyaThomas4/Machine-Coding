import styled from "styled-components";

export const ProductContainer = styled.div`
padding: 0;
`

export const Products = styled.div`
height: auto;
padding: 20px;
background-color: lightgray;
text-align: center;
border-radius: 5px;
margin: 20px;
cursor: pointer;
`

export const PaginationContainer = styled.div`
padding: 10px;
display: flex;
justify-content: center;
margin: 15px 0;
`


export const PaginationItem = styled.span`
padding: 15px 20px;
border: 1px solid gray;
cursor: pointer;
background-color: ${(props) => !props.selected || 'lightblue'}; 
opacity: ${(props) => props.disabled ? 0 : 1}; ;
`