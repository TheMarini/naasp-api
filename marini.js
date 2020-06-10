var obj = {
  "education": {
    "level": "Graduação",
    "status": "Em curso"
  },
  "address": {
    "publicPlace": "Rua do Limão",
    "number": 42,
    "complement": "Apto. 101",
    "neighborhood": "Limoeiro",
    "city": "Belo Horizonte",
    "state": "Minas Gerais",
    "cep": "12313-131"
  },
  "contact": {
    "cellPhoneNumber": "(12) 3 1231-3123",
    "homePhoneNumber": "(13) 1 2312-3123",
    "businessPhoneNumber": "(31) 2 3123-1231"
  },
  "responsible": {
    "name": "Spike Jonze",
    "rg": "12.312.312-3",
    "cpf": "123.123.131-23"
  },
  "family": [
    {
      "name": "Spike Jonze",
      "kinship": 3,
      "age": 42,
      "education": {
        "level": "Mestrado",
        "status": "Em curso"
      },
      "jobRole": "Professor",
      "isCohabiting": true,
      "phoneNumber": "(12) 3 1231-3123",
      "income": 1045.42
    },
    {
      "name": "Sofia Copola",
      "kinship": 1,
      "age": 40,
      "education": {
        "level": "Mestrado",
        "status": "Em curso"
      },
      "jobRole": "Jornalista",
      "isCohabiting": "false",
      "phoneNumber": "(13) 1 2313-1312",
      "income": 1300.45
    }
  ],
  "money": {
    "governmentBenefit": {
      "name": "Bolsa Família",
      "value": 41
    },
    "familyIncomeComments": "Nenhuma observação."
  },
  "home": {
    "housingCondition": "Alugada"
  },
  "health": {
    "family": {
      "alcoholAbuse": "Tio",
      "diseases": "Avó - Alzhaimer",
      "medicines": "Tio - Atenolol"
    },
    "qtdCigarettes": 3,
    "qtdDrinks": 2,
    "physicalActivity": "Futebol, Ciclismo",
    "medicines": "Omeprazol"
  },
  "affiliation": {
    "parish": "Igreja Nossa Sra. do Carmo",
    "religiousActivities": "Grupo de Estudos"
  },
  "others": {
    "comments": "Nenhuma observação.",
    "demands": "Nenhuma demanda."
  },
  "name": "Bruno Marini",
  "birthDate": "2010-09-01",
  "age": 9,
  "isUnderAge": true,
  "cpf": "131.231.231-23",
  "rg": "13.123.123-1",
  "gender": "M",
  "matrialStatus": "Solteiro",
  "jobRole": "Desenvolvedor Full-Stack",
  "placeOfBirth": "São Paulo, SP",
  "nationality": "Brasileira",
  "religion": "Agnóstico",
  "email": "bruno@marini.com",
  "priority": "2"
};

function patientTranslated(obj) {
      return {
        religiao: obj.religion,
        bairro: obj.address.neighborhood,
        cidade: obj.address.city,
        estado: obj.address.state,
        endereco: {
          rua: obj.address.publicPlace,
          numero: obj.address.number,
          complemento: obj.address.complement,
          // cep: obj.address.cep,
        },
        pessoa: {
          nome: obj.name,
          estado_civil: obj.matrialStatus,
          // cpf: obj.cpf,
          data_nascimento: obj.birthDate,
          sex: obj.gender,
          naturalidade: obj.placeOfBirth,
          nacionalidade: obj.nationality,
          situacao_profissional: obj.jobRole,
          escolaridade: `${obj.education.level} - ${obj.education.status}`,
        },
        acolhido: {
          atividade_fisica: obj.health.physicalActivity,
          bebida_quantidade: obj.health.qtdDrinks,
          paroquia: obj.affiliation.parish,
          atividades_religiosas: obj.affiliation.religiousActivities,
          demanda: obj.others.demands,
          observacao: obj.others.comments,
        },
        familiares: obj.family.map((member) => ({
          nome: member.name,
          parentesco: member.kinship,
          escolaridade: `${member.education.level} - ${member.education.status}`,
          ocupacao: member.jobRole,
          cohabita: member.isCohabiting,
          // telefone: member.phoneNumber,
          renda: member.income,
        })),
      };
    }

  console.log(JSON.stringify(patientTranslated(obj)));

  // 
  // {
  //   "religiao": "Agnóstico",
  //   "bairro": "Limoeiro",
  //   "cidade": "Belo Horizonte",
  //   "estado": "Minas Gerais",
  //   "endereco": {
  //     "rua": "Rua do Limão",
  //     "numero": 42,
  //     "complemento": "Apto. 101"
  //   },
  //   "pessoa": {
  //     "nome": "Bruno Marini",
  //     "estado_civil": "Solteiro",
  //     "data_nascimento": "2010-09-01",
  //     "sex": "M",
  //     "naturalidade": "São Paulo, SP",
  //     "nacionalidade": "Brasileira",
  //     "situacao_profissional": "Desenvolvedor Full-Stack",
  //     "escolaridade": "Graduação - Em curso"
  //   },
  //   "acolhido": {
  //     "atividade_fisica": "Futebol, Ciclismo",
  //     "bebida_quantidade": 2,
  //     "paroquia": "Igreja Nossa Sra. do Carmo",
  //     "atividades_religiosas": "Grupo de Estudos",
  //     "demanda": "Nenhuma demanda.",
  //     "observacao": "Nenhuma observação."
  //   },
  //   "familiares": [
  //     {
  //       "nome": "Spike Jonze",
  //       "parentesco": 3,
  //       "escolaridade": "Mestrado - Em curso",
  //       "ocupacao": "Professor",
  //       "cohabita": true,
  //       "renda": 1045.42
  //     },
  //     {
  //       "nome": "Sofia Copola",
  //       "parentesco": 1,
  //       "escolaridade": "Mestrado - Em curso",
  //       "ocupacao": "Jornalista",
  //       "cohabita": "false",
  //       "renda": 1300.45
  //     }
  //   ]
  // }
