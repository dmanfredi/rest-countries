import React from 'react';
import './FilterMenu.css';

const FilterMenu = ({ setRegionFilter }) => {
  return (
    <div className="filter-menu-container slide-in-top">
      <div
        className="filter-menu-choice"
        onClick={() => setRegionFilter('All')}
      >
        All
      </div>
      <div
        className="filter-menu-choice"
        onClick={() => setRegionFilter('Africa')}
      >
        Africa
      </div>
      <div
        className="filter-menu-choice"
        onClick={() => setRegionFilter('Americas')}
      >
        Americas
      </div>
      <div
        className="filter-menu-choice"
        onClick={() => setRegionFilter('Asia')}
      >
        Asia
      </div>
      <div
        className="filter-menu-choice"
        onClick={() => setRegionFilter('Europe')}
      >
        Europe
      </div>
      <div
        className="filter-menu-choice"
        onClick={() => setRegionFilter('Oceania')}
      >
        Oceania
      </div>
    </div>
  );
};

export default FilterMenu;
