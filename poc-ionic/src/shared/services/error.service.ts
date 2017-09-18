import { Injectable } from '@angular/core';
import { AlertController, Alert } from 'ionic-angular';
import { NavController, App } from 'ionic-angular';
import { config } from '../config'

//Este servicio va a devolver un objeto alert para mostrar en la página que lo invoca
@Injectable()
export class ErrorService {

    private navCtr: NavController;

    constructor(public alertCtr: AlertController,
        public app: App) {
        this.navCtr = app.getRootNav();
    }

    //Este método recibe el status del error que ha devuelto el back y crea un objeto alert en funcion de cual es ese status
    creaAlertError(error:any , status: number, isLogin: boolean): Alert {
        let alert;
        let title: string = 'error.title';
        let message: string = '';
        let button: string = 'error.button';
        let errorCode = "";
        if (error.errorCode) {
            errorCode=error.errorCode.replace(".","_");
        }else{
            error='';
        }
        if (isNaN(status)) {
            status=500;
        }
        let keyError = ['error',errorCode+'-message'].join('.');
        let keyStatus = ['error',status+'-message'].join('.');

        if (isLogin && status === 401) { //Si nos ha dado un 401 en login, es fallo de autenticación
            message = 'login.401-message';
        } else if (keyError !== keyError) { //Si tenemos una clave en el json de traducciones, usamos el errorCode nuestro
            message=keyError;
        } else if (keyStatus !== keyStatus){ //Si no hay clave para el error y el statusCode no está en los que tenem
            message= keyStatus;
        } else {
            message= 'error.not-defined-message';
        }

        alert = this.alertCtr.create({
            title: title,
            message: message,
            buttons: [{
                text: button
            }]
        })
        return alert;
    }
}

