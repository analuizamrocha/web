export function csvEncode(value) {
  const text = String(value ?? '')
  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

export function csvParseLine(line) {
  const cols = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (char === ',' && !inQuotes) {
      cols.push(current)
      current = ''
      continue
    }

    current += char
  }

  cols.push(current)
  return cols
}

export function parseCsv(content) {
  const sanitized = content.replace(/^\uFEFF/, '').trimEnd()
  const lines = sanitized.split(/\r?\n/)

  if (lines.length === 0) {
    throw new Error('CSV file is empty.')
  }

  const header = csvParseLine(lines[0])
  const rows = lines.slice(1).map((line) => {
    const values = csvParseLine(line)
    const row = {}

    for (let i = 0; i < header.length; i += 1) {
      row[header[i]] = values[i] ?? ''
    }

    return row
  })

  return { header, rows }
}

export function stringifyCsv(header, rows, { withBom = false } = {}) {
  const lines = [header.map(csvEncode).join(',')]

  for (const row of rows) {
    lines.push(header.map((key) => csvEncode(row[key] ?? '')).join(','))
  }

  const output = `${lines.join('\n')}\n`
  return withBom ? `\uFEFF${output}` : output
}

export function csvToTsv(csvContent) {
  const { header, rows } = parseCsv(csvContent)
  const lines = [header.join('\t')]

  for (const row of rows) {
    lines.push(
      header
        .map((key) =>
          String(row[key] ?? '')
            .replace(/\t/g, ' ')
            .replace(/\r?\n/g, ' ')
        )
        .join('\t')
    )
  }

  return `${lines.join('\n')}\n`
}
