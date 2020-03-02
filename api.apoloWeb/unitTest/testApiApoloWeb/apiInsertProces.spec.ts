import { ApiInsertProces } from '../../src/api/apiInsertProces';



describe('Excute ApiInsertProces test', () => {

    let apiInsertProces = new ApiInsertProces();
    let num_Orden = 767; 
    let params = {
        "imagenRuta": "wewerwerwerwer",
        "nombreImagen": "imagenPrueba.jpg",
    };


    beforeEach(() => {
    });

    describe('test pastchActualizarOrden', () => {
        it('Validate run pastchActualizarOrden', async () => {
                apiInsertProces.pastchActualizarOrden(num_Orden, params);
        });
    });

});
