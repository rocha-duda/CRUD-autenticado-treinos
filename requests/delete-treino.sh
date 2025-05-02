#!/bin/bash

TOKEN="TOKEN-DO-USER-AQUI-Ó"
TREINO_ID=1  # mesma coisa que update, pae. só colocar o id de seu treino ai o 

curl -X DELETE http://localhost:5000/api/treinos/$TREINO_ID \
  -H "Authorization: Bearer $TOKEN"
