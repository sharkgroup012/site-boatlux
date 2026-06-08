export type Boat = {
  slug: string;
  name: string;
  type: "lancha" | "jet";
  location: string;
  specs: {
    comprimento?: string;
    motor?: string;
    capacidade?: string;
    ano?: string;
    potencia?: string;
  };
  description: string;
  images: string[];
  featured: boolean;
  available: boolean;
  priceRange?: string;
};

export const boats: Boat[] = [
  {
    slug: "lancha-l1",
    name: "Lancha L1",
    type: "lancha",
    location: "Ubatuba",
    specs: {
      comprimento: "7,5m",
      motor: "Mercruiser 260HP",
      capacidade: "8 pessoas",
      ano: "2022",
    },
    description:
      "Lancha de alto padrão com design moderno, equipada com eletrônica de bordo completa. Ideal para passeios em família com conforto e segurança.",
    images: [
      "/images/embarcacoes/l1/1.jpg",
      "/images/embarcacoes/l1/2.jpg",
      "/images/embarcacoes/l1/3.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    slug: "lancha-l12",
    name: "Lancha L12",
    type: "lancha",
    location: "São Sebastião",
    specs: {
      comprimento: "9,2m",
      motor: "Volvo Penta 320HP",
      capacidade: "10 pessoas",
      ano: "2023",
    },
    description:
      "Lancha premium com cabine completa, banheiro a bordo e área de sol espaçosa. Para quem busca o máximo em conforto náutico.",
    images: [
      "/images/embarcacoes/l12/1.jpg",
      "/images/embarcacoes/l12/2.jpg",
      "/images/embarcacoes/l12/3.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    slug: "lancha-l3",
    name: "Lancha L3",
    type: "lancha",
    location: "Caraguatatuba",
    specs: {
      comprimento: "6,8m",
      motor: "Mercruiser 220HP",
      capacidade: "7 pessoas",
      ano: "2021",
    },
    description:
      "Lancha ágil e versátil, perfeita para explorar as ilhas e praias paradisíacas do Litoral Norte Paulista.",
    images: [
      "/images/embarcacoes/l3/1.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    slug: "lancha-l4",
    name: "Lancha L4",
    type: "lancha",
    location: "Ilhabela",
    specs: {
      comprimento: "8,0m",
      motor: "MerCruiser 280HP",
      capacidade: "9 pessoas",
      ano: "2022",
    },
    description:
      "Embarcação de luxo com acabamento impecável, ideal para o arquipélago de Ilhabela.",
    images: [
      "/images/embarcacoes/l4/1.jpg",
    ],
    featured: false,
    available: true,
  },
  {
    slug: "lancha-l8",
    name: "Lancha L8",
    type: "lancha",
    location: "Ubatuba",
    specs: {
      comprimento: "8,5m",
      motor: "Volvo Penta 300HP",
      capacidade: "10 pessoas",
      ano: "2023",
    },
    description:
      "Lancha top de linha com hardtop, ar condicionado e todos os itens de segurança.",
    images: [
      "/images/embarcacoes/l8/1.jpg",
    ],
    featured: false,
    available: true,
  },
  {
    slug: "jet-j12",
    name: "Jet Ski J12",
    type: "jet",
    location: "Ubatuba",
    specs: {
      motor: "Yamaha 1.8L",
      capacidade: "3 pessoas",
      potencia: "180HP",
      ano: "2023",
    },
    description:
      "Jet ski de alto desempenho para adrenalina e diversão nas águas do litoral.",
    images: [
      "/images/embarcacoes/j12/1.png",
    ],
    featured: false,
    available: true,
  },
  {
    slug: "jet-j4",
    name: "Jet Ski J4",
    type: "jet",
    location: "Caraguatatuba",
    specs: {
      motor: "Sea-Doo 1.5L",
      capacidade: "2 pessoas",
      potencia: "155HP",
      ano: "2022",
    },
    description:
      "Jet ski compacto e potente, ideal para iniciantes e experientes.",
    images: [
      "/images/embarcacoes/j4/1.png",
    ],
    featured: false,
    available: true,
  },
  {
    slug: "jet-j13",
    name: "Jet Ski J13",
    type: "jet",
    location: "São Sebastião",
    specs: {
      motor: "Yamaha FX Series",
      capacidade: "3 pessoas",
      potencia: "200HP",
      ano: "2024",
    },
    description:
      "Top da linha dos jet skis, com tecnologia de ponta e estabilidade superior.",
    images: [
      "/images/embarcacoes/j13/1.jpg",
      "/images/embarcacoes/j13/2.jpg",
    ],
    featured: false,
    available: true,
  },
];

export function getBoatBySlug(slug: string): Boat | undefined {
  return boats.find((b) => b.slug === slug);
}

export function getFeaturedBoats(): Boat[] {
  return boats.filter((b) => b.featured);
}

export function getBoatsByType(type: "lancha" | "jet"): Boat[] {
  return boats.filter((b) => b.type === type);
}
