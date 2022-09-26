import React from 'react';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RV from '../../img/rv-logo.png';
import { Formik } from 'formik';
import * as yup from 'yup';
import './login-view.css';

export function LoginView(props) {
    
    return (

        <Container>
            <Formik
              validationSchema={yup.object({
                username: yup.string()
                .min(5, 'Must be at least 5 characters')
                .max(10, 'Must not exceed 10 characters')
                .matches(/^[a-zA-Z0-9]+$/,"Only alphanumeric characters allowed (A-Z, 0-9)")
                .required('Required'),
                password: yup.string()
                .min(6, 'Must be at least 6 characters')
                .max(10, 'Must not exceed 10 characters')
                .required('Required')
              })}
              
              onSubmit={(values, { resetForm }) => {
                resetForm();
                axios.post('https://powerful-coast-48240.herokuapp.com/login', {
                    Username: values.username,
                    Password: values.password,
                  })
                  .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                  })
                    .catch(response => {
                        alert('Unable to login! Please check that your data is correct.');
                    });
              }}
              
              initialValues={{
                username:"",
                password: ""
              }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    resetForm,
                    touched,
                    values,
                    errors,
                }) => (
                        <Container className="login-view">
                            <Row className="justify-content-center">
                                <Col xxl={8} xl={8} lg={9} md={10} sm={12}>
                                    <div className='title-wrapper'>
                                        <img className="logo-img" src={RV} alt="retro video logo" />
                                        <h1 className="welcome-text">Welcome to Retro Video!</h1>
                                        <p className="slogan">A mini movie database that's a blast from the past.</p>
                                    </div>
                                    <Card className="login-card">
                                        <Card.Body>
                                            <Card.Header className="login-header">Please enter your username and password to enter.</Card.Header>

                                            <Form className="login-form">
                                                <Form.Group className="login-input">
                                                    <Form.Label>Username:</Form.Label>
                                                    <Form.Control 
                                                        name="username"
                                                        type ="text"
                                                        value={values.username} 
                                                        onChange={handleChange("username")} 
                                                        placeholder="Enter username"
                                                        isInvalid={touched.username && !!errors.username}
                                                        onKeyUp={(e) => {
                                                            if (new RegExp(/[a-zA-Z0-9]/).test(e.key)) {
                                                            } else e.preventDefault();
                                                          }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.username}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                        
                                                <Form.Group className="login-input">
                                                    <Form.Label>Password:</Form.Label>
                                                    <Form.Control 
                                                        name="password"
                                                        type="password"
                                                        value={values.password} 
                                                        onChange={handleChange("password")} 
                                                        placeholder="Enter password"
                                                        isInvalid={touched.password && !!errors.password}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.password}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button variant="secondary" onClick={resetForm}>Clear</Button>{' '}
                                                <Button variant="danger" type="submit" onClick={handleSubmit}>Let's Go!</Button>
                                            </Form>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Card.Text>Don't have an account? You can register here.</Card.Text>
                                            <Link to={'/register'}>
                                                <Button 
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    type="submit">
                                                    Register
                                                </Button>
                                            </Link>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        )}
                    </Formik>
                </Container>
            );
}

