import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AvailableDate } from '../../models/available-date';
import { Vote } from '../../models/vote'


@Component({
    selector: 'page-calendar',
    templateUrl: 'calendar.html',
})

export class Calendar implements OnInit {
    // Recibo fechas no disponibles
    @Input() public fechas: Vote[];
    @Output() public day = new EventEmitter();

    private dateToday: Date;
    private dateSelect: Date[];
    private month: Date;
    private offset: number = 3;
    private monthDays: number = 31;
    private cells: string[] = [];
    private selected: number = 0;
    constructor(public navCtrl: NavController) { }


    public ngOnInit() {

        this.dateSelect = this.createArray()
        this.dateToday = new Date();

        this.initializeValues(this.dateToday.getMonth(), this.dateToday.getFullYear());

    }

    public initializeValues(month, year) {
        // Obtengo el mes
        this.month = new Date(year, month, 1);

        // Espacio delante del dia 1
        this.offset = this.month.getUTCDay();
        this.monthDays = new Date(year, month + 1, 0).getDate();

        // Numero de celdas necesarias
        const monthAndOffset = this.monthDays + this.offset;
        this.cells = new Array(monthAndOffset + (7 - monthAndOffset % 7));

        /*this.searchWeekend();*/
    }

    public searchAvailable(day) {
        const dateSearch = new Date(this.month.getFullYear(), this.month.getMonth(), Number(day));
        const coi = this.dateSelect.find(date => date.getTime() === dateSearch.getTime());
        return coi;
    }

/*    public searchWeekend() {
        let i = 1;
        for (i; i <= this.monthDays; i++) {
            const day = new Date(this.month.getFullYear(), this.month.getMonth(), i);
            if (day.getDay() === 6 || day.getDay() === 0) {
                this.dateSelect.push(day);
            }
        }
    }*/

    // Muestra el dia en el html
    public getDay(i: number): any {
        const day = i + 1 - this.offset;

        if (day > 0 && (day <= this.monthDays)) {
            return day;
        } else {
            return '';
        }
    }

    public getStatus(i: number) {
        const day = this.getDay(i);

        if (day === '') {
            return 'empty';
        } else {
            if ((day < this.dateToday.getDate()) && this.dateToday.getMonth() === this.month.getMonth()) {
                return 'past';
            } else if (this.selected === day) {
                return 'select';
            } else if (!this.searchAvailable(day)) {
                return 'available';
            } else {
                return 'notAvailable';
            }
        }
    }

    public selectedDay(i) {
        const status = this.getStatus(i);
        const day = i + 1 - this.offset;

        if ((status == 'notAvailable')) {
            this.selected = day;
            this.day.emit(new Date(this.month.getFullYear(), this.month.getMonth(), day));
        }
    }

    public nextMonth() {
        this.initializeValues(this.month.getMonth() + 1, this.month.getFullYear());

    }

    public backMonth() {
        this.initializeValues(this.month.getMonth() - 1, this.month.getFullYear());

    }

    public createArray(): Date[]{
        let arrayDias = [];
        let i;
        for (i=0; i < this.fechas.length; i++){
            let date: Date = new Date(this.fechas[i].option.date);
            arrayDias.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0))
                            
        }
        console.log(arrayDias)
        return arrayDias;
        
    }
}
