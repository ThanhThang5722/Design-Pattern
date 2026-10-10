interface WeatherAPI {
    getWeather(city: string): string;
}
class WeatherService implements WeatherAPI {
    getWeather(city: string): string {
        console.log(`[API] Calling weather API for ${city}...`);
        return `Weather in ${city}: 30C, Sunny`;
    }
}

class CachingWeatherProxy implements WeatherAPI {
    private cache: Map<string, { result: string; timestamp: number }> = new Map();

    constructor(private weatherService: WeatherService) {}

    getWeather(city: string): string {
        const TTL = 10_000; // 10 giây
        const cached = this.cache.get(city);
        if (cached && Date.now() - cached.timestamp < TTL) {
            console.log(`[Cache] Hit for ${city}`);
            return cached.result;
        }
        const result = this.weatherService.getWeather(city);
        this.cache.set(city, {result, timestamp: Date.now()});
        return result;
    }
}