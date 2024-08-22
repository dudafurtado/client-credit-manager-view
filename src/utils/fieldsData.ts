interface FieldRegister {
  id: number;
  name: 'name' | 'email' | 'password';
  label: string;
  placeholder: string;
}

interface FieldCreateClient {
  id: number;
  name: 'name' | 'surname' | 'email' | 'birth_date' | 'phone';
  label: string;
  placeholder: string;
}

interface FieldCard {
  id: number;
  name: 'number' | 'expire_date' | 'CVV';
  label: string;
  placeholder: string;
}

interface FieldAdress {
  id: number;
  name:
    | 'zip_code'
    | 'state'
    | 'city'
    | 'neighborhood'
    | 'street'
    | 'additional_information';
  label: string;
  placeholder: string;
}

export const fieldsRegister: FieldRegister[] = [
  {
    id: 1,
    name: 'name',
    label: 'Name',
    placeholder: 'Maria Eduarda',
  },
  {
    id: 2,
    name: 'email',
    label: 'Email',
    placeholder: 'mariaeduarda@email.com',
  },
  {
    id: 3,
    name: 'password',
    label: 'Senha',
    placeholder: '**************',
  },
];

export const fieldsCreateClient: FieldCreateClient[] = [
  {
    id: 1,
    name: 'name',
    label: 'Name',
    placeholder: 'Maria Eduarda',
  },
  {
    id: 2,
    name: 'surname',
    label: 'Sobrenome',
    placeholder: 'Cerqueira Furtado Melo',
  },
  {
    id: 3,
    name: 'email',
    label: 'Email',
    placeholder: 'mariaeduarda@email.com',
  },
  {
    id: 4,
    name: 'birth_date',
    label: 'Data de Nascimento',
    placeholder: '2003-05-20',
  },
  {
    id: 5,
    name: 'phone',
    label: 'Telefone',
    placeholder: '(71) 99951-6225',
  },
];

export const fieldsCard: FieldCard[] = [
  {
    id: 1,
    name: 'number',
    label: 'Número',
    placeholder: '5237 7955 2639 6527',
  },
  {
    id: 2,
    name: 'expire_date',
    label: 'Data de expiração',
    placeholder: '03/29',
  },
  {
    id: 3,
    name: 'CVV',
    label: 'CVV',
    placeholder: '456',
  },
];

export const fieldsAddress: FieldAdress[] = [
  {
    id: 1,
    name: 'zip_code',
    label: 'CEP',
    placeholder: '40080003',
  },
  {
    id: 2,
    name: 'state',
    label: 'Estado',
    placeholder: 'Bahia',
  },
  {
    id: 3,
    name: 'city',
    label: 'Cidade',
    placeholder: 'Salvador',
  },
  {
    id: 4,
    name: 'neighborhood',
    label: 'Bairro',
    placeholder: 'Vitória',
  },
  {
    id: 5,
    name: 'street',
    label: 'Rua',
    placeholder: 'Avenida Sete de Setembro',
  },
  {
    id: 6,
    name: 'additional_information',
    label: 'Complemento',
    placeholder: 'Número 2613, Edf. Vitória, Apt. 302',
  },
];
