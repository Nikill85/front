import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnChanges {

  @Input()
  columnas: any[] = [];
  @Input()
  info: any[] = [];
  @Output() emitAction: EventEmitter<any> = new EventEmitter<any>();
  @Input() mostrarAcciones: boolean = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change: ", changes);
  }

  emitirAcccion(cual: string, datos: any) {
    let objetoEmitir = {
      accion: cual,
      datos: datos,
      quieroAgregarEsto: true
    };
    this.emitAction.emit(objetoEmitir);
  }
}