import { ApiConsultProces } from '../../src/api/apiConsultProces';
import axios from 'axios'
import { Container } from 'typescript-ioc';


describe('Execute ApiConsultProces test', () => {

    let formProces = '25';


    let spyRequest: jest.SpyInstance<Promise<any>>;
    jest.mock('axios');
    const apiConsultProces = Container.get(ApiConsultProces);

    beforeEach(() => {
        spyRequest = jest.spyOn(apiConsultProces, 'getActivationAutoconfi');
        spyRequest = jest.spyOn(apiConsultProces, 'getOrdenActiva');
        spyRequest = jest.spyOn(apiConsultProces, 'getOrdenRetoma');
    });
    describe('test getActivationAutoconfi()', () => {
        test('Validando getActivationAutoconfi', async () => {
            const expectedResult: object | any = { data : 'some data' };
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsultProces.getActivationAutoconfi(formProces)).toBeDefined();
        });
    });

    describe('test getOrdenActiva()', () => {
        test('Validando getOrdenActiva', async () => {
            const expectedResult: object | any = { data : 'some data' };
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsultProces.getOrdenActiva(formProces)).toBeDefined();
        });
    });

    describe('test getOrdenRetoma()', () => {
        test('Validando getOrdenRetoma', async () => {
            const expectedResult: object | any = { data : 'some data' };
            const mock = jest.spyOn(axios, 'get');
            mock.mockResolvedValue(expectedResult);
            expect(apiConsultProces.getOrdenRetoma(formProces)).toBeDefined();
        });
    });
    
});
