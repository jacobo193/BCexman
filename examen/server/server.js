require('./config/config');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./modelos/models')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/upload/:id', function(req, res) {

    let id = req.params.id

    let body = req.body;
    let suma = sum(body.numbers);
    let averge = (suma / length(body.numbers))
    if (id === "" || id === undefined) {
        return res.status(400).json({

            status: 400,
            message: "id no válido",
            data: userBD,
            success: "FAIL!"

        });
    } else {
        Usuario.findById(id)
            .exec((err, userBD) => {

                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: err,
                        data: userBD,
                        success: "FAIL!"
                    });
                }

                if (userBD.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "Usuario no encontrando",
                        data: userBD,
                        success: "FAIL!"
                    });
                } else {
                    let user = new Usuario({
                        numbers: body.numbers,
                        quantity: body.quantity
                    });

                    res.json({
                        status: 200,
                        message: "id encontrada",
                        data: user,
                        maximun: max(body.numbers),
                        averge: averge,
                        minimun: min(body.numbers),
                        success: "SUCCESS!"
                    });
                }
            })


    }


});



app.post('/upload', function(req, res) {

    let body = req.body;
    let suma = sum(body.numbers);
    let averge = (suma / length(body.numbers))

    if (body.quantity === length(body.numbers)) {
        res.status(400).json({
            ok: false,
            mensaje: 'quanity must be equl to length of numbers'
        });
    } else {

        let user = new Usuario({
            numbers: body.numbers,
            quantity: body.quantity
        });
        user.save((err, userBd) => {

            if (err) {
                return res.status(500).json({
                    status: 500,
                    messege: err,
                    data: userBd,
                    success: "FAIL"

                });
            }

            res.json({
                status: 200,
                message: "Usuario creado",
                data: userBd,
                maximun: max(body.numbers),
                averge: averge,
                minimun: min(body.numbers),
                success: "SUCCESS!"
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