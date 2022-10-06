# Docker compose Example usage
## start
To run type
```docker-compose up --build```

backend port 3000
frontend port 8000
elastic port 9200

services:
```
nuxt
  environment:
    - NUXT_PORT

api
  environment:
    - NODE_PORT
    - ELASTIC_URL

migration
  environment:
    - ELASTIC_URL

elasticsearch
  environment:
    - bootstrap.memory_lock=true
    - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    - discovery.type=single-node
```