
TOKEN="COLE_SEU_TOKEN_AQUI"
TREINO_ID=1  # <- PÓ BOTAR O ID DE SEU TREINO AQUI Ó

curl -X PUT http://localhost:5000/api/treinos/$TREINO_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Treino Atualizado",
    "description": "Atualização completa"
  }'
