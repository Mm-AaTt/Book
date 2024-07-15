import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookList from './components/Books/BookList';
import BookDetail from './components/Books/BookDetail';
import AuthorList from './components/Authors/AuthorList';
import AuthorDetail from './components/Authors/AuthorDetail';
import UserProfile from './components/Profile/UserProfile';
import EditProfile from './components/Profile/EditProfile';
import './assets/styles/style.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/books" exact component={BookList} />
            <Route path="/books/:bookId" component={BookDetail} />
            <Route path="/authors" exact component={AuthorList} />
            <Route path="/authors/:authorId" component={AuthorDetail} />
            <Route path="/user/profile" exact component={UserProfile} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
