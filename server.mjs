import { createServer } from "node:http";

const server = createServer( async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  const url = new URL(req.url, 'http://localhost');
  const cor = url.searchParams.get('cor');
  const tamanho = url.searchParams.get('tamanho');
  // PARSE DO BODY
  const chunks = [];
  for await (const chunk of req){
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf-8');
  console.log(JSON.parse(body).password);
  
  if(req.method === 'GET' && url.pathname === '/'){
    res.statusCode = 200;
    res.end('Home');
  } else if(req.method === 'POST' && url.pathname === '/produtos'){
    res.statusCode = 201;
    res.end(`Produtos: ${cor}, ${tamanho}`);
  }else {
    res.statusCode = 404;
    res.end('Pagina não encontrada');
  }
  console.log(req.method);
});

server.listen(3000, () => {
  console.log("Server: https://localhost:3000")
});