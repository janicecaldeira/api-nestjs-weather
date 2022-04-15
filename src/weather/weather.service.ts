import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom, Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { AxiosResponse } from 'axios'
import { WeatherRequest } from './weather.request'
import { WeatherResponse } from './weather.response'
import { LocationResponse } from './location.response'
import { LocationDto } from './location.dto'

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger
  ) {}

  getWeatherFromApi(params: WeatherRequest): Observable<any> {
    return this.httpService
      .get('https://api.openweathermap.org/data/2.5/weather/', { params })
      .pipe(
        map((response: AxiosResponse<any>) => {
          return WeatherResponse.fromJsonWeatherApi(response)
        }) as any,
        catchError(error => {
          const errorMessage = {
            status: error?.status ?? 'INVALID_CITY',
            message: error?.message ?? 'Invalid city'
          }
          this.logger.error({
            error,
            ...errorMessage
          })
          throw new BadRequestException(errorMessage)
        })
      )
  }

  async getLocation(
    params: WeatherRequest
  ): Promise<Observable<LocationResponse>> {
    const response = await firstValueFrom(this.getWeatherFromApi(params))
    const coord = response.coord

    return this.httpService
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${coord.lat}&lon=${coord.lon}&format=jsonv2&zoom=18`
      )
      .pipe(
        map((response: AxiosResponse<any>) => {
          return LocationResponse.fromJsonLocationApi(response)
        }) as any,
        catchError(error => {
          const errorMessage = {
            status: error?.status ?? 'INVALID_COORDINATES',
            message: error?.message ?? 'Invalid coordinates'
          }
          this.logger.error({
            error,
            ...errorMessage
          })
          throw new BadRequestException(errorMessage)
        })
      )
  }

  async getAdress(params: WeatherRequest) {
    const response = await firstValueFrom(await this.getLocation(params))

    return response.address
  }
}
