import { ApiInsert } from '../../src/api/apiInsert'

describe('Excute apiInsert test', () => {

    let apiInsert = new ApiInsert();
    let body = {
        "CodAtencionPaso": "1",
        "CodProceso": "1",
        "TipoServicio": "2",
        "Servicio": "get|pos",
        "Request": "werwer",
        "Response": "werwer",
        "NumOrden": "1123516536132"
    };
    let params = {
        "imagenRuta": "c://",
        "nombreImagen": "imagenPrueba.jpg",
    };


    let bodyfalso = {
        "CodAtencionPaso": 'jjjmm------',
        "CodProceso": '---wefwerwe',
        "TipoServicio": "erwerw-werwer",
        "Servicio": '',
        "Request": '',
        "Response": '',
        "NumOrden": ""
    };
    let paramsfalso = {
        "imagenRuta": "xxxxxc",
        "nombreImagen": "imagenPrueba.",
    };
    beforeEach(() => {

    });

    describe('test postCrearAtencion', () => {
        it('Validate run postCrearAtencion', async () => {
            apiInsert.postCrearAtencion(body);
        })
    });

    describe('test postCrearAtencion erroneo', () => {
        it('Validate run postCrearAtencion', async () => {
            apiInsert.postCrearAtencion(bodyfalso);
        })
    });


    describe('test postConsumirProceso', () => {
        it('Validate run postCrearAtencion', async () => {
            apiInsert.postConsumirProceso(body);
        })
    });

    describe('test postAtencionPaso', () => {
        it('Validate run postCrearAtencion', async () => {
            apiInsert.postAtencionPaso(body);
        })
    });

    describe('test postGuardarFoto', () => {
        it('Validate run postCrearAtencion', async () => {
            apiInsert.postGuardarFoto(body, params);
        })
    });

    describe('test pastchActualizaRegistroFotografico', () => {
        it('Validate run postCrearAtencion', async () => {
            apiInsert.pastchActualizaRegistroFotografico(body, params);
        })
    });
    

});

