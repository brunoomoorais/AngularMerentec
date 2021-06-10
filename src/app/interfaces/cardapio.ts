export interface Cardapio {
  data: string;
  usuario: [
    {
      id: number;
      login: string;
      perfis: string[];
      nome: string;
    }
  ];
  prato: {
    id: number;
    proteina: number;
    gorduraTrans: number;
    gorduraTotal: number;
    gorduraSaturada: number;
    nome: string;
    descricao: string;
    peso: number;
    fibra: number;
    sodio: number;
    valorEnergetico: number;
    carboidrato: number;
  };
}

export interface CardapioDto {
  data: string;
  usuario: Usuario[];
  prato: {
    id: number;
    proteina: number;
    gorduraTrans: number;
    gorduraTotal: number;
    gorduraSaturada: number;
    nome: string;
    descricao: string;
    peso: number;
    fibra: number;
    sodio: number;
    valorEnergetico: number;
    carboidrato: number;
  };
}

export interface Usuario {
  id: number;
  login: string;
  perfis: number[];
  nome: string;
}
