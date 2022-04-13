export class LocationResponse {
  static fromJsonLocationApi(response: any) {
    const jsonLocation = new LocationResponse()
    jsonLocation.place_id = response.data.place_id
    jsonLocation.licence = response.data.licence
    jsonLocation.osm_type = response.data.osm_type
    jsonLocation.osm_id = response.data.osm_id
    jsonLocation.lat = response.data.lat
    jsonLocation.lon = response.data.lon
    jsonLocation.place_rank = response.data.place_rank
    jsonLocation.category = response.data.category
    jsonLocation.type = response.data.type
    jsonLocation.importance = response.data.importance
    jsonLocation.addresstype = response.data.addresstype
    jsonLocation.display_name = response.data.display_name
    jsonLocation.name = response.data.name
    jsonLocation.address = response.data.address
    jsonLocation.boundingbox = response.data.boundingbox

    return jsonLocation
  }
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  lat: string
  lon: string
  place_rank: string
  category: string
  type: string
  importance: string
  addresstype: string
  display_name: string
  name: string
  address: JSON
  boundingbox: string
}
