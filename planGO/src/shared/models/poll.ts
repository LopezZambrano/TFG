import { Vote } from './vote'

export interface Poll {
    //Titulo
    title: string;
    //Ubicacion
    ubication?: string;
    //Contraseña
    commentary?: string;
    //Solo un Voto
    oneVote?: boolean;
    //Array posibilidades
    possibilities?: Vote[];
    //Tipo
    type?: string;
    //ID
    _id?: string;
}