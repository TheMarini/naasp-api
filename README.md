# naasp-api

## Configurar do Docker
```
docker-compose build
```

### Levantar a VM
```
docker-compose up
```

### Configurar o banco 
```
docker exec -it [CONTAINER ID - node] npx sequelize-cli db:create
docker exec -it [CONTAINER ID - node] npx sequelize-cli db:migrate
```
