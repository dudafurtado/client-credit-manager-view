interface FieldRegister {
  id: number;
  name: 'name' | 'email' | 'password';
  label: string;
  placeholder: string;
  type: string;
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
    placeholder: 'Adminstrador',
    type: 'text',
  },
  {
    id: 2,
    name: 'email',
    label: 'Email',
    placeholder: 'admin@email.com',
    type: 'text',
  },
  {
    id: 3,
    name: 'password',
    label: 'Senha',
    placeholder: '********',
    type: 'password',
  },
];

export const fieldsCreateClient: FieldCreateClient[] = [
  {
    id: 1,
    name: 'name',
    label: 'Name',
    placeholder: 'Cliente',
  },
  {
    id: 2,
    name: 'surname',
    label: 'Sobrenome',
    placeholder: 'Novo',
  },
  {
    id: 3,
    name: 'email',
    label: 'Email',
    placeholder: 'cliente@email.com',
  },
  {
    id: 4,
    name: 'birth_date',
    label: 'Data de Nascimento',
    placeholder: '2000-10-04',
  },
  {
    id: 5,
    name: 'phone',
    label: 'Telefone',
    placeholder: '(75) 99999-0000',
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
    placeholder: '72318327',
  },
  {
    id: 2,
    name: 'state',
    label: 'Estado',
    placeholder: 'DF',
  },
  {
    id: 3,
    name: 'city',
    label: 'Cidade',
    placeholder: 'Brasília',
  },
  {
    id: 4,
    name: 'neighborhood',
    label: 'Bairro',
    placeholder: 'Samambaia Norte (Samambaia)',
  },
  {
    id: 5,
    name: 'street',
    label: 'Rua',
    placeholder: 'Quadra QR 408',
  },
  {
    id: 6,
    name: 'additional_information',
    label: 'Complemento',
    placeholder: 'Conjunto 24-A',
  },
];
