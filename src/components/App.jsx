import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import Main from './Main/Main.jsx';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import { setToken, getToken, removeToken } from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import InfoTooltip from './Popup/components/InfoTooltip/InfoTooltip.jsx';

function App() {
  // auth hooks
  const [userData, setUserData] = useState({ email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // api hooks
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  const navigate = useNavigate();

  // auth logic

  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        handleOpenPopup({
          title: 'Success!',
          children: (
            <InfoTooltip
              message='Now you are a member of our community!'
              isSuccess={true}
            />
          ),
        });
        navigate('/signin');
      })
      .catch(() => {
        handleOpenPopup({
          title: 'Sorry, we have a problem.',
          children: (
            <InfoTooltip message='Please, try again.' isSuccess={false} />
          ),
        });
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData({ email });
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch(() => {
        handleOpenPopup({
          title: 'Sorry, we have a problem',
          children: (
            <InfoTooltip message='Please, try again.' isSuccess={false} />
          ),
        });
      });
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserData({ email: '' });
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    auth
      .checkToken(token)
      .then((res) => {
        const { email } = res.data;
        setIsLoggedIn(true);
        setUserData({ email });
      })
      .catch(console.error)
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  // api logic

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((error) => {
        console.error('Erro ao buscar cartões:', error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.isLiked;
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        setCardToDelete(null);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleDeleteClick(card) {
    setCardToDelete(card);
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
    setCardToDelete(null);
  }

  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleAddPictureSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  // page

  if (isCheckingAuth) {
    return;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPictureSubmit,
        handleCardDelete,
        cardToDelete,
      }}
    >
      <div className='page'>
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userData.email}
          onSignOut={handleLogout}
        />
        <Routes>
          <Route
            path='/signin'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login
                  handleLogin={handleLogin}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                />
              )
            }
          />
          <Route
            path='/signup'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register
                  handleRegistration={handleRegistration}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                />
              )
            }
          />
          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onDeleteClick={handleDeleteClick}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='*'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Navigate to='/signin' replace />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
