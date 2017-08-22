import { Vote } from './vote'

export interface Poll {
    //Titulo
    title: string;
    //Ubicacion
    ubication?: string;
    //Contraseña
    commentary?: string;
    //Voto negativo
    negativeVote?: boolean;
    //Privada
    private?: boolean;
    //Solo un Voto
    oneVote?: boolean;
    //Array posibilidades
    possibilities?: Vote[];
    //Tipo
    type?: string;
    //ID
    _id?: string;
}