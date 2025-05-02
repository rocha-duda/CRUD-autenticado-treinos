
TOKEN="COLE_SEU_TOKEN_AQUI"

curl -X GET http://localhost:5000/api/treinos \
  -H "Authorization: Bearer $TOKEN"
