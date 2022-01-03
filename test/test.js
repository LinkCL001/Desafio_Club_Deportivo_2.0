const chai = require('chai');                                                                                            //importar paquete chai
const chaiHttp = require('chai-http');                                                                                   //importar paquete chai-http
const server = require('../index.js');                                                                                   //importar servidor index.js
chai.use(chaiHttp)
describe('Probando API REST con Mocha - Chai', () => {
    it('Probando GET - La data debe contener una propiedad llamada deportes y esta debe ser un arreglo',  () => {
        chai
        .request('http://localhost:3000/deportes')
        .get('/deportes')
        .end((err, res) => {
                let data = JSON.parse(res.text);
                chai.expect(data).to.have.property('deportes');
                chai.expect(data.deportes).to.be.an('array');
            })
    })
})    