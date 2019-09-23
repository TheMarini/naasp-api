# NAASP - API
## :ledger: Notes before installing
- :information_source: **This is just the project API**, you can get the GUI complement on [this repository](https://github.com/TheMarini/naasp-web).
- :warning: **Don't forget** about the environment variables, such as `$ROOT_PASSWORD` and `$DATABASE_NAME`.
- By default, this project use [YARN](https://yarnpkg.com) as depedency/package management.
## :fire: Installation
1. Install docker and docker compose
2. Build all [Docker](https://www.docker.com) images for the project:
```bash
docker-compose build
```
3. Create the containers and the network:
```bash
docker-compose up
```
## :busts_in_silhouette: Authors
- [Bruno Marini](https://github.com/TheMarini)
- [Nayanne Ornelas](https://github.com/soybatata)
- [Pedro Guerra](https://github.com/PedroWar)
- [Guilherme Willer](https://github.com/guigawiller)
