

TOKEN="LUGAR-DO-TOKEN"

curl -X POST http://localhost:5000/api/treinos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Treino de Costas",
    "description": "Foco em dorsais"
  }'
