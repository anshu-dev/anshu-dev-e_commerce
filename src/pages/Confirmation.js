import React, { useEffect, useState } from "react";

import { Card, Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Confirmation() {
  const cart = useSelector((state) => state.cart);
  const [totalPrice, settotalPrice] = useState(0);
  
  const navigate  = useNavigate()
  useEffect(() => {
    settotalPrice(0)
      let price = 0;
      cart.cartProduct.map(cart => {
        return price = price + (cart.price * cart.quantity)
        })
        settotalPrice(totalPrice + price)
  }, []);

  useEffect(() => {
     if(cart.cartProduct.length === 0) {
         navigate('/')
     }
  }, []);
  
  const handleConfirm = (e) => {
      e.preventDefault()
      navigate('/')
  }
  return (
    <>
      <p className="text-success my-2 text-center">Total price: ${totalPrice.toFixed(2)}</p>
      <Card
            className="w-75 rounded-full border-0"
            style={{ margin: "auto", background: "#f3f3f3" }}
          >
            <Card.Body className="p-3 p-lg-5">
              <Card.Title>Shopping cart</Card.Title>

              <ListGroup as="ol" style={{ marginTop: "1rem" }}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start border-0 p-0"
                >
                  <Container fluid="md" className="p-2">
      {cart?.cartProduct &&
        cart.cartProduct.map((cart, index) => {
          return  <Row className="py-2 m-0" key={index}>
                      <Col md={1} xs={6}>
                        <Image src={cart.image} fluid rounded />
                      </Col>
                      <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}
                        xs={6}
                      >
                        <h6 className="mb-0">{cart.name}</h6>
                        <small style={{ fontSize: "0.7rem" }}>
                          <span className="text-black-50 my-2">
                            Product Code:
                          </span>{" "}
                          <span
                            style={{
                              fontWeight: "500",
                            }}
                          >
                            SDSIJ389
                          </span>
                        </small>
                      </Col>
                      <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}
                        xs={6}
                      >
                        Total Product: {cart.quantity}
                      </Col>
                      <Col
                        className="d-flex flex-column justify-content-center"
                        md={3}
                        xs={6}
                      >
                         Price: ${(cart.price * cart.quantity).toFixed(2)}
                      </Col>
                    </Row>
        })}
                          </Container>
                </ListGroup.Item>
            
              </ListGroup>
            </Card.Body>
          </Card>
        <Button className="d-flex mx-auto my-4" onClick={handleConfirm}>Confirm</Button>
    </>
  );
}
