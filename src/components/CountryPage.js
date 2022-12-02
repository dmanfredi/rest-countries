import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import cca3 from '../CCA3';
import './CountryPage.css';
import './Country.css';
import BackArrow from '../images/arrow-back-outline.svg';
import BackArrowDark from '../images/arrow-back-outline-dark-theme.svg';
import { Oval } from 'react-loader-spinner';

// {Object.keys(countryPageData.languages)
//   .map((lang) => countryPageData.languages[lang])
//   .reduce((prev, curr) => (prev += curr + ', '), '')
//   .slice(0, -2)}

const CountryPage = ({ theme }) => {
  const { country } = useParams();
  const [countryPageData, setCountryPageData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCountryData();
  }, [country]);

  async function fetchCountryData() {
    // let response = fetch('https://restcountries.com/v3.1/alpha/ger').then((res) =>
    //   res.json().then((res) => console.log(res))
    // );
    let res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) {
      setError(`Error ${res.status}: ${res.statusText}`);
      console.log(`Error ${res.status}: ${res.statusText}`);
      return;
    }
    let content = (await res.json())[0];
    let contentForm = {
      flag: content.flags.png,
      title: content.name.common,
      nativeName: content.name.nativeName,
      pop: content.population,
      region: content.region,
      subregion: content.subregion,
      capital: content.capital,
      tld: content.tld[0],
      currencies: content.currencies,
      languages: content.languages,
      borders: content.borders,
    };

    // document.querySelector('.iconer').href = contentForm.flag;
    setCountryPageData(contentForm);
  }

  return (
    <>
      {error ? (
        <div class="error-message-container">
          <div className="error-message">{error}</div>
        </div>
      ) : countryPageData.title ? (
        <>
          <div className="back-container">
            <Link to={`/`} style={{ textDecoration: 'none' }}>
              <div role="button" className="back-button">
                <img
                  src={theme === 'light' ? BackArrow : BackArrowDark}
                  alt="Arrow"
                  className="back-arrow-icon"
                />
                <div className="back-text">Back</div>
              </div>
            </Link>
          </div>
          <div className="all-details-container">
            <div className="page-flag-container">
              <img
                src={countryPageData.flag}
                alt="Flag"
                className="page-country-flag"
              />
            </div>

            <div className="details-group-container">
              <div className="page-title">{countryPageData.title}</div>
              <div className="first-detail-group detail-group">
                <div className="country-detail-container native-names">
                  <div className="country-detail-head">Native Names:&nbsp;</div>
                  {countryPageData.nativeName
                    ? Object.keys(countryPageData.nativeName).map((lang, i) => (
                        <div key={i}>
                          [{countryPageData.languages[lang]}]&nbsp;
                          {countryPageData.nativeName[lang].common}&nbsp;
                        </div>
                      ))
                    : 'None'}
                </div>
                <div className="country-detail-container">
                  <div className="country-detail-head">Population:&nbsp;</div>
                  <div className="country-detail-value">
                    {countryPageData.pop.toLocaleString('en-US')}
                  </div>
                </div>
                <div className="country-detail-container">
                  <div className="country-detail-head">Region:&nbsp;</div>
                  <div className="country-detail-value">
                    {countryPageData.region}
                  </div>
                </div>
                <div className="country-detail-container">
                  <div className="country-detail-head">Sub Region:&nbsp;</div>
                  <div className="country-detail-value">
                    {countryPageData.subregion}
                  </div>
                </div>
                <div className="country-detail-container">
                  <div className="country-detail-head">Capital:&nbsp;</div>
                  <div className="country-detail-value">
                    {countryPageData.capital}
                  </div>
                </div>
              </div>
              <div className="second-detail-group detail-group">
                <div className="country-detail-container">
                  <div className="country-detail-head">
                    Top Level Domain:&nbsp;
                  </div>
                  <div className="country-detail-value">
                    {countryPageData.tld}
                  </div>
                </div>
                <div className="country-detail-container currencies">
                  <div className="country-detail-head">Currencies:&nbsp;</div>

                  {countryPageData.currencies
                    ? Object.keys(countryPageData.currencies).map((curr, i) => (
                        <div key={i}>
                          {countryPageData.currencies[curr].name}
                          {i + 1 !==
                          Object.keys(countryPageData.currencies).length
                            ? ','
                            : ''}
                          &nbsp;
                        </div>
                      ))
                    : 'None'}
                </div>
                <div className="country-detail-container languages">
                  <div className="country-detail-head">Languages:&nbsp;</div>
                  {countryPageData.languages
                    ? Object.keys(countryPageData.languages).map((lang, i) => (
                        <div key={i}>
                          {countryPageData.languages[lang]}
                          {i + 1 !==
                          Object.keys(countryPageData.languages).length
                            ? ','
                            : ''}
                          &nbsp;
                        </div>
                      ))
                    : 'None'}
                </div>
              </div>
              <div className="border-countries-container">
                <div className="border-countries-title">
                  Border Countries:&nbsp;
                </div>
                {countryPageData.borders ? (
                  countryPageData.borders.map((border, i) => (
                    <Link
                      to={`/${cca3[border].toLocaleLowerCase()}`}
                      style={{ textDecoration: 'none' }}
                      key={i}
                    >
                      <div className="border-country" key={i}>
                        {cca3[border]}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="border-country">None</div>
                )}
              </div>
            </div>
          </div>
        </>
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

export default CountryPage;
