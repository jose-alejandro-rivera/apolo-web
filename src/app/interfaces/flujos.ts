export interface IFlujos{
    Id_Flujo: number,
    NomFlujo: string,
    CodCategoriaFlujo: number,
    CodPaso_Inicial: number,
    Descripcion: string,
    Orden: number,
    Activo: bigint,
    Fecha: Date,
    Usuario: string
}