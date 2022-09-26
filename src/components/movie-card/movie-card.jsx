import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.css';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props; // Extracts MovieCard data
        
        return (
        <div className="movie-card">
            <Link to={`/movies/${movie._id}`}>
                <Card.Img className="card-image" src={movie.ImagePath} />
            </Link>
        </div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired,
};