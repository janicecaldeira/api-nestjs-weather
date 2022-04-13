import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { WeatherRequest } from './weather.request'
import { WeatherResponse } from './weather.response'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOkResponse({
    description: 'Correct weather response',
    type: WeatherResponse
  })
  getWeatherFromApi(@Query() params: WeatherRequest) {
    return this.weatherService.getWeatherFromApi(params)
  }

  @Get('/location')
  getLocation() {
    return this.weatherService.getLocation()
  }
}
