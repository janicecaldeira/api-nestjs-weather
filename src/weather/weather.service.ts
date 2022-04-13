import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom, Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { AxiosResponse } from 'axios'
import { WeatherRequest } from './weather.request'
import { WeatherResponse } from './weather.response'
import { LocationResponse } from './loaction.response'

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger
  ) {}

  getWeatherFromApi(params: WeatherRequest): Observable<WeatherResponse> {
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

  getLocation(): Observable<LocationResponse> {
    const lat = '-14.6589835'
    const lon = '-49.3091405'

    console.log(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}`
    )

    return this.httpService
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
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
}
