const axios = require("axios");
const RegistroLogs = require("../../models/logs/RegistroLogs");

exports.crearRegistroLogs = async (req, res) => {
  console.log(req.body);
  let json = req.body;
  const jsonString = JSON.stringify(json);
  const registros = new RegistroLogs({
    registro: jsonString,
    registro_json: json,
  });

  registros.save(function (err, registros) {
    if (err) {
      data = {
        correlativo: json.correlativo,
        estado: 2,
      };
      this.updateApiPosgress(data);
      return res.status(500).send(err.message);
    } else {
      data = {
        correlativo: json.correlativo,
        estado: 1,
      };
      this.updateApiPosgress(data);
      res.status(200).jsonp(registros);
    }
  });
};

updateApiPosgress = async (datos) => {
  const options = {
    method: "PUT",
    url: `http://localhost:3000/tickets/update`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      correlativo: datos.correlativo,
      estado: datos.estado,
    },
  };
  try {
    const result = await axios(options);
    const resultado = result.data;
    const mensaje =
      "Se actualizo el estado del ticket " + resultado.JSON;
    console.log(mensaje);
  } catch (e) {
    console.log("Error al actualizar el estado del ticket");    
  }
};
