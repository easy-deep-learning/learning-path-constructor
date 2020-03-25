[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Developer Experience
### Database
Create migration:

```shell
$ migrate-mongo create __migration_name__
```

Up migrations:
```shell
$ npm run migrate-mongo:up
```

Down migrations:
```shell
$ npm run migrate-mongo:down
```

Show migrations status:
```shell
$ npm run migrate-mongo:status
```
