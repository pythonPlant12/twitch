import type { Request } from 'express'
import { lookup } from 'geoip-lite'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'
import { IS_DEV_ENV } from '@/src/shared/utils/is-dev.util'

import DeviceDetector = require('device-detector-js')

export function getSessionMetadata(
	req: Request,
	userAgent: string
): SessionMetadata {
	const ip = getIp(req)
	console.log('ip', ip)
	const device = new DeviceDetector().parse(userAgent)
	const location = lookup(ip)
	return {
		location: {
			country: location?.country || 'Неизвестно',
			city: location?.city,
			latitude: location?.ll[0] || 0,
			longitude: location?.ll[1] || 0
		},
		device: {
			browser: device.client.name,
			os: device.os.name,
			type: device.device.type
		},
		ip
	}
}

/* To get ip address from headers */
function getIp(req: Request): string {
	let ip: string

	if (IS_DEV_ENV) {
		ip = '195.235.92.26'
	} else {
		if (Array.isArray(req.headers['cf-connecting-ip'])) {
			ip = req.headers['cf-connecting-ip'][0]
		} else {
			const cfIp = req.headers['cf-connecting-ip']
			if (cfIp) {
				ip = cfIp
			} else {
				const forwardedFor = req.headers['x-forwarded-for']
				if (typeof forwardedFor === 'string') {
					ip = forwardedFor.split(',')[0]
				} else {
					ip = req.ip
				}
			}
		}
	}
	return ip
}
