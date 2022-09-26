import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row, ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import './movie-view.css';

export class MovieView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            FavoriteMovies: [],
        }
    }

    getUser(token) {
        let user = localStorage.getItem('user');
        axios
          .get(`https://powerful-coast-48240.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            //assign the result to the state
            this.setState({
              FavoriteMovies: response.data.FavoriteMovies,
            });
          })
          .catch((e) => console.log(e));
      }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
      }

    addFavMovie = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);
        if (!isFav) {
          axios.put(`https://powerful-coast-48240.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((response) => {
              alert(
                `${this.props.movie.Title} has been added to your favorites!`
              );
              window.open(`/movies/${this.props.movie._id}`, "_self");
            })
            .catch(e => {
              console.log('Error')
            });
        } else if (isFav) {
          alert(
            `${this.props.movie.Title} is already on your favorites list!`
          );
        }
      }

      removeFavMovie = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        axios.delete(`https://powerful-coast-48240.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            alert(
              `${this.props.movie.Title} has been removed from your favorites!`
            );
            window.open(`/movies/${this.props.movie._id}`, "_self");
          })
          .catch(e => {
            console.log('Error')
          });
      }


    render() {
        const { movie, onBackClick } = this.props;
        const { FavoriteMovies } = this.state;
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);

        return (
            <Container className="movie-view">
              <IoArrowBackCircleSharp className='back-arrow' onClick={onBackClick}/>
                      <Card className="movie-info" style={{ backgroundColor:'#333'}}>
                        <Row>
                          <Col>
                            <ListGroup className="info-list">
                              <ListGroup.Item className="movie-title">{movie.Title}</ListGroup.Item>
                              <ListGroup.Item className="movie-genre">
                                <span className="label">Genre: </span><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></ListGroup.Item>
                              <ListGroup.Item className="movie-director">
                                <span className="label">Director: </span><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></ListGroup.Item>
                              <ListGroup.Item className="release-year">
                                <span className="label">Released: </span>{movie.Released}</ListGroup.Item>
                              <ListGroup.Item><span className="label">Summary: </span>{movie.Description}</ListGroup.Item> 
                            </ListGroup>
                            {!isFav && (
                            <Button  className="fav-button" variant="primary" onClick={this.addFavMovie}>Add to Favorites</Button>
                            )}
                            {isFav && (
                            <Button  className="fav-button" variant="warning" onClick={this.removeFavMovie}>Remove from Favorites</Button>
                            )}
                          </Col>
                          <Col>
                          <div className="img-wrapper">
                              <img 
                                className="movie-poster" 
                                src={movie.ImagePath}
                              />
                          </div>
                          </Col>
                        </Row>
                      </Card> 
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Released: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired
        }),
    }).isRequired,
};