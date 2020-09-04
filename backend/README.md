[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Dev run

1. Create .env, see `example.env`
2. Start database

```bash
docker-compose up
```

3. Apply migrations

```
npm run migrate-mongo:up
```

4. Start App

```
npm run start
```

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
