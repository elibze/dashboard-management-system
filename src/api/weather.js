export async function getWeather() {
    const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=56.9496&longitude=24.1052&current_weather=true"
    );

    if(!response.ok) {
        throw new Error("Weather currently unavailable.");
    }
    
    const data = await response.json();

    return data;
}