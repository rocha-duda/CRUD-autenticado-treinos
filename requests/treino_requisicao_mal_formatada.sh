curl -X POST http://localhost:5000/api/treinos \
-H "Authorization: Bearer COLE_SEU_TOKEN_AQUI" \
-H "Content-Type: application/json" \
-d '{
  "description": "Sem título, propositalmente"
}'