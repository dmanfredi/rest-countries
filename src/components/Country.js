import React from 'react';
import './Country.css';

const Country = ({ flag, title, pop, region, capital }) => {
  return (
    <div className="country-container">
      <div className="flag-container">
        <img src={flag} alt="Flag" className="country-flag" />
      </div>
      <div className="country-content">
        <div className="country-title">{title}</div>
        <div className="country-detail-container">
          <div className="country-detail-head">Population:&nbsp;</div>
          <div className="country-detail-value">
            {pop.toLocaleString('en-US')}
          </div>
        </div>
        <div className="country-detail-container">
          <div className="country-detail-head">Region:&nbsp;</div>
          <div className="country-detail-value">{region}</div>
        </div>
        <div className="country-detail-container">
          <div className="country-detail-head">Capital:&nbsp;</div>
          <div className="country-detail-value">{capital}</div>
        </div>
      </div>
    </div>
  );
};

export default Country;
