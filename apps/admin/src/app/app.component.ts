import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'foto-online-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
      this.primengConfig.ripple = true;
      this.primengConfig.setTranslation({
        firstDayOfWeek: 1,
        dayNames: [ "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "Dom","Lun","Mar","Mié","Jue","Vie","Sáb" ],
        monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
        today: 'Hoy',
        clear: 'Borrar'
    });
  }
}
