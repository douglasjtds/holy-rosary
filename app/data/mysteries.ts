export interface Mystery {
  name: string;
  desc: string;
}

export interface MysterySet {
  title: string;
  days: string;
  color: string;
  mysteries: Mystery[];
}

export const mysterySets: MysterySet[] = [
  {
    title: "Mistérios Gozosos",
    days: "Segundas e Sábados",
    color: "#D4A853",
    mysteries: [
      { name: "A Anunciação", desc: "O Anjo Gabriel anuncia a Maria que ela será a Mãe de Jesus." },
      { name: "A Visitação", desc: "Maria visita sua prima Santa Isabel." },
      { name: "O Nascimento", desc: "Jesus nasce em Belém." },
      { name: "A Apresentação", desc: "Jesus é apresentado no Templo." },
      { name: "A Perda e Encontro", desc: "Maria e José encontram Jesus no Templo entre os doutores." },
    ],
  },
  {
    title: "Mistérios Luminosos",
    days: "Quintas-feiras",
    color: "#A8C4D4",
    mysteries: [
      { name: "O Batismo", desc: "Jesus é batizado no Rio Jordão." },
      { name: "As Bodas de Caná", desc: "Jesus realiza seu primeiro milagre." },
      { name: "O Anúncio do Reino", desc: "Jesus convida à conversão e anuncia o Reino de Deus." },
      { name: "A Transfiguração", desc: "Jesus se transfigura no Monte Tabor." },
      { name: "A Instituição da Eucaristia", desc: "Jesus institui a Eucaristia na Última Ceia." },
    ],
  },
  {
    title: "Mistérios Dolorosos",
    days: "Terças e Sextas-feiras",
    color: "#C48A7C",
    mysteries: [
      { name: "A Agonia", desc: "Jesus ora no Horto das Oliveiras." },
      { name: "A Flagelação", desc: "Jesus é açoitado." },
      { name: "A Coroação de Espinhos", desc: "Jesus é coroado de espinhos." },
      { name: "O Caminho do Calvário", desc: "Jesus carrega a cruz." },
      { name: "A Crucificação", desc: "Jesus morre na cruz." },
    ],
  },
  {
    title: "Mistérios Gloriosos",
    days: "Quartas-feiras e Domingos",
    color: "#9BB88D",
    mysteries: [
      { name: "A Ressurreição", desc: "Jesus ressuscita dos mortos." },
      { name: "A Ascensão", desc: "Jesus sobe ao Céu." },
      { name: "A Descida do Espírito Santo", desc: "O Espírito Santo desce sobre os apóstolos." },
      { name: "A Assunção", desc: "Maria é elevada ao Céu em corpo e alma." },
      { name: "A Coroação", desc: "Maria é coroada Rainha do Céu e da Terra." },
    ],
  },
];

// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
export const dayMap: Record<number, number> = { 0: 3, 1: 0, 2: 2, 3: 3, 4: 1, 5: 2, 6: 0 };

export const dayNames = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
