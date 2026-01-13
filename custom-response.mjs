// Essa função estende o objeto res (response) adicionando dois métodos

export function customResponse(res) {
  // Cria um método chamado status (Criação de método dentro do res)
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  // Cria um método chamado status
  res.json = value => {
    try {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(value));
    }
    catch {
      res.status(500).end("Erro");
    }
  };
  return res;
}