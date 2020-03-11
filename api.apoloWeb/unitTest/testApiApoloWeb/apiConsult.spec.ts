
import { ApiConsult } from '../../src/api/apiConsult';
import axios from 'axios'
import { Container } from 'typescript-ioc';



describe('Excute apiConsult test', () => {

    let mockedAxios: any;
    let spyRequest: jest.SpyInstance<Promise<any>>;
    jest.mock('axios');
    this.mockedAxios = axios as jest.Mocked<typeof axios>;
    let spyapiConsult: jest.SpyInstance<Promise<any>>;
    const apiConsult = Container.get(ApiConsult);
    let idCategoria = '1';
    let idFlujo = '123';
    let idAtencion = '345';
    let paso = '23';

    beforeEach(() => {
        spyRequest = jest.spyOn(apiConsult, 'getCategoriasFlujo');
        spyRequest = jest.spyOn(apiConsult, 'getFlujoPorCategoria');
        spyRequest = jest.spyOn(apiConsult, 'getPasosCategoria');
        spyRequest = jest.spyOn(apiConsult, 'getUltimoAtencionPaso');
        spyRequest = jest.spyOn(apiConsult, 'AtencionPasoAtras');

    });

    describe('test getCategoriasFlujo()', () => {
        test('Validando getCategoriasFlujo', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsult.getCategoriasFlujo()).toBeDefined();
        });
    });

    describe('test getFlujoPorCategoria()', () => {
        test('Validando getFlujoPorCategoria', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsult.getFlujoPorCategoria(idCategoria)).toBeDefined();
        });
    });

    describe('test getFlujoPorCategoria() error', () => {
        test('Validando getFlujoPorCategoria', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsult.getFlujoPorCategoria('*******')).toBeDefined();
        });
    });

    describe('test getPasosCategoria()', () => {
        test('Validando getPasosCategoria', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsult.getPasosCategoria(idFlujo)).toBeDefined();
        });
    });

    describe('test getUltimoAtencionPaso()', () => {
        test('Validando getUltimoAtencionPaso', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsult.getUltimoAtencionPaso(idAtencion)).toBeDefined();
        });
    });

    describe('test AtencionPasoAtras()', () => {
        test('Validando AtencionPasoAtras', async () => {
            const expectedResult: object | any = '';
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsult.AtencionPasoAtras(idAtencion, paso)).toBeDefined();
        });
    });

});