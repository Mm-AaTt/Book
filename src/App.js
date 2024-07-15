import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:bookId" element={<BookDetail />} />
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/:authorId" element={<AuthorDetail />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
