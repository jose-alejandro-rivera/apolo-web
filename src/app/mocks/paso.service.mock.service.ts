import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasoMockService {
  FlujoData = [{
    "Flujo": [
      {
        "Id_Flujo": 1,
        "NomFlujo": "Alta dúo fibra",
        "CodCategoriaFlujo": 1,
        "CodPaso_Inicial": 1,
        "Descripcion": "Flujo para dar alta un dúo de fibra",
        "Orden": 1,
        "Activo": true,
        "Fecha": "2019-11-18T10:23:00",
        "Usuario": "dbo"
      }
    ],
    "Pasos": [
      {
        "Id_Paso": 1,
        "NomPaso": "Preparar equipo para labor",
        "Descripcion": "Preparar equipo necesario para la instalación",
        "Activo": true,
        "CodCuestionario": 1,
        "Fecha": "2019-11-18T10:21:00",
        "Usuario": "dbo",
        "CodTipoPaso": 1
      },
      {
        "Id_Paso": 2,
        "NomPaso": "Llamar al cliente para confirmar cita",
        "Descripcion": "Se debe llamar al cliente para confirmar cita",
        "Activo": true,
        "CodProceso": 1,
        "Fecha": "2019-11-18T11:21:00",
        "Usuario": "dbo",
        "CodTipoPaso": 1
      },
      {
        "Id_Paso": 3,
        "NomPaso": "¿La casa del cliente está en un conjunto cerrado?",
        "Descripcion": "Se debe evaluar si la casa del cliente está en un conjunto cerrado",
        "Activo": true,
        "CodCuestionario": 2,
        "Fecha": "2019-11-18T14:43:00",
        "Usuario": "dbo",
        "CodTipoPaso": 2
      },
      {
        "Id_Paso": 4,
        "NomPaso": "Presentación en portería",
        "Descripcion": "Se debe presentar en la portería",
        "Activo": true,
        "CodCuestionario": 3,
        "Fecha": "2019-11-18T15:02:00",
        "Usuario": "dbo",
        "CodTipoPaso": 1
      },
      {
        "Id_Paso": 5,
        "NomPaso": "Presentación ante el cliente",
        "Descripcion": "Se debe presentar ante el cliente",
        "Activo": true,
        "CodProceso": 2,
        "Fecha": "2019-11-18T15:07:00",
        "Usuario": "dbo",
        "CodTipoPaso": 1
      },
      {
        "Id_Paso": 6,
        "NomPaso": "Novedad Comercial",
        "Descripcion": "Novedad comercial",
        "Activo": true,
        "CodCuestionario": 4,
        "Fecha": "2019-11-18T15:52:00",
        "Usuario": "dbo",
        "CodTipoPaso": 1
      },
      {
        "Id_Paso": 7,
        "NomPaso": "Proceso QC Linea de rescate",
        "Descripcion": "Proceso QC Linea de rescate",
        "Activo": true,
        "Fecha": "2019-11-18T15:52:00",
        "Usuario": "dbo",
        "CodTipoPaso": 1
      }
    ],
    "FlujoPasos": [
      {
        "Id_FlujoPaso": 1,
        "CodFlujo": 1,
        "CodPaso_Origen": 1,
        "CodPaso_Destino": 2,
        "Orden": 1,
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T14:40:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 2,
        "CodFlujo": 1,
        "CodPaso_Origen": 2,
        "CodPaso_Destino": 3,
        "Orden": 1,
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T14:44:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 3,
        "CodFlujo": 1,
        "CodPaso_Origen": 3,
        "CodPaso_Destino": 4,
        "Orden": 1,
        "ExpresionEjecucion": "@2.CasaEnConjunto==1",
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T15:13:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 4,
        "CodFlujo": 1,
        "CodPaso_Origen": 3,
        "CodPaso_Destino": 5,
        "Orden": 2,
        "ExpresionEjecucion": "@2.CasaEnConjunto==0",
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T15:14:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 5,
        "CodFlujo": 1,
        "CodPaso_Origen": 5,
        "CodPaso_Destino": 6,
        "Orden": 1,
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T15:53:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 6,
        "CodFlujo": 1,
        "CodPaso_Origen": 6,
        "CodPaso_Destino": 7,
        "Orden": 1,
        "ExpresionEjecucion": "@4.TNovedadComercial==1",
        "Activo": true,
        "Finaliza": true,
        "Fecha": "2019-11-18T15:56:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 7,
        "CodFlujo": 1,
        "CodPaso_Origen": 6,
        "CodPaso_Destino": 8,
        "Orden": 1,
        "ExpresionEjecucion": "@4.TNovedadComercial==0",
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T16:01:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 8,
        "CodFlujo": 1,
        "CodPaso_Origen": 10,
        "CodPaso_Destino": 12,
        "Orden": 1,
        "ExpresionEjecucion": "@5.CoberturaWifi==0",
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T17:10:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 9,
        "CodFlujo": 1,
        "CodPaso_Origen": 10,
        "CodPaso_Destino": 11,
        "Orden": 1,
        "ExpresionEjecucion": "@5.CoberturaWifi==1",
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T17:16:00",
        "Usuario": "dbo"
      },
      {
        "Id_FlujoPaso": 10,
        "CodFlujo": 1,
        "CodPaso_Origen": 8,
        "CodPaso_Destino": 9,
        "Orden": 1,
        "Activo": true,
        "Finaliza": false,
        "Fecha": "2019-11-18T17:18:00",
        "Usuario": "dbo"
      }
    ],
    "Procesos": [
      {
        "Id_Proceso": 1,
        "NomProceso": "Integración con IVR",
        "Descripcion": "Llamar al IVR para contactar al cliente",
        "TipoServicio": "rest|get",
        "Servicio": "http:\/\/www.google.com",
        "Fecha": "2019-11-18T11:39:00",
        "Usuario": "dbo"
      },
      {
        "Id_Proceso": 2,
        "NomProceso": "Grabador de voz para presentación",
        "Descripcion": "Grabar la voz para la presentación",
        "TipoServicio": "rest|get",
        "Servicio": "http:\/\/www.google.com",
        "Fecha": "2019-11-18T15:05:00",
        "Usuario": "dbo"
      },
      {
        "Id_Proceso": 3,
        "NomProceso": "Integración con AirScout",
        "Descripcion": "Integración con AirScout",
        "TipoServicio": "rest|get",
        "Servicio": "http:\/\/www.google.com",
        "Fecha": "2019-11-18T16:07:00",
        "Usuario": "dbo"
      },
      {
        "Id_Proceso": 4,
        "NomProceso": "Desarrollo parecido a adición decos",
        "Descripcion": "Desarrollo parecido a adición decos",
        "TipoServicio": "rest|get",
        "Servicio": "http:\/\/www.google.com",
        "Fecha": "2019-11-18T17:31:00",
        "Usuario": "dbo"
      },
      {
        "Id_Proceso": 5,
        "NomProceso": "Integración con solición de chat",
        "Descripcion": "Integración con solición de chat",
        "TipoServicio": "rest|get",
        "Servicio": "http:\/\/www.google.com",
        "Fecha": "2019-11-18T17:58:00",
        "Usuario": "dbo"
      },
      {
        "Id_Proceso": 6,
        "NomProceso": "¿Alguna novedad para la instalacion?",
        "Descripcion": "¿Alguna novedad para la instalacion?",
        "TipoServicio": "rest|get",
        "Servicio": "http:\/\/www.google.com",
        "Fecha": "2019-11-18T18:13:00",
        "Usuario": "dbo"
      }
    ],
    "Cuestionarios": [
      {
        "Id_Cuestionario": 1,
        "NomCuestionario": "Preparar Labores",
        "Descripcion": "Cuestionario para preparar las labores de Alta de duo fibra",
        "Activo": true,
        "Fecha": "2019-11-18T11:12:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 2,
        "NomCuestionario": "La casa está en un conjunto cerrado",
        "Descripcion": "Cuestionario para definir si la casa está en un conjunto cerrado",
        "Activo": true,
        "Fecha": "2019-11-18T14:42:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 3,
        "NomCuestionario": "Presentación en porteria",
        "Descripcion": "Presentación en porteria",
        "Activo": true,
        "Fecha": "2019-11-18T14:57:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 4,
        "NomCuestionario": "¿Novedad Comercial?",
        "Descripcion": "¿Novedad Comercial?",
        "Activo": true,
        "Fecha": "2019-11-18T15:49:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 5,
        "NomCuestionario": "La cobertura del wifi es óptima en todo el previo?",
        "Descripcion": "¿La cobertura del wifi es óptima en todo el previo?",
        "Activo": true,
        "Fecha": "2019-11-18T16:17:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 6,
        "NomCuestionario": "Validación de CTO?",
        "Descripcion": "¿Validación de CTO?",
        "Activo": true,
        "Fecha": "2019-11-18T16:26:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 7,
        "NomCuestionario": "¿El cliente acepta repetidores?",
        "Descripcion": "¿El cliente acepta repetidores?",
        "Activo": true,
        "Fecha": "2019-11-18T17:26:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 8,
        "NomCuestionario": "¿Vías ok?",
        "Descripcion": "¿Vías ok?",
        "Activo": true,
        "Fecha": "2019-11-18T17:51:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 9,
        "NomCuestionario": "¿Alguna novedad para a instalación?",
        "Descripcion": "¿Alguna novedad para a instalación?",
        "Activo": true,
        "Fecha": "2019-11-18T18:08:00",
        "Usuario": "dbo"
      },
      {
        "Id_Cuestionario": 10,
        "NomCuestionario": "Test",
        "Descripcion": "Test",
        "Activo": true,
        "Fecha": "2019-11-19T14:32:00",
        "Usuario": "dbo"
      }
    ],
    "paso_cuestionario": [
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 1,
          "NomCuestionario": "Preparar Labores",
          "Descripcion": "Cuestionario para preparar las labores de Alta de duo fibra"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 1,
          "NomCuestionarioCampo": "Alistar la Herramienta",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 1
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 1
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 1,
          "NomCuestionario": "Preparar Labores",
          "Descripcion": "Cuestionario para preparar las labores de Alta de duo fibra"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 2,
          "NomCuestionarioCampo": "Garantizar Stock de Materiales",
          "Orden": 2,
          "Obligatorio": true,
          "CodCuestionario": 1
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 1
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 2,
          "NomCuestionario": "La casa está en un conjunto cerrado",
          "Descripcion": "Cuestionario para definir si la casa está en un conjunto cerrado"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 3,
          "NomCuestionarioCampo": "¿La casa está en un conjunto cerrado?",
          "Sigla": "CasaEnConjunto",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 2
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 3
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 3,
          "NomCuestionario": "Presentación en porteria",
          "Descripcion": "Presentación en porteria"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 4,
          "NomCuestionarioCampo": "¿Realizó anélisis de trabajo seguro?",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 3
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 3,
          "NomCuestionario": "Presentación en porteria",
          "Descripcion": "Presentación en porteria"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 5,
          "NomCuestionarioCampo": "¿Tiene carta de responsabilidad de daños?",
          "Orden": 2,
          "Obligatorio": true,
          "CodCuestionario": 3
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 3,
          "NomCuestionario": "Presentación en porteria",
          "Descripcion": "Presentación en porteria"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 6,
          "NomCuestionarioCampo": "Pago parafiscales",
          "Orden": 3,
          "Obligatorio": true,
          "CodCuestionario": 3
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 3,
          "NomCuestionario": "Presentación en porteria",
          "Descripcion": "Presentación en porteria"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 7,
          "NomCuestionarioCampo": "Carnet de la empresa",
          "Orden": 4,
          "Obligatorio": true,
          "CodCuestionario": 3
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 3,
          "NomCuestionario": "Presentación en porteria",
          "Descripcion": "Presentación en porteria"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 8,
          "NomCuestionarioCampo": "Certificado de trabajo en alturas",
          "Orden": 4,
          "Obligatorio": true,
          "CodCuestionario": 3
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 4,
          "NomCuestionario": "¿Novedad Comercial?",
          "Descripcion": "¿Novedad Comercial?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 9,
          "NomCuestionarioCampo": "¿Tiene novedad comercial?",
          "Sigla": "TNovedadComercial",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 4
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 6
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 5,
          "NomCuestionario": "La cobertura del wifi es óptima en todo el previo?",
          "Descripcion": "¿La cobertura del wifi es óptima en todo el previo?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 19,
          "NomCuestionarioCampo": "La cobertura wifi es optima en todo el prebio.",
          "Sigla": "CoberturaWifi",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 5
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 10
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 6,
          "NomCuestionario": "Validación de CTO?",
          "Descripcion": "¿Validación de CTO?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 10,
          "NomCuestionarioCampo": "Validar las vías en TOA ",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 6
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 6,
          "NomCuestionario": "Validación de CTO?",
          "Descripcion": "¿Validación de CTO?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 16,
          "NomCuestionarioCampo": "Limpiar conectores isopropilico, si el conector es optitap mantenerlo con la cobertura hasta realizar la conexión.",
          "Orden": 2,
          "Obligatorio": true,
          "CodCuestionario": 6
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 6,
          "NomCuestionario": "Validación de CTO?",
          "Descripcion": "¿Validación de CTO?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 17,
          "NomCuestionarioCampo": "Cable drop se debe dejar organizado, grapado y marquillado.",
          "Orden": 3,
          "Obligatorio": true,
          "CodCuestionario": 6
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 6,
          "NomCuestionario": "Validación de CTO?",
          "Descripcion": "¿Validación de CTO?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 18,
          "NomCuestionarioCampo": "Siempre utiliza la etiqueta marcando la posicion del hilo y el abonado.",
          "Orden": 4,
          "Obligatorio": true,
          "CodCuestionario": 6
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 6,
          "NomCuestionario": "Validación de CTO?",
          "Descripcion": "¿Validación de CTO?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 15,
          "NomCuestionarioCampo": "El cable drop debe estar organizado y asegurado si es CTO indoor con amarres plasticos a la CTO y es CTO en cámara debe organizarse con las respectivas grapas con la pared",
          "Orden": 5,
          "Obligatorio": true,
          "CodCuestionario": 6
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 7,
          "NomCuestionario": "¿El cliente acepta repetidores?",
          "Descripcion": "¿El cliente acepta repetidores?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 20,
          "NomCuestionarioCampo": "¿El cliente acepta repetidores?",
          "Sigla": "AceptaRepetidores",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 7
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 8,
          "NomCuestionario": "¿Vías ok?",
          "Descripcion": "¿Vías ok?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 21,
          "NomCuestionarioCampo": "¿Vías ok?",
          "Sigla": "ViasOk",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 8
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 15
        }
      },
      {
        "pasoCuestionario": {
          "Id_Cuestionario": 9,
          "NomCuestionario": "¿Alguna novedad para a instalación?",
          "Descripcion": "¿Alguna novedad para a instalación?"
        },
        "pasoCuestionarioCampo": {
          "Id_CuestionarioCampo": 22,
          "NomCuestionarioCampo": "¿Alguna novedad para a instalación?",
          "Sigla": "NovedadInstalacion",
          "Orden": 1,
          "Obligatorio": true,
          "CodCuestionario": 9
        },
        "pasoCampo": {
          "Id_Campo": 1,
          "NomCampo": "ListaSiNo",
          "Descripcion": "Lista desplegable con los valores Si\/No",
          "Tipo": "Lista",
          "Longitud": 0,
          "ExpresionRegular": ""
        },
        "paso_cuestionario": {
          "Id_Paso": 17
        }
      }
    ]
  }];

  pasosUrl = 'http://localhost:3000/api//flujo/list/';
  constructor(private http: HttpClient) { }

  getPasos(id) {
    return this.http.get(this.pasosUrl + id);
  }
}
