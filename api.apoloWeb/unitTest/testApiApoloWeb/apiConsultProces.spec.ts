import { ApiConsultProces } from '../../src/api/apiConsultProces';
import { async } from 'q';


describe('Execute ApiConsultProces test', () => {

    let apiConsultProces = new ApiConsultProces();
    let formProces = 'form';

    beforeEach(() => {
    });

    describe( 'Execute getActivationAutoconfi test', () => {
        it('Validate getActivationAutoconfi', async () =>{
            apiConsultProces.getActivationAutoconfi(formProces);
        })
    });

    describe( 'Execute getOrdenActiva test', () => {
        it('Validate getOrdenActiva', async () =>{
            apiConsultProces.getOrdenActiva(formProces);
        })
    });

    describe( 'Execute getOrdenRetoma test', () => {
        it('Validate getOrdenRetoma', async () =>{
            apiConsultProces.getOrdenRetoma(formProces);
        })
    });

});
