import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import './genre-view.css';

export class GenreView extends React.Component {
    render() {
        const { genre, movie, onBackClick } = this.props;

        return (
            <Container>
                <IoArrowBackCircleSharp className='back-arrow-genre' onClick={onBackClick}/> 
                <Row>
                    <Col>
                        <Card className="genre-card" style={{ backgroundColor:'#333'}}>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item><span className="genre-label">{genre.Name} Genre</span></ListGroup.Item>
                                    <ListGroup.Item><span className="label">Description: </span></ListGroup.Item>
                                    <ListGroup.Item>{genre.Description}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};