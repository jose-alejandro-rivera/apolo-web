import { IpasosProceso } from './pasosProceso';
import { IcuestionarioPaso } from './cuestionariosPaso';
import { Icuestionario } from './cuestionario';

export interface Ipasos{
    pasosProceso: IpasosProceso;
    cuestionariosPaso:IcuestionarioPaso;
    cuestionario:Icuestionario;
}