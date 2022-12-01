import React from 'react';
// import { IconContext } from 'react-icons';
// import { BsMoon } from 'react-icons/bs';
// import { HiOutlineMoon } from 'react-icons/hi';
import moon from '../images/moon-outline.svg';
import moonDarkTheme from '../images/moon-dark-theme.svg';
import './Header.css';

const Header = ({ setTheme, theme }) => {
  return (
    <header className="header-container">
      <h1 className="title">Where In The World?</h1>
      <div
        className="mode-toggle-container"
        role="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <img
          src={theme === 'light' ? moon : moonDarkTheme}
          alt="Sun/Moon"
          className="mode-toggle-icon"
        />
        <div className="mode-toggle-text">Dark Mode</div>
      </div>
    </header>
  );
};

export default Header;
