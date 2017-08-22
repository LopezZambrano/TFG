import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

    public capitalize(text) {
        function MaysPrimera(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return MaysPrimera(text.toLowerCase());
    }

}