import { createServer } from "node:http";
import { routes } from "./router.mjs";

const server = createServer( async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  
  const chunks = [];
  for await (const chunk of req){
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf-8');

  // Handler 
  // Entra dentro do objeto 'routes' 
  // Pega o método da request, exemplo 'GET', 'POST'
  // Pega o caminho da url, exemplo '/', '/produtos', '/produto/notebook'
  // Pegando esses parâmetros ele entra dentro do objeto e preenche os dados, como por exemplo 'Objeto: caminhão' caminhão.marca, caminhão.qtdPeneu
  const handler = routes[req.method][url.pathname];
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