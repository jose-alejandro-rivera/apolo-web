import { IpasosProceso } from './pasosProceso';
import { IcuestionarioPaso } from './cuestionariosPaso';
import { Icuestionario } from './cuestionario';
/**
 * @ignore
 */
export interface Ipasos{
    pasosProceso: IpasosProceso;
    cuestionariosPaso:IcuestionarioPaso;
    cuestionario:Icuestionario;
}