import { ApiConsult } from '../src/api/apiConsult';
import { ApiInsert } from '../src/api/apiInsert';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Container } from 'typescript-ioc';

describe('server', () => {


    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         providers: [ApiConsult, ApiInsert]
    //     })
    //         .compileComponents();
    // }));
    describe('enrutamiento de sercios:', () => {

        // function setup() {
        //     // const pasoService = TestBed.get();
        //     const Consult = TestBed.get(ApiConsult);
        //     const Insert = TestBed.get(ApiInsert);
        //     return { Consult, Insert };
        // }


        it('should test that true === true', () => {


            expect(true).toBe(true)
        })
    })
});