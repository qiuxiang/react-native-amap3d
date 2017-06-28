const stdin = process.openStdin()
let data = ''

stdin.on('data', chunk => data += chunk)
stdin.on('end', () => docgen(JSON.parse(data)))

function docgen(docs) {
  const components = [
    'MapView',
    'Marker',
    'Polyline',
    'Polygon',
    'Circle',
  ]
  let markdown = ''
  components.forEach(componentName => {
    const doc = docs[`components/${componentName}.js`]
    markdown += `## ${componentName}\n`
    markdown += '### Props\n'
    for (let propName in doc.props) {
      const prop = doc.props[propName]
      const type = formatPropName(prop)
      markdown += `#### ${propName}: ${type} ${prop.required ? '`required`' : ''} ${prop.description}\n`
    }
    markdown += '\n'
  })
  console.log(markdown)
}

function formatPropName(prop) {
  let type = propNameFromCustomType(prop.type)
  if (type.indexOf('isRequired') !== -1) {
    type = type.replace('.isRequired', '')
    prop.required = true
  }
  if (type === 'arrayOf') {
    type += `(${propNameFromCustomType(prop.type.value)})`
  }
  return type
}

function propNameFromCustomType(type) {
  return type.raw || type.name
}