export interface LocationInfo {
	country: string
	city: string
	latitude: number
	longitude: number
}

export interface DeviceInfo {
	browser: string
	os: string
	type: string
}

/*
Dependencies used for getting session metadata:
  - geoip-lite - for country code of ip
  - device-detector-js - for device detection
  - i18n-iso-countries - for country name by country code
*/
export interface SessionMetadata {
	location: LocationInfo
	device: DeviceInfo
	ip: string
}
