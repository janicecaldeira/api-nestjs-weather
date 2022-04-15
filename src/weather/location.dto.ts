import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class LocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  q: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  appid: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  units: string
}
