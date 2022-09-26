import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, ListGroup, Col, Row } from 'react-bootstrap';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import './director-view.css';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick, movies } = this.props;

        return (
            <Container>
            <IoArrowBackCircleSharp className='back-arrow-director' onClick={onBackClick}/> 
            <Card className='director-info' style={{ backgroundColor:'#333'}}>
                <Card.Body>
                    <Row>
                        <Col>
                            <ListGroup className="dir-info-list">
                                <ListGroup.Item><span className="director-label">Director Info</span></ListGroup.Item>
                                <ListGroup.Item><span className="label">Name: </span>{director.Name}</ListGroup.Item>
                                <ListGroup.Item><span className="label">Bio:  </span>{director.Bio}</ListGroup.Item>
                                <ListGroup.Item><span className="label">Birthyear: </span>{director.Birth}</ListGroup.Item>
                                <ListGroup.Item><span className="label">Deathyear: </span>{director.Death}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <div className='dir-img-wrapper'>
                                <img className="director-photo" src={director.Photo} />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </Container>
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};