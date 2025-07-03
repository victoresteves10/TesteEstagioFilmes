# 🎬 TesteEstagioFilmes

Teste para candidatos a Estagiário(a) Backend com Node.js

API que consome dados de uma API externa de filmes, trata essas informações e retorna apenas os dados relevantes por meio da rota `/filmes`.

---

## 🎯 Objetivos

- Criar uma rota `/filmes` que retorne os filmes conforme os requisitos.
- Relatar os passos seguidos para chegar ao resultado final.

---

## ✅ Requisitos funcionais

### Propriedades exigidas por filme:

1. **Lucro:**  
   - Calcular com base em `bilheteria - orçamento`  
   - Exibir como *string formatada*, ex: `$150 milhões`

2. **Premiação de maior relevância:**  
   - Comparar a propriedade `relevancia` entre os prêmios  
   - Retornar o nome do mais relevante

3. **Duração em segundos:**  
   - Converter `duração` de minutos para segundos

4. **Nota IMDb:**  
   - Buscar dentro do array `ratings` a nota com fonte `IMDB`  
   - Retornar como string

5. **Sinopse:**  
   - Priorizar `pt-br`  
   - Se não houver, usar `en`  
   - Se não houver nenhuma, usar qualquer disponível

### Remover as propriedades:
- `locações`  
- `poster`  
- `trailer`

---

## 🛠️ Passos para chegar ao resultado final

### 1. Análise da API externa
- Dados vinham em formato bruto com strings de valores como `"R$ 2,3 bilhões"` e listas aninhadas.
### 2. Estruturação do projeto com Node.js + Fastify
- Início no VSCode
- Criado `app.js` com servidor Fastify escutando na porta 3000
### 3. Criação da rota `/filmes`
- Definida em `routes/filmes.js`
- Conectada ao controlador em `controllers/filmesController.js`
### 4. Lógica de processamento (dentro de `filmesController.js`)
 #### 4.1 - Fetch da API externa
- Usado o método `fetch` com `async/await` para esperar a resposta da API extermna  
- Tratado com `try/catch`
 #### 4.2 - Processamento com `.map`
 Cada objeto de filme foi tratado para gerar um novo formato com:
 ##### a) **Premiação mais relevante**
 - Tratamento dos dados referente a premição mais relevante, comparando a relevância de cada premiação e retornando apenas o nome da de maior valor
 ##### b) **Conversão da duração**
 - Multiplicação por 60 
 ##### c) **Nota IMDb**
 - Buscado dentro do array `ratings` por imdb
 - Retornado como string se encontrado apenas o valor da nota
 ##### d) **Sinopse**
 - Procurado `pt-br`, depois `en`, depois qual estiver disponível
 ##### e) **Cálculo do lucro**
 API externa envia uma string com o valor em dólares, por isso foi necessário converter para número:
 - Criada a função `parseDinheiro()` em `utils/parseDinheiro.js`:
  - A função verifica se o valor é uma string e se ela contém as palavras milhão ou bilhão, que mudam o multiplicador
  - Usa uma expressão para extrair apenas o número do dado e convertar a vírgula em ponto
  - Converte para número usando `parseFloat`
  - Aplica o multiplicador dependendo de “milhão” ou “bilhão”
 Para mostrar o lucro como uma string após o cálculo da bilheteria menos o orçamento foi feito:
 - Criada a função `formatarDinheiro()` em `utils/formatarDinheiro.js`:
  - Verifica se o valor vem na casa do milhão ou bilhãom para então dividir o número e apresentar em casa decimal
  - Converte número em string legível: `"$2,3 bilhões"`
  - Usa singular/plural corretamente de acorso com o sufixo
 ##### f) **Montagem do novo objeto de filme**
 - Retornado um novo objeto com apenas as propriedades exigidas
### 6. Testes
- Utilizado Postman para validar retorno da API localmente  
### 7. Push no GitHub
- Repositório inicializado
- `.gitignore` criado com `node_modules/` e demais entradas
- Commit e push realizados


