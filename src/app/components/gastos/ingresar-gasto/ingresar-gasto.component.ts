import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css'],
})
export class IngresarGastoComponent implements OnInit {
  nombreGasto: string = '';
  cantidad!: number;
  formulaioIncorrecto: boolean = false;
  textoIncorrecto: string = '';

  constructor(private _presupuestoService: PresupuestoService) {}

  agregarGasto() {
    if (this.cantidad > this._presupuestoService.restante) {
      this.formulaioIncorrecto = true;
      this.textoIncorrecto =
        'La cantidad ingresada es mayor al presupuesto restante ';
      return;
    }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.formulaioIncorrecto = true;
      this.textoIncorrecto = 'Gasto o cantidad incorrecta';
    } else {
      // crear el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad,
      };
      // enviamos el objeto a los subscriptores via subject
      this._presupuestoService.agregarGasto(GASTO);
      // reseteamos el formulario

      this.formulaioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
  ngOnInit(): void {}
}
