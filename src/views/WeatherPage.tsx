import { useEffect, useState } from "react";
import CurrentWeather from "../components/CurrentWeather/CurrentWeather";
import Header from "../components/Header/Header";
import Location from "../components/Location/Location";
import Search from "../components/Search/Search";
import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";


interface MyLocation {
  Latitude?: number;
  Longitude?: number;
  Area?: string;
  Country?: string;
}

interface Weather {
  Current: Currentweather;
  Daily: Array<Dailyweather>;
  Hourly: Array<Hourlyweather>;
  Minutely?: Array<Object>;
}
interface weather {
  main?: string;
  id?: number;
    icon?:string

}
interface Currentweather {
    temp?: number;
    feels_like?: number;
    wind_speed?: number;
    visibility?: number;
    humidity?: number;
    weather?: Array<weather>;
}
interface Dailyweather {
    temp?: Object;
    dt: number;
    wind_speed?: number;
    humidity?: number;
    sunrise?: number;
  weather?: Array<weather>;
}
interface Hourlyweather {
    temp?: Object;
    dt: number;
    wind_speed?: number;
    humidity?: number; 
  weather?: Array<weather>;
}

const WeatherPage = () => {
  const [location, setLocation] = useState<MyLocation>({
    Latitude: undefined,
    Longitude: undefined,
    Area: undefined,
    Country: undefined,
  });
  const [weather, setWeather] = useState<Weather>({
    Current: { temp: undefined, weather: [{}] },
    Daily: [],
    Hourly: [],
    Minutely: [],
  });

  const [city, setCity] = useState('')

  //361ac82e2185de2e626bb5ffa95f8289
  const API_ID: string = "e3a4e39f4c824772f7d35bc0b095f245";
  const LOCATION_API: string = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.Latitude}&lon=${location.Longitude}&appid=${API_ID}`;
  const WEATHER_API: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.Latitude}&lon=${location.Longitude}&units=metric&appid=${API_ID}`;
  useEffect(() => {
    if ("geolocation" in navigator) {
      if (location.Latitude === undefined || location.Longitude === undefined) {
        console.log("Available");
        navigator.geolocation.getCurrentPosition(function (position) {
          setLocation({
            ...location,
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        });
      }
    } else {
      console.log("Not Available");
    }
  }, [location]);

  useEffect(() => {
    if (
      location.Latitude !== undefined &&
      location.Longitude !== undefined &&
      location.Area === undefined
    ) {
      var requestOptions: Object = {
        method: "GET",
        redirect: "follow",
      };

      fetch(LOCATION_API, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          setLocation({
            ...location,
            Area: result[0].name,
            Country: result[0].country,
          })
        )
        .catch((error) => console.log("error", error));

      fetch(WEATHER_API, requestOptions)
        .then((response) => response.json())
        .then((result) =>
          setWeather({
            ...weather,
            Current: result.current,
            Daily: result.daily,
            Hourly: result.hourly,
            Minutely: result.minutely,
          })
        )
        .catch((error) => console.log("error", error));
    }
  }, [LOCATION_API, location, WEATHER_API, weather]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "50px",
          paddingBottom: "50px",
          alignItems: "center",
        }}
      >
        <Header />
        <Search city={city} setCity={setCity}/>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        //   marginLeft:'20px'
        }}
      >
        <Location location={location} />
        <CurrentWeather currentWeather={weather.Current} />
      </div>
      <div>
        <DailyWeather dailyWeather={weather.Daily} />
        <HourlyWeather hourlyWeather={weather.Hourly}/>
        </div>
    </div>
  );
};

export default WeatherPage;
