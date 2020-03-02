
import { ApiConsult } from '../../src/api/apiConsult';



describe('Excute apiConsult test', () => {

    const apiConsult = new ApiConsult();
    let idCategoria = '1';
    let idCategoriaError = 1;
    let idFlujo = '1232323232323';
    let idAtencion = '345';
    let paso = '23';

    beforeEach(() => {
    });

    describe('test getCategoriasFlujo()', () => {
        it('Validate run postCrearAtencion', async () => {
            apiConsult.getCategoriasFlujo();
        })
    });

    describe('test getCategoriasFlujo()', () => {
        it('Validate run postCrearAtencion', async () => {
            apiConsult.getFlujoPorCategoria(idCategoria);
        })
    });

    describe('test getPasosCategoria', () => {
        it('Validate run getPasosCategoria', async () => {
            apiConsult.getPasosCategoria(idFlujo);
        })
    });
    
    describe('test getUltimoAtencionPaso', () => {
        it('Validate run getUltimoAtencionPaso', async () => {
            apiConsult.getUltimoAtencionPaso(idAtencion);
        })
    });
    
    describe('test AtencionPasoAtras', () => {
        it('Validate run AtencionPasoAtras', async () => {
            apiConsult.AtencionPasoAtras(idAtencion, paso);
        })
    });    
    

});
