import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    const user = JSON.parse(getUser);
    setUserEmail(user.email);
  }, []);

  const logoff = () => {
    console.log('Aoba');
    localStorage.clear();
    history.push('/');
  };

  const done = () => {
    history.push('/done-recipes');
  };

  const favorite = () => {
    history.push('/favorite-recipes');
  };

  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{ userEmail }</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ done }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ favorite }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoff }
      >
        Logout
      </button>
      <Footer />

    </div>
  );
}
