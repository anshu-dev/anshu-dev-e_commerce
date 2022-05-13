import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import  Product  from '../data/products.json';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/cart';

export default function Products() {
    const dispatch = useDispatch()
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(5);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentProduct = Product.slice(indexOfFirstPost, indexOfLastPost);  

    const cartProduct = useSelector(state=>state.cart.cartProduct)

    const PageNumber = []
    for (let i = 1 ; i <= (Product.length / postPerPage); i++) {
        PageNumber.push(i);
    }

    const paginate = (number) => setCurrentPage(number);

    const addToCart = (product) => {
        dispatch(addProduct(product))
    }

    const checkForDisable = (id) => {
        const product  = cartProduct.find((d) => d.id === id);
        return product ? true : false;
    }

    return (
        <ListGroup as="ol" className="w-75 mx-auto">
            {currentProduct.map((prod, index)=>{
                return (
                    <ListGroup.Item as="li" className="p-3" key={index}>
                    <Row>
                        <Col md={2}>
                            <Image
                                src={prod.image}
                                alt="Generic placeholder"
                                fluid
                                rounded
                            />
                        </Col>
                        <Col md={10} className="d-flex flex-column justify-content-center">
                            <h5 className="mt-0 font-weight-bold mb-2">{prod.name}</h5>
                            <p className="font-italic text-muted mb-0 small mb-3">
                            {prod.short_description}
                            </p>
                            <div className="d-flex align-items-center justify-content-between mt-1">
                                <h6 className="font-weight-bold my-2">${prod.price}</h6>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    style={{
                                        fontSize: '0.7rem',
                                    }}
                                    disabled = {checkForDisable(prod.id)}
                                    onClick = {() => addToCart(prod)}
                                >
                                    {checkForDisable(prod.id) ? 'Present in cart' : 'Add to cart'}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </ListGroup.Item>
                )
            })}
            <Pagination>
                <Pagination.Prev />
                {PageNumber.map((number, index) => <Pagination.Item key= {index} 
                    onClick = {()=> paginate(number)}>
                    {number}
                </Pagination.Item>)}
                <Pagination.Next />
            </Pagination>
        </ListGroup>
    );
}
