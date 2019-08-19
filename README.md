# NAASP - API
## :ledger: Notes before installing
- :information_source: **This is just the project API**, you can get the GUI complement on [this repository](https://github.com/TheMarini/naasp-web).
- :warning: **Don't forget** about the environment variables, such as `$ROOT_PASSWORD` and `$DATABASE_NAME`.
- By default, this project use [YARN](https://yarnpkg.com) as depedency/package management.
## :fire: Installation
1. Install dependencies: `yarn`
2. Create a [Docker](https://www.docker.com) container for the database:
```bash
docker run -p 3306:3306 -p 33060:33060 --name iscool_db -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD -e MYSQL_DATABASE=$DATABASE_NAME -d mysql:5.7.25 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
3. Migrate/update database: `yarn migrate`
4. Run:
   - Development: `yarn dev`
   - Production: `yarn start`
## :busts_in_silhouette: Authors
- [Bruno Marini](https://github.com/TheMarini)
- [Nayanne Ornelas](https://github.com/soybatata)
- [Pedro Guerra](https://github.com/PedroWar)
- [Guilherme Willer](https://github.com/guigawiller)
