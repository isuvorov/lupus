import EditorBemjsonSegment from './EditorBemjsonSegment';

module.exports = ({ storiesOf, action }) => {
  return storiesOf('EditorBemjsonSegment', module)
    .add('Default', () => {
      const value = {
        int: 123,
        float: 123.45,
        string: 'Test string',
        intArray: [0, 1, 2, 3, 4, 5],
      }
      return <EditorBemjsonSegment
        value={value}
        dispatch={action('dispatch')}
      />
    })
    .add('schema', () => {
      const json = {
        "address": {
          "streetAddress": "21 2nd Street",
          "city": "New York"
        },
        "phoneNumber": [
          {
            "location": "home",
            "code": 44
          }
        ]
      }
      const schema = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "color": {
            "type": "string",
            "format": "color"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "textarea": {
            "type": "string",
            "format": "textarea"
          },
          "markdown": {
            "type": "string",
            "format": "markdown"
          },
          "url": {
            "type": "string",
            "format": "url"
          },
          "js": {
            "type": "string",
            "format": "js"
          },
          "yaml": {
            "type": "string",
            "format": "yaml"
          },
          "checkbox": {
            "type": "boolean",
            "format": "checkbox"
          },
          "table": {
            "type": "array",
            "format": "table",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                }
              }
            }
          },
          "grid": {
            "type": "object",
            "properties": {
              "name1": { "type": "string" },
              "name2": { "type": "string" },
              "name3": { "type": "string" },
            },
            "format": "grid"
          },
          "address": {
            "type": "object",
            "properties": {
              "streetAddress": {
                "type": "string"
              },
              "city": {
                "type": "string"
              }
            },
            "required": [
              "streetAddress",
              "city"
            ]
          },
          "phoneNumber": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string"
                },
                "code": {
                  "type": "integer"
                }
              },
              "required": [
                "location",
                "code"
              ]
            }
          }
        },
        "required": [
          "address",
          "phoneNumber"
        ]
      }
      return <EditorBemjsonSegment
        value={json}
        schema={schema}
        dispatch={action('dispatch')}
      />
    })
}
