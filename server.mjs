import { createServer } from "node:http";
import { Router } from "./router.mjs";
import { customRequest } from "./custom-request.mjs";

const router = new Router();

router.get('/', (req, res) => {
  res.end('Home');
});

router.get('/produto/notebook', (req, res) => {
  res.end('Produtos - Notebook')
});

// Também pode ser usado dessa maneira
function postProduto(req, res){
  const cor = req.query.get("cor");
  res.end(`Notebook Post ${cor}`);
}
router.post('/produto', postProduto);

const server = createServer( async (request, res) => {
  const req = await customRequest(request);
  
  const handler = router.find(req.method, req.pathname);
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