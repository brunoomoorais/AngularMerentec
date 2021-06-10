import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PratoDto } from '../interfaces/prato';
import { PratoService } from '../prato.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  nome: string;
  descricao: string;
  peso: number;
  proteina: number;
  fibra: number;
  carboidrato: number;
  sodio: number;
  valorEnergetico: number;
  gorduraTrans: number;
  gorduraSaturada: number;
  gorduraTotal: number;
  display = 'hidden';

  constructor(public pratoService: PratoService, public router: Router) {
    this.display = 'hidden';
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  async adicionar() {
    this.display = 'visible';
    let prato: PratoDto = {
      nome: this.nome,
      descricao: this.descricao,
      peso: this.peso,
      proteina: this.proteina,
      fibra: this.fibra,
      carboidrato: this.carboidrato,
      sodio: this.sodio,
      valorEnergetico: this.valorEnergetico,
      gorduraTrans: this.gorduraTrans,
      gorduraSaturada: this.gorduraSaturada,
      gorduraTotal: this.gorduraTotal
    };

    this.pratoService.insert(prato);
    await this.delay(6000);
    this.display = 'hidden';
    this.router.navigate(['/merendeira']);
  }

  ngOnInit() {}
}
