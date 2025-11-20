import { createServer } from "node:http";
import { Router } from "./router.mjs";

const router = new Router();

router.get('/', (req, res) => {
  res.end('Home');
});

router.get('/produto/notebook', (req, res) => {
  res.end('Produtos - Notebook')
});

// Também pode ser usado dessa maneira
function postProduto(req, res){
  res.end('Notebook Post');
}
router.post('/produto', postProduto);

const server = createServer( async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  
  const chunks = [];
  for await (const chunk of req){
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf-8');

  // Encontra qual rota foi recebida pelo usuário
  const handler = router.find(req.method, url.pathname);
  if (handler){
    handler(req, res);
  }else {
    res.statusCode = 404;
    res.end('Não encontrado');
  }
});

server.listen(3000, () => {
  console.log("Server: https://localhost:3000")
});