window.excelHelpers = {
	jsonToExcel(jsonRu, jsonEn) {
		const rows = []

		const getPath = (parent, key) => {
			if (!parent) return key

			return `${parent}${isNaN(key) ? `.${key}` : `[${key}]`}`
		}
		const pushRows = (objRu, objEn, path) => {
			Object.keys(objRu).forEach((key) => {
				const valueRu = objRu[key]
				const valueEn = objEn[key]
				const newPath = getPath(path, key)

				if (typeof valueRu === 'string') {
					rows.push([newPath, valueRu, valueEn])
					return
				}

				pushRows(valueRu, valueEn, newPath)
			})
		}

		pushRows(jsonRu, jsonEn, '')

		return this.getExcelRows(rows)
	},

	getExcelRows(rows) {
		return rows.map(cells => this.getExcelRow(cells)).join('\n')
	},

	getExcelRow(cells) {
		return cells.join('\t')
	},

	excelToJson(keys, values, deleteFirst = true) {
		keys = keys.trim().split('\n')
		values = values.trim().split('\n')

		if (deleteFirst) {
			keys.splice(0, 1)
			values.splice(0, 1)
		}

		return _.zipObjectDeep(keys, values)
	}
}
