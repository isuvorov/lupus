import EditorBemjson from './EditorBemjson';

const bemjson = {
  int: 123,
  float: 123.45,
  string: 'Test string',
  intArray: [0, 1, 2, 3, 4, 5],
}
const largeBemjson = {
  int: 123,
  float: 123.45,
  string: 'Test string',
  intArray: [0, 1, 2, 3, 4, 5],
  intArray2: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray3: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray4: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  intArray5: [0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
  object: {
    int: 123,
    float: 123.45,
    string: 'Test string',
    intArray: [0, 1, 2, 3, 4, 5],
  },
  objectArray: [
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
    {
      int: 123,
      float: 123.45,
      string: 'Test string',
      intArray: [0, 1, 2, 3, 4, 5],
    },
  ],
}
const project = {
  "_id": "578df9ccf1f2f80c3cdf7b9d",
  "base": "nodejs",
  "name": "bratishka",
  "files": [
    {
      "name": "docker-compose.yml",
      "content": "version: '2'\nservices:\n  app:\n    image: node:5.11.1\n    working_dir: /app/src\n    command: /bin/bash -c \"npm start\"\n    volumes:\n        - ./app:/app/src\n    ports:\n      - 127.0.0.1:8050:8080\n    environment:\n      TOKEN: 139139425:AAFDc-RHpEKxH7etQr92o5MkCmz7HaMKCos"
    }
  ],
  "tasks": [
    {
      "name": "init",
      "content": "git clone git@bitbucket.org:natavts/telegrambot.git app",
      "type": "sh"
    }, {
      "name": "refresh",
      "content": "cd src\ngit pull\ndocker-compose run app npm install --no-progress\ndocker-compose run app npm run build",
      "type": "sh"
    }, {
      "name": "run",
      "content": "docker-compose up",
      "type": "sh"
    }
  ]
}
module.exports = ({ storiesOf, action }) => {
  return storiesOf('EditorBemjson', module)
    .add('Default', () => {
      return <EditorBemjson
        bemjson={bemjson}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('project', () => {
      return <EditorBemjson
        bemjson={project}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
    .add('largeBemjson', () => {
      return <EditorBemjson
        bemjson={largeBemjson}
        onChange={action('onChange')}
        onSubmit={action('onSubmit')}
      />
    })
}
