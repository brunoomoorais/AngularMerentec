import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prato } from '../interfaces/prato';
import { PratoService } from '../prato.service';

@Component({
  selector: 'app-editar-prato',
  templateUrl: './editar-prato.component.html',
  styleUrls: ['./editar-prato.component.css']
})
export class EditarPratoComponent implements OnInit {
  id: number;
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
  current: Prato;
  display = 'hidden';

  constructor(public pratoService: PratoService, private router: Router) {
    if (this.pratoService.currentPrato == null)
      this.router.navigate(['/merendeira']);
    this.current = this.pratoService.currentPrato;
    this.setDados();
    this.display = 'hidden';
  }

  setDados() {
    this.id = this.current.id;
    this.nome = this.current.nome;
    this.descricao = this.current.descricao;
    this.peso = this.current.peso;
    this.proteina = this.current.proteina;
    this.fibra = this.current.fibra;
    this.carboidrato = this.current.carboidrato;
    this.sodio = this.current.sodio;
    this.valorEnergetico = this.current.valorEnergetico;
    this.gorduraTrans = this.current.gorduraTrans;
    this.gorduraSaturada = this.current.gorduraSaturada;
    this.gorduraTotal = this.current.gorduraTotal;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async atualizar() {
    this.display = 'visible';
    let pratoAtt: Prato = {
      id: this.id,
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
    this.pratoService.update(pratoAtt);
    await this.delay(5000);
    this.display = 'hidden';
    this.router.navigate(['/merendeira']);
  }

  ngOnInit() {}
}
