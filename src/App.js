import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
function App() {
  const date = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[date.getDay()];
  const [time, setTime] = useState(date.toLocaleTimeString());

  const [result, setResult] = useState(null);

  useEffect(() => {
    getWeather();
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeather = () => {
    axios.get("https://api.weatherapi.com/v1/current.json?key=5ca888f4d41040d895460808231510&q=Ho_Chi_Minh")
      .then((res) => {
        setResult(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='box'>
      <div className='wave -one'></div>
      <div className='wave -two'></div>
      <div className='wave -three'></div>
      {result && (
        <div>
          <div className="weathercon"><img className='icon' src={result.current.condition.icon} alt='icon'/></div>
          
          <div className="info">
            <h5 className='condition'>{result.current.condition.text}</h5>
            <h2 className="location">{result.location.name}</h2>
            <p className="date">{dayName.toUpperCase()} | {date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).toUpperCase()} | {time}</p>
            <h1 className="temp">{Math.round(result.current.feelslike_c)} &deg;C | {Math.round(result.current.feelslike_f)} &deg;F</h1>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
