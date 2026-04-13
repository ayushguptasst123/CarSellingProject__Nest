# <center>MIGRATIONS QUERY</center>

## Create Migration File

To create a migration file, you can use the following command in your terminal:

```js
npx typeorm migration:create src/database/migrations/<migration-name>
```

## Generate Migration File

```js
npm run typeorm migration:generate -- src/database/migrations/migration-name -d src/database/data-source.ts
```

## Run Migration File

```js
npm run typeorm migration:run -- -d src/database/data-source.ts
```

## Migration Revert

```js
npm run typeorm migration:revert -- -d src/database/data-source.ts
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
