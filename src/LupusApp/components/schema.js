const schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string"
    },
    "base": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "files": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "content": {
            "type": "string",
            format: "textarea"
          }
        }
      }
    },
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "content": {
            "type": "string",
            format: "textarea"
          },
          "type": {
            "type": "string"
          }
        }
      }
    }
  }
}

export default schema;
