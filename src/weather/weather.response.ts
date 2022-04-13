export class WeatherResponse {
  static fromJsonWeatherApi(response: any) {
    const jsonWeather = new WeatherResponse()
    jsonWeather.coord = response.data.coord
    jsonWeather.weather = response.data.weather
    jsonWeather.base = response.data.base
    jsonWeather.main = response.data.main
    jsonWeather.visibility = response.data.visibility
    jsonWeather.wind = response.data.wind
    jsonWeather.clouds = response.data.clouds
    jsonWeather.dt = response.data.dt
    jsonWeather.sys = response.data.sys
    jsonWeather.timezone = response.data.timezone
    jsonWeather.id = response.data.id
    jsonWeather.name = response.data.name
    jsonWeather.cod = response.data.cod

    return jsonWeather
  }
  coord: JSON
  weather: Array<any>
  base: string
  main: JSON
  visibility: number
  wind: JSON
  clouds: JSON
  dt: number
  sys: JSON
  timezone: number
  id: number
  name: string
  cod: number
}
