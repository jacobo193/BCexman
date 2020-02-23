require('./config/config');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./modelos/models')
const _ = require('underscore');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/meassures/:id', function(req, res) {

    let id = req.params.id

    if (id === "" || id === undefined) {
        return res.status(400).json({

            status: 400,
            message: "id no válido"

        });
    } else {
        Usuario.findById(id)
            .exec((err, userBD) => {

                if (err) {
                    return res.status(500).json({
                        message: "Error en la base de datos",
                        error: err
                    });
                }

                if (userBD === null || userBD.length === 0) {
                    return res.status(404).json({
                        message: "ID incorrecto"
                    });
                } else {
                    res.json({
                        average: userBD.avrg,
                        minimun: userBD.min,
                        maximun: userBD.maximun
                    });
                }
            })
    }

});



app.post('/upload', function(req, res) {

    let body = req.body;
    let negativo = false;
    body.numbers.forEach(element => {
        if (element < 0) {
            negativo = true;
        }
    });
    if (negativo) {
        res.status(400).json({
            mensaje: 'todos lo nuemros deben ser positivos'
        })
    }
    if (body.quantity != body.numbers.length) {
        res.status(400).json({
            ok: false,
            mensaje: 'quanity must be equal to length of numbers'
        });
    } else {

        let sumatoria = 0;
        let min = body.numbers[0];
        let max = body.numbers[0];

        body.numbers.forEach(element => {
            sumatoria = sumatoria + element;

            if (element < min) {
                min = element;
            }

            if (element > max) {
                max = element;
            }
        });

        let promedio = sumatoria / body.quantity;

        let user = new Usuario({
            _id: body.id,
            numbers: body.numbers,
            quantity: body.quantity,
            avrg: promedio,
            maximun: max,
            min: min
        });

        user.save((err, userBd) => {

            if (err) {
                return res.status(500).json({
                    message: "La información no se guardó",
                    error: err

                });
            }

            res.json({
                message: "La información fue guardada exitosamente",
                average: promedio,
                minimun: min,
                maximun: max
            });
        });

    }

})

app.put('/usuario', function(req, res) {
    res.send('Hello World')
})

mongoose.connect('mongodb://localhost:27017/bcfort', (err, res) => {
    if (err) throw err;

    console.log('the database is currently online');

})


app.listen(process.env.PORT, () => {
    console.log('listening port:', 5000);
});