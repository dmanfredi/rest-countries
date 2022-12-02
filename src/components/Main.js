import React from 'react';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Main.css';
import MenuArrow from '../images/chevron-down-outline.svg';
import MenuArrowDark from '../images/chevron-down-outline-dark-theme.svg';
import FilterMenu from './FilterMenu';
import Country from './Country';
import EarthIcon from '../images/earth-icon2.png';

const Main = ({ theme }) => {
  const [countryData, setCountryData] = useState([]);

  const [inFilterMenu, toggleFilterMenu] = useState(false);
  const [regionFilter, setRegionFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchCountryData();
    // document.querySelector('.iconer').href = { EarthIcon };
  }, []);

  function handleToggleFilterMenu() {
    if (inFilterMenu) {
      document.querySelector('.filter-icon').classList.remove('flip');
      document.querySelector('.filter-icon').classList.add('unflip');
      document
        .querySelector('.filter-menu-container')
        .classList.add('slide-out-top');
      setTimeout(() => toggleFilterMenu(!inFilterMenu), 200);
    } else {
      document.querySelector('.filter-icon').classList.remove('unflip');
      document.querySelector('.filter-icon').classList.add('flip');
      toggleFilterMenu(true);
    }
  }

  async function fetchCountryData() {
    // let response = fetch('https://restcountries.com/v3.1/alpha/ger').then((res) =>
    //   res.json().then((res) => console.log(res))
    // );
    let res = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags'
    );
    if (!res.ok) {
      console.log(res);
      return;
    }
    let content = await res.json();
    let countryDataTemp = [];

    for (let country of content) {
      let contentForm = {
        flag: country.flags.png,
        title: country.name.common,
        pop: country.population,
        region: country.region,
        capital: country.capital,
      };

      countryDataTemp.push(contentForm);
    }

    setCountryData([...countryDataTemp]);
  }

  return (
    <>
      <div className="search-filter-container">
        <label className="input-icon">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a country..."
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </label>
        <div
          className="filter-container"
          onClick={() => handleToggleFilterMenu()}
        >
          <div className="filter-text">
            {regionFilter ? regionFilter : 'Filter By Region'}
          </div>
          <img
            src={theme === 'light' ? MenuArrow : MenuArrowDark}
            alt="Menu Arrow"
            className="filter-icon"
          />
          {inFilterMenu ? (
            <FilterMenu setRegionFilter={setRegionFilter}> </FilterMenu>
          ) : null}
        </div>
      </div>
      {countryData.length ? (
        <div className="countries-container">
          {countryData.map((country, i) => {
            // Perfectly readable
            if (
              !country.title
                .toLocaleLowerCase()
                .includes(searchFilter.toLocaleLowerCase()) ||
              (regionFilter !== '' &&
                regionFilter !== 'All' &&
                country.region.toLocaleLowerCase() !==
                  regionFilter.toLocaleLowerCase())
            )
              return;
            else
              return (
                <Link
                  to={`/${country.title.toLocaleLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                  key={i}
                >
                  <Country
                    flag={country.flag}
                    title={country.title}
                    pop={country.pop}
                    region={country.region}
                    capital={country.capital}
                    key={i}
                  ></Country>
                </Link>
              );
          })}
        </div>
      ) : (
        <Oval
          height={80}
          width={80}
          color="#7fe1ff"
          wrapperStyle={{ overflow: 'visible' }}
          wrapperClass="tester"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#7fe1ff"
          strokeWidth={2}
          strokeWidthSecondary={2}
          overflow="visible"
        />
      )}
    </>
  );
};

export default Main;
