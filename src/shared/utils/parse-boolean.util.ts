// This utility is to parse boolean string into boolean values, useful for cookies and cors or env values.
export function parseBoolean(value: string): boolean {
	if (typeof value === 'boolean') {
		return value
	}

	if (typeof value === 'string') {
		const lowerValue = value.trim().toLowerCase()
		if (lowerValue === 'true') {
			return true
		}
		if (lowerValue === 'false') {
			return false
		}
	}

	throw new Error(
		`Не удалось преобразовать значение "${value}" в логическое значение.`
	)
}
