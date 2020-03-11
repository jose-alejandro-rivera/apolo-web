import { ApiInsert } from '../../src/api/apiInsert';
import axios from 'axios';
import { Container } from 'typescript-ioc';

describe('Excute apiInsert test', () => {

    jest.mock('axios');

    const apiInser = Container.get(ApiInsert);

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
        "imagenRuta": "",
        "nombreImagen": "imagenPrueba.jpg",
    };

    beforeEach(() => {
    });

    describe('test postCrearAtencion()', () => {
        test('Validando postCrearAtencion', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'post');
            mock.mockResolvedValue(expectedResult);
            expect(apiInser.postCrearAtencion(params)).toBeDefined();
        });
    });

    describe('test postConsumirProceso()', () => {
        test('Validando postConsumirProceso', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'post');
            mock.mockResolvedValue(expectedResult);
            expect(apiInser.postConsumirProceso(body)).toBeDefined();
        });
    });

    describe('test postAtencionPaso()', () => {
        test('Validando postAtencionPaso', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'post');
            mock.mockResolvedValue(expectedResult);
            expect(apiInser.postAtencionPaso(body)).toBeDefined();
        });
    });

    describe('test postGuardarFoto()', () => {
        test('Validando postGuardarFoto', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'post');
            mock.mockResolvedValue(expectedResult);
            expect(apiInser.postGuardarFoto(body, params)).toBeDefined();
        });
    });

    describe('test pastchActualizaRegistroFotografico()', () => {
        test('Validando pastchActualizaRegistroFotografico', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'patch');
            mock.mockResolvedValue(expectedResult);
            expect(apiInser.pastchActualizaRegistroFotografico(body, params)).toBeDefined();
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});

