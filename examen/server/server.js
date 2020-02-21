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



app.get('/usuario/:id', function(req, res) {

    let id = req.params.id

    let body = req.body;

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
                        avrg: userBD.avrg,
                        maximun: userBD.maximun,
                        min: userBD.min
                    });

                    res.json({
                        status: 200,
                        message: "id encontrada",
                        data: userBD,
                        success: "SUCCESS!"
                    });
                }
            })


    }


});



app.post('/usuario', function(req, res) {

    let body = req.body;


    if (body.quantity === body.numbers.lengt) {
        res.status(400).json({
            ok: false,
            mensaje: 'quanity must be equl to length of numbers'
        });
    } else {

        let user = new Usuario({
            quantity: body.quantity,
            avrg: body.avrg,
            maximun: body.maximun,
            min: body.min
        });
        user.save((err, userBd) => {

            if (err) {
                return res.status(500).json({
                    status: 500,
                    messege: err,
                    data: userBD,

                    success: "FAIL"

                });
            }

            res.json({
                status: 200,
                message: "Usuario creado",
                data: userBd,
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