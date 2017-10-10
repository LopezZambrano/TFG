import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Network } from '@ionic-native/network';
import { ErrorService } from '../services/error.service';
import { config } from '../config'

@Injectable()
export class HttpCustomService {

    constructor(public http: Http,
        private network: Network,
        private errorService: ErrorService) { }

    //este metodo recupera el token y lo pasa a la cabecera de la llamada a http al hacer post
    doPost(url: string, body: any, token?: boolean): Observable<Response> {
        if (this.network.type !== 'none') {
            return Observable.fromPromise(this.generateOptions(token))
                .flatMap(options => {
                    return this.http.post(url, body, options);
                });
        } else {
            this.errorService.creaAlertError({}, 600, false).present();

        }
    }

    doPut(url: string, body: any, token?: boolean): Observable<Response> {
        if (this.network.type !== 'none') {
            return Observable.fromPromise(this.generateOptions(token))
                .flatMap(options => {
                    return this.http.put(url, body, options);
                });
        } else {
            this.errorService.creaAlertError({}, 600, false).present();
        }
    }

    //este metodo recupera el token y lo pasa a la cabecera de la llamada a http al hacer get
    doGet(url: string, token?: boolean, params?): Observable<Response> {
        if (this.network.type !== 'none') {
            return Observable.fromPromise(this.generateOptions(token, params))
                .flatMap((options) => {
                    return this.http.get(url, options);
                });
        } else {
            this.errorService.creaAlertError({}, 600, false).present();

        }
    }
    //Esta funcion genera las options para pasarle a la llamada a http
    private generateOptions(token: boolean, params?): Promise<any> {
        let headersPromise;
        
        headersPromise = this.generateHeaders();
        
        return headersPromise
            .then(headers => {
                let options: any = {
                    headers: headers
                };
                if (params) {
                    options.search = params;
                }
                return new RequestOptions(options);
            })
    }


    //esta funcion genera la cabecera sin token
    private generateHeaders(): Promise<Headers> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return Promise.resolve(headers);
    }


}
