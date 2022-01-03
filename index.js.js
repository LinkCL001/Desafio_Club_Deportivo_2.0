const url = require("url");
const http = require("http");
const fs = require("fs");
http
  .createServer(function (req, res) {
    if (req.url == "/") {
      res.setHeader("content-type", "text/html");
      fs.readFile("index.html", "utf8", (err, data) => {
        res.end(data);
      });
    }
//Crear una ruta GET quealconsultarsedevuelvaenformatoJSONtodoslosdeportes registrados
    if (req.url.startsWith("/deportes") && req.method == "GET") {
      fs.readFile("data.json", "utf8", (err, data) => {
        res.end(data);
      });
    }
// Crear una ruta POST que reciba el nombre y precio de un nuevo deporte, lo persista en un archivo JSON. Debe generarse una respuesta en caso de no recibir ambos valores en la consulta
    if (req.url.startsWith("/agregar") && req.method == "POST") {
      let body = "";
      req.on("data", (payload) => {
        body = JSON.parse(payload);
        });
      req.on("end", () => {
        const { nombre, precio } = body;
        fs.readFile('data.json', 'utf8', (err, data) => {
          let deportes = JSON.parse(data).deportes
          deportes.push({
          nombre,
          precio,
          })
        fs.writeFile('data.json', JSON.stringify({ deportes }), (err, data) => {
        err ? console.log('error') : console.log(' OK ')
        res.end("Deporte agregado con Éxito");
          })  
        }) 
      })  
    }
    if (req.url.startsWith("/editar") && req.method == "PUT") { 
      let body;
      req.on("data", (payload) => {
        body = JSON.parse(payload);
        });
      req.on("end", () => {
        const { nombre, precio } = body;
        fs.readFile("data.json", "utf8", (err, data) => {
          if (data) {
            let deportes = JSON.parse(data).deportes;
            deportes = deportes.map((b) => {
              if (b.nombre == nombre) {
                b.precio = precio;
              }
              return b;
            });
            fs.writeFile(
              "data.json",
              JSON.stringify({ deportes }),
              (err, data) => {
                err ? console.log("error") : console.log(" OK ");
                res.end("Deporte editado con exito");
              }
            );
          }
        });
      });
    }

    if (req.url.startsWith("/eliminar")&& req.method == "DELETE") {
      const { nombre } = url.parse(req.url, true).query
      fs.readFile("data.json", "utf8", (err, data) => {
        let deportes = JSON.parse(data).deportes;
        deportes = deportes.filter((d) => d.nombre !== nombre);
        fs.writeFile("data.json", JSON.stringify({ deportes }), (err, data) => {
          err ? console.log("Error") : console.log(" OK ");
          res.end("Deporte elimado con exito");
        });
      });
    }
  }).listen(3000);
