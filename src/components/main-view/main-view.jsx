import React from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './main-view.css';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar/navbar';
import ScrollToTop from "../ScrollToTop/ScrollToTop";

class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    // Persists authorization so user doesn't have to login again after refreshing page
    let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user'),
        });
        this.getMovies(accessToken);
      }
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that particular user
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
     })

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // GETS list of movies once the user is logged in
  getMovies(token) {
    axios.get('https://powerful-coast-48240.herokuapp.com/movies', {
      headers: { Authorization:`Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <Row className="main-view justify-content-center">
          <Route exact path="/" 
                 render={() => {
            
            /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
            passed as a prop to the LoginView */
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              );

            // Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view"/>;   

            return movies.map(m => (
              <Col className="movie-card-col"  xs="auto" key={m._id}>
                <NavbarView user={user} /> 
                <MovieCard movie={m} />      
              </Col>
            ))
          }} />

          
          <Route path="/register" 
                 render={() => {
            if (user) return <Redirect to="/" />
            
            return <Col>
                      <RegistrationView />
                   </Col> 
          }} />

          
          <Route path="/movies/:movieId" 
                 render={({ match, history }) => {
            if (!user) return <Col>
                                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                              </Col>;
            
            if (movies.length === 0) return <div className="main-view" />;  
            
            return <Col>
                    <NavbarView user={user} /> 
                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
                  </Col>
          }} />

          
          <Route path="/directors/:name" 
                 render={({ match, history }) =>{
            if (!user) return <Col>
                                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                               </Col>;
            
            if (movies.length === 0) return <div className="main-view" />;
            
            return <Col>
                    <NavbarView user={user} /> 
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>
            }
          } />

          
          <Route path="/genres/:name" 
                 render={({ match, history  }) =>{
             if (!user) return <Col>
                                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>;

             if (movies.length === 0) return <div className="main-view" />;
             
             return <Col>
                     <NavbarView user={user} /> 
                     <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                                movies={movies} 
                                onBackClick={() => history.goBack()} />
                    </Col>
            }
          } />

          {/* Route for link on main-view to profile-view */}
          <Route path={'/users/:Username'} 
                 render={( { history, match } ) => {

            if (!user) return <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                              </Col>;

            if (movies.length === 0) return <div className="main-view" />;

            
            return <Col>
                      <NavbarView user={user} /> 
                      <ProfileView movies={movies}
                                   user={user === match.params.Username}
                                   onBackClick={() => history.goBack()}
                      />
                  </Col>
          }} />
  
        
        </Row>
      </Router>
    );
  }
}
                    
export default MainView;         


