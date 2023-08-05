import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs"

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });

});



app.get('/getchat', (req, res) => {
    fs.readFile('chat.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return res.status(500).json({ error: 'Erro ao ler o arquivo' });
      }
  
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseError) {
        console.error('Erro ao fazer o parse do JSON:', parseError);
        res.status(500).json({ error: 'Erro ao processar os dados do arquivo' });
      }
    });
  });

  app.post('/send', (req, res) => {

    function formatarDoisDigitos(numero) {
        return numero < 10 ? '0' + numero : numero;
      }
      
      // Obtém a data atual do servidor
      const agora = new Date();
      
      // Formata a data no formato "13:13 2/10/2022"
      const dataFormatada = `${formatarDoisDigitos(agora.getHours())}:${formatarDoisDigitos(agora.getMinutes())} ${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()}`;
      
      const novoDado = {
    texto: req.body.nome,
    hora: dataFormatada
  };
  
  // Lê o conteúdo atual do arquivo JSON
  fs.readFile('chat.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }
  
    try {
      // Parse do conteúdo para objeto JSON
      const jsonData = JSON.parse(data);
  
      // Adiciona os novos dados ao array existente
      jsonData.push(novoDado);
  
      // Escreve o objeto JSON atualizado de volta no arquivo
      fs.writeFile('chat.json', JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) {
          console.error('Erro ao escrever no arquivo:', err);
          return;
        }
  
        console.log('Dados adicionados com sucesso!');
      });
    } catch (parseError) {
      console.error('Erro ao fazer o parse do JSON:', parseError);
    }
  });   // res.render("index.ejs", { content: "API Response." });


  });


  

  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
