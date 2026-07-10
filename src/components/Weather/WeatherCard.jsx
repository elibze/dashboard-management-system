import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaWind, FaTemperatureHigh } from "react-icons/fa";

function getWeathericon(code) {
    if(code === 0) {
        return <FaSun size={45} className="text-warning"/>;
    }

    if([1,2,3].includes(code)){
        return <FaCloud size={45} className="text-secondary"/>;
    }

    if([51,53,55,61,63,65].includes(code)) {
        return <FaCloudRain size={45} className="text-primary"/>;
    }

    if([71,73,75].includes(code)) {
        return <FaSnowflake size={45} className="text-info"/>;
    }

    if([95,96,99].includes(code)) {
        return <FaBolt size={45} className="text-warning"/>;
    }

    return <FaCloud size={45}/>;
}

function getWeatherText(code) {
    const descriptions = {
        0:"Clear sky",
        1:"Mostly clear",
        2:"Partly cloudy",
        3:"Cloudy",
        45: "Fog",
        51:"Light drizzle",
        61:"Rain",
        71:"Snow",
        95: "Thunderstorm"
    }

    return descriptions[code] || "Unknown";
}

export default function WeatherCard({weather}) {
    
    if (!weather || !weather.current_weather){
        return (
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5> Weather currently unavailable. </h5>
                </div>
            </div>
        );
    }

    const current = weather.current_weather;

    return (
        <div className="card shadow-sm border-0 weather-card">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-12 col-md-8">

                        <h5 className="fw-bold mb-1">
                            Today's Weather
                        </h5>

                        <p className="text-muted mb-3">
                            Riga, Latvia
                        </p>
                    

                        <div className="d-flex align-items-center gap-3">
                            {getWeathericon(current.weathercode)}

                            <div>

                                <h1 className="display-4 fw-bold mb-0">
                                    {Math.round(current.temperature)}°C
                                </h1>

                                <p className="text-muted fs-5 mb-0">

                                    {
                                        getWeatherText(
                                            current.weathercode
                                        )
                                    }
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mt-4 mt-md-0">

                        <div className="weather-info">

                            <div className="weather-item">
                                <FaWind/>
                                <span> Wind </span>
                                <strong> {current.windspeed} km/h </strong>
                            </div>

                            <div className="weather-item">
                                <FaTemperatureHigh/>
                                <span> Temperature </span>
                                <strong> Current </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}