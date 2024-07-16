import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AddBook from './components/Authors/AddBook'; // Import the new AddBook component
import './assets/styles/style.css';

const PrivateRoute = ({ element, ...rest }) => {
  const role = localStorage.getItem('role');
  return role === '1' ? element : <Navigate to="/login" />;
};

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
            <Route path="/authors/:authorId" element={<PrivateRoute element={<AuthorDetail />} />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/author/addbook" element={<PrivateRoute element={<AddBook />} />} /> {/* Added route for AddBook */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
