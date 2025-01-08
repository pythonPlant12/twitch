import 'express-session'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

declare module 'express-session' {
	interface SessionData {
		userId?: string
		createdAt?: Date | string
		metadata: SessionMetadata
	}
}
