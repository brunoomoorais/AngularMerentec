export interface Prato {
  id: number;
  nome: string;
  descricao: string;
  proteina: number;
  gorduraTrans: number;
  gorduraTotal: number;
  gorduraSaturada: number;
  peso: number;
  fibra: number;
  sodio: number;
  valorEnergetico: number;
  carboidrato: number;
}

export interface PratoDto {
  nome: string;
  descricao: string;
  proteina: number;
  gorduraTrans: number;
  gorduraTotal: number;
  gorduraSaturada: number;
  peso: number;
  fibra: number;
  sodio: number;
  valorEnergetico: number;
  carboidrato: number;
}
