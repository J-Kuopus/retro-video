import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.css';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Formik } from 'formik';
import * as yup from 'yup';

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);

  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // GETS user info
  const getUser = () => {
    axios.get(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavoriteMovies(response.data.FavoriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  //DELETES user profile
  const handleDelete = () => {
    axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The profile ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

  const renderFavourites = () => {
    if (movies.length + 0) {

      return (
        <Row className="justify-content-md-center">

          {favoriteMovies.length === 0 ? (<p>Add some movies to your list</p>) : (
            favoriteMovies.map((movieId, i) => (
              <Col className="fav-list" md={6} lg={4} key={`${i}-${movieId}`} >
                <MovieCard movie={movies.find(m => m._id == movieId)} />
              </Col>
            ))
          )}

        </Row>
      )
    }
  }

    return (

      <Container>
        <Formik
           validationSchema={yup.object({
            username: yup.string()
            .min(5, 'Must be at least 5 characters')
            .required('Required'),
            password: yup.string()
            .min(6, 'Must be at least 6 characters')
            .required('Required'),
            email: yup.string().email('Invalid email').required('Required'),
            birthday: yup.string(),
            })}

            onSubmit={(values, { resetForm }) => {
              resetForm();
              axios.put(`https://powerful-coast-48240.herokuapp.com/users/${currentUser}`, {
                  Username: values.username,
                  Password: values.password,
                  Email: values.email,
                  Birthday: values.birthday
              },
              {
                headers: { Authorization: `Bearer ${token}`}
              })
              .then(response => {
                  alert('Profile was successfully updated!');
                  localStorage.setItem('user', response.data.Username);
                  window.open('/users/' + response.data.Username, '_self');
              })
              .catch(error => {
                  console.error(error);
                  alert('Unable to update profile! Please check that your data is correct.');
              });
          }}

            initialValues={{
              username: "",
              password: "",
              email: "",
              birthday: ""
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
                  <div className="profile-view">
                    <Link to={'/'}>
                      <IoArrowBackCircleSharp className='profile-back-arrow'/>
                    </Link>
                    <Row>
                      <Col>
                        <Card className="profile-card">
                          <Card.Body>
                            <h1>Profile</h1>
                            <ListGroup>
                              <ListGroup.Item className="profile-text"><span className="label">Username: </span>{user.Username}</ListGroup.Item>
                              <ListGroup.Item className="profile-text"><span className="label">Password: </span>******</ListGroup.Item>
                              <ListGroup.Item className="profile-text"><span className="label">Email: </span>{user.Email}</ListGroup.Item>
                              <ListGroup.Item className="profile-text"><span className="label">Birthday: </span>{user.Birthday}</ListGroup.Item>
                            </ListGroup>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="edit-card">
                          <Card.Body> 
                            <h2>Edit profile</h2>
                            <Card.Header>Enter the info you would like to change here.</Card.Header>
                            <Form className="edit-form">
                              <Form.Group className="edit-input">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  value={values.username} 
                                  onChange={handleChange("username")} 
                                  placeholder="Enter new username"
                                  isInvalid={touched.username && !!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.username}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className="edit-input">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                  type="password" 
                                  value={values.password} 
                                  onChange={handleChange("password")} 
                                  placeholder="Enter new password"
                                  isInvalid={touched.password && !!errors.password} 
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className="edit-input">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                  type="email" 
                                  value={values.email} 
                                  onChange={handleChange("email")} 
                                  placeholder="Enter new email"
                                  isInvalid={touched.email && !!errors.email} 
                                />
                                <Form.Text className="muted">
                                  We'll never share your email with anyone else.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                  {errors.email}
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className="edit-input">
                                <Form.Label>Birthday:</Form.Label>
                                  <Form.Control 
                                    type="date" 
                                    value={values.birthday} 
                                    onChange={handleChange("birthday")} 
                                    placeholder="Enter birthdate (optional)"
                                  />
                              </Form.Group>
                              <Button variant="secondary" onClick={resetForm}>Clear</Button>{' '}
                              <Button  variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                            </Form>
                          </Card.Body>
                          <Card.Footer>
                            <Card.Text>Click here to delete your profile. This cannot be undone.</Card.Text>
                            <Button className="delete-button" variant="danger" onClick={handleDelete}>Delete profile</Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <p></p>
                      <p></p>
                      <Card className="fav-card">
                        <Card.Body>
                          <h3>Favorite Movies</h3>
                          {renderFavourites()}
                        </Card.Body>
                      </Card>
                    </Row>
                  </div>
                )}
        </Formik>
      </Container>
    );
}
