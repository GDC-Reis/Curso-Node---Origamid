import fs from 'node:fs/promises';
import fsCallback from 'node:fs';

// Utilizando 'Sync'
/*
const dados2 = fsCallback.readFileSync('./produtos/notbook.json', 'utf-8');
console.log(dados2);
*/

// Cria o caminho
try {
  await fs.mkdir('./produtos');
} catch {
  console.log('Pasta já existe');
}

// adiciona os dados
fs.writeFile('./produtos/notbook.json', 
  JSON.stringify({nome: "Notbook"}));

// Le os dados
const dados = await fs.readFile('./produtos/notbook.json', 'utf-8');

// Le o diretorio
// const dir = await fs.readdir('/produtos');

// Le o diretorio e caso contenha arquivos ele lê os arquivos dentro do diretorio
const dir = await fs.readdir('/produtos', {recursive: true});
console.log(dir.filter((file) => file.endsWith('.json')));

// mostra os dados
console.log(dados);