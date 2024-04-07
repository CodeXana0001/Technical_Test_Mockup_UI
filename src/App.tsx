import React from 'react';
import background from './assets/bg-light.png';
import cloud from './assets/cloud.png';
import sun from './assets/sun.png';
import Input from './components/Input';
import './App.css';
import SearchIcon from "./components/SearchIcon";
import HistoryItem, {HistoryItemProps} from './components/HistoryItem';
import useApp from "./useApp";

function App() {
    const {
        inputRef,
        weather,
        historyList,
        handleSearchBarClick,
        handleItemSearchClick,
        handleItemDeleteClick,
    } = useApp();

  return (
    <div>
      <img src={background} className="Background" alt="background-image" />
      <div className="Content">
          <div>
              <div style={{ display: 'flex', gap: 15}}>
                  <form>
                      <Input label="Country" type="text" placeholder="" inputRef={inputRef}/>
                  </form>
                  <div className="SearchIconButton" onClick={handleSearchBarClick}>
                      <SearchIcon size={30} color="white"/>
                  </div>
              </div>
              <div className="MainInfo" style={{marginTop: 50}}>
                  <img src={weather.main === 'Rain' ? cloud : sun} className="WeatherIcon" alt="background-image" />
                  <div style={{width: '100%'}}>
                      <p>Today's Weather</p>
                      <p className="Temperature">{weather.temp ?? '-'}&deg;</p>
                      <p>H: {weather.maxTemp}&deg; L: {weather.minTemp}&deg;</p>
                      <p style={{color: 'grey', marginTop: 10}}>
                          <span style={{marginRight: 10}}>{weather.city ?? '-'}, {weather.country ?? '-'}</span>
                          <span style={{marginRight: 10}}>{weather.searchTime ?? '-'}</span>
                          <span style={{marginRight: 10}}>humidity: {weather.humidity ?? '-'}</span>
                          <span>{weather.main ?? '-'}</span>
                      </p>
                      <div className="MainInfo" style={{marginTop: 15}}>
                          <p>Search History</p>
                          <div style={{gap: 10, marginTop: 20}}>
                              {
                                  historyList.map((item: HistoryItemProps, key: number) => {
                                      return (
                                          <HistoryItem
                                              key={key}
                                              item={item}
                                              handleItemSearchClick={handleItemSearchClick}
                                              handleItemDeleteClick={handleItemDeleteClick}/>
                                      )
                                  })
                              }
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
