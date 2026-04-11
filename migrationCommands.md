# <center>MIGRATIONS QUERY</center>

## Create Migration File

To create a migration file, you can use the following command in your terminal:

```js
npm typeorm migration:create -n <migration_name>
```

## Generate Migration File

```js
npm run typeorm migration:generate -- <migration-path/migration-name> -d <src/datasource.ts>
```

## Run Migration File

```js
npm run typeorm migration:run -- -d <src/datasource.ts>
```

## Migration Revert

```js
npm run typeorm migration:revert -- -d <src/datasource.ts>
```

## Migration Show

```js
npm run typeorm migration:show -- -d <src/datasource.ts>
```


### Note
```
add -o EOL // for .js file
add -p EOL // for pretty code
```