import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { applyVoucher, removeProduct, updateQuantity } from "../store/cart";
import countries from "../data/countries.json";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    zip: "",
  });
  const [formerrors, setFormErrors] = useState(null);
  const [productvoucher, setProductVouchers] = useState();
  const [appliedvoucher, setAppliedVouchers] = useState();
  const [productid, setProductId] = useState(null);
  const [nextValidate, setNextValidate] = useState(true);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // getting all added product
  const cartProduct = useSelector((state) => state.cart.cartProduct);

  // dispatch to remove cart product
  const removeToCart = (id) => {
    dispatch(removeProduct(id));
  };

  const validate = () => {
    let errors = {};

    //name field
    if (!values.fullname) {
      errors.fullname = "Full name is required";
    }

    // email field
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    // phone field
    const regex = /^([+]?[\s0-9])/i;
    if (!values.phone) {
      errors.phone = "phone is required";
    }
    // else if(regex.test(values.phone)){
    //     errors.phone = "phone is invalid"; 
    // }

    // country field
    if (!values.country) {
      errors.country = "country is required";
    }

    // city field
    if (!values.city) {
      errors.city = "city is required";
    }

    // address field
    if (!values.address) {
      errors.address = "address is required";
    }

    // zip field
    if (!values.zip) {
      errors.zip = "zip is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (validate()) {
      navigate("/confirmation");
    }
  };

  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const increaseQuantity = (id) => {
    dispatch(updateQuantity({ id: id, quantity: 1 }));
  };

  const decreaseQuantity = (id) => {
    dispatch(updateQuantity({ id: id, quantity: -1 }));
  };

  const applyCoupan = (id) => {
    handleShow();
    cartProduct.map(
      (product) => product.id === id && setProductVouchers(product.vouchers)
    ) && setProductId(id);
  };

  const handleVoucher = (e) => {
    e.preventDefault();
    dispatch(
      applyVoucher({ productid: productid, discount: appliedvoucher.discount })
    );
    handleClose();
  };

  useEffect(() => {
    if (
      values.fullname !== "" &&
      values.email !== "" && 
      values.email !== !/\S+@\S+\.\S+/.test(values.email) && 
      values.phone !== "" &&
      values.country !== "" &&
      values.city !== "" &&
      values.address !== "" &&
      values.zip !== ""
    ) {
      setNextValidate(false);
    }
    else{
        setNextValidate(true)
    }
  }, [values]);

  return (
    <>
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
                {cartProduct.length &&
                  cartProduct.map((product, index) => {
                    return (
                      <div key={index}>
                        <Row className="py-2 m-0">
                          <Col md={1} xs={6}>
                            <Image src={product.image} fluid rounded />
                          </Col>
                          <Col
                            className="d-flex flex-column justify-content-center"
                            md={3}
                            xs={6}
                          >
                            <h6 className="mb-0">{product.name}</h6>
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
                            className="d-flex justify-content-center align-items-center"
                            md={2}
                            xs={6}
                          >
                            <h6 className="mb-0 me-2 text-danger">
                              {!product?.discount
                                ? (product.price * product.quantity).toFixed(2)
                                : (
                                    product.price * product.quantity -
                                    product.discount
                                  ).toFixed(2)}
                            </h6>
                            {product?.discount && (
                              <h6 className="mb-0 text-black-50">
                                <strike>
                                  $
                                  {(product.price * product.quantity).toFixed(
                                    2
                                  )}
                                </strike>
                              </h6>
                            )}
                          </Col>
                          <Col
                            className="d-flex justify-content-center align-items-center py-2"
                            md={2}
                            xs={6}
                          >
                            <InputGroup size="sm" style={{ width: "5rem" }}>
                              <Button
                                variant="outline-secondary"
                                style={{
                                  fontSize: "0increaseQuantity.6rem",
                                }}
                                onClick={() => increaseQuantity(product.id)}
                              >
                                <i className="fa fa-plus"></i>
                              </Button>
                              <Form.Control
                                size="sm"
                                value={product.quantity}
                                className="border-secondary text-center px-0"
                                style={{
                                  fontSize: "0.7rem",
                                }}
                              />
                              <Button
                                variant="outline-secondary"
                                style={{
                                  fontSize: "0.6rem",
                                }}
                                onClick={() => decreaseQuantity(product.id)}
                              >
                                <i className="fa fa-minus"></i>
                              </Button>
                            </InputGroup>
                          </Col>
                          <Col
                            className="d-flex justify-content-center align-items-center"
                            md={2}
                            xs={6}
                          >
                            <Button
                              className={
                                product.vouchers.length !== 0
                                  ? `d-block`
                                  : `d-none`
                              }
                              size="sm"
                              variant="secondary"
                              onClick={() => applyCoupan(product.id)}
                            >
                              Apply Coupon
                            </Button>
                          </Col>
                          <Col
                            className="d-flex justify-content-center align-items-center"
                            md={2}
                            xs={6}
                          >
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => removeToCart(product.id)}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                        <hr className="text-black-50 my-2"></hr>{" "}
                      </div>
                    );
                  })}
              </Container>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Body className="p-lg-5 p-3">
          <Card.Title>Billing Information</Card.Title>

          <Form className="bg-white p-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
              />
              {formerrors && (
                <p className="text-warning">{formerrors?.fullname}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {formerrors && (
                <p className="text-warning">{formerrors?.email}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
              {formerrors && (
                <p className="text-warning">{formerrors?.phone}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                onChange={handleChange}
                value={values.country}
              >
                {countries.map((country, index) => (
                  <option key={index}>{country.name}</option>
                ))}
              </Form.Select>
              {formerrors && (
                <p className="text-warning">{formerrors?.country}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
              {formerrors && <p className="text-warning">{formerrors?.city}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              {formerrors && (
                <p className="text-warning">{formerrors?.address}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ZIP</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ZIP"
                name="zip"
                value={values.zip}
                onChange={handleChange}
              />
              {formerrors && <p className="text-warning">{formerrors?.zip}</p>}
            </Form.Group>
          </Form>
        </Card.Body>

        <Button
          className="mx-5 mb-5"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={nextValidate}
        >
          Next
        </Button>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Discount</th>
                </tr>
              </thead>
              <tbody>
                {productvoucher &&
                  productvoucher.map((voucher, index) => {
                    return (
                      <tr
                        onClick={() => setAppliedVouchers(voucher)}
                        className={
                          appliedvoucher?.id === voucher.id && `bg-success`
                        }
                        key={index}
                      >
                        <td>{voucher.name}</td>
                        <td>{voucher.discount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleVoucher}>
            Apply Coupon
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
