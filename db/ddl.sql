    -- Drop table

    -- DROP TABLE AbusoAlcoolFamilia;

    CREATE TABLE AbusoAlcoolFamilia (
        id serial NOT NULL,
        descricao varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        AcolhidoId int4 NULL,
        CONSTRAINT AbusoAlcoolFamilia_pkey PRIMARY KEY (id),
        CONSTRAINT AbusoAlcoolFamilia_AcolhidoId_fkey FOREIGN KEY (AcolhidoId) REFERENCES Acolhido(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Acolhido;

    CREATE TABLE Acolhido (
        id serial NOT NULL,
        atividade_fisica varchar(255) NULL,
        bebida_quantidade varchar(255) NULL,
        bebida_periodicidade varchar(255) NULL,
        numero_cigarros_por_dia int4 NULL,
        paroquia varchar(255) NULL,
        atividades_religiosas varchar(255) NULL,
        demanda varchar(255) NULL,
        localNascimento varchar(255) NULL,
        encaminhamento varchar(255) NULL,
        observacao varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        PessoaId int4 NULL,
        ReligiaoId int4 NULL,
        CONSTRAINT Acolhido_pkey PRIMARY KEY (id),
        CONSTRAINT Acolhido_PessoaId_fkey FOREIGN KEY (PessoaId) REFERENCES Pessoa(id) ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT Acolhido_ReligiaoId_fkey FOREIGN KEY (ReligiaoId) REFERENCES Religiao(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Bairro;

    CREATE TABLE Bairro (
        id serial NOT NULL,
        nome varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        CONSTRAINT Bairro_pkey PRIMARY KEY (id)
    );

    -- Drop table

    -- DROP TABLE Cidade;

    CREATE TABLE Cidade (
        id serial NOT NULL,
        nome varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        CONSTRAINT Cidade_pkey PRIMARY KEY (id)
    );

    -- Drop table

    -- DROP TABLE Contato;

    CREATE TABLE Contato (
        id serial NOT NULL,
        status varchar(255) NULL,
        AcolhidoId int4 NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        CONSTRAINT Contato_pkey PRIMARY KEY (id)
    );

    -- Drop table

    -- DROP TABLE DoencaFamilia;

    CREATE TABLE DoencaFamilia (
        id serial NOT NULL,
        doenca varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        AcolhidoId int4 NULL,
        FamiliarId int4 NULL,
        CONSTRAINT DoencaFamilia_pkey PRIMARY KEY (id),
        CONSTRAINT DoencaFamilia_AcolhidoId_fkey FOREIGN KEY (AcolhidoId) REFERENCES Acolhido(id) ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT DoencaFamilia_FamiliarId_fkey FOREIGN KEY (FamiliarId) REFERENCES Familiar(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Endereco;

    CREATE TABLE Endereco (
        id serial NOT NULL,
        rua varchar(255) NULL,
        numero int4 NULL,
        complemento varchar(255) NULL,
        cep int4 NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        PessoaId int4 NULL,
        CidadeId int4 NULL,
        BairroId int4 NULL,
        CONSTRAINT Endereco_pkey PRIMARY KEY (id),
        CONSTRAINT Endereco_BairroId_fkey FOREIGN KEY (BairroId) REFERENCES Bairro(id) ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT Endereco_CidadeId_fkey FOREIGN KEY (CidadeId) REFERENCES Cidade(id) ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT Endereco_PessoaId_fkey FOREIGN KEY (PessoaId) REFERENCES Pessoa(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Especialidade;

    CREATE TABLE Especialidade (
        id serial NOT NULL,
        nome varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        CONSTRAINT Especialidade_pkey PRIMARY KEY (id)
    );

    -- Drop table

    -- DROP TABLE Familiar;

    CREATE TABLE Familiar (
        id serial NOT NULL,
        nome varchar(255) NULL,
        parentesco varchar(255) NULL,
        data_nascimento timestamp NULL,
        escolaridade varchar(255) NULL,
        ocupacao varchar(255) NULL,
        cohabita bool NULL,
        telefone int4 NULL,
        renda int4 NULL,
        responsavel bool NULL,
        rg int4 NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        AcolhidoId int4 NULL,
        CONSTRAINT Familiar_pkey PRIMARY KEY (id),
        CONSTRAINT Familiar_AcolhidoId_fkey FOREIGN KEY (AcolhidoId) REFERENCES Acolhido(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE MedicamentoContinuo;

    CREATE TABLE MedicamentoContinuo (
        id serial NOT NULL,
        medicamento varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        AcolhidoId int4 NULL,
        CONSTRAINT MedicamentoContinuo_pkey PRIMARY KEY (id),
        CONSTRAINT MedicamentoContinuo_AcolhidoId_fkey FOREIGN KEY (AcolhidoId) REFERENCES Acolhido(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Pessoa;

    CREATE TABLE Pessoa (
        id serial NOT NULL,
        estado_civil varchar(255) NULL,
        cpf int4 NULL,
        rg int4 NULL,
        email varchar(255) NULL,
        sexo varchar(255) NULL,
        nacionalidade varchar(255) NULL,
        naturalidade varchar(255) NULL,
        situacao_profissional varchar(255) NULL,
        escolaridade varchar(255) NULL,
        nome varchar(255) NULL,
        data_nascimento timestamp NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        CONSTRAINT Pessoa_pkey PRIMARY KEY (id)
    );

    -- Drop table

    -- DROP TABLE Religiao;

    CREATE TABLE Religiao (
        id serial NOT NULL,
        nome varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        CONSTRAINT Religiao_pkey PRIMARY KEY (id)
    );

    -- Drop table

    -- DROP TABLE SequelizeMeta;

    CREATE TABLE SequelizeMeta (
        name varchar(255) NOT NULL,
        CONSTRAINT SequelizeMeta_pkey PRIMARY KEY (name)
    );

    -- Drop table

    -- DROP TABLE Sessao;

    CREATE TABLE Sessao (
        id serial NOT NULL,
        dataSessao timestamp NULL,
        presenca varchar(255) NULL,
        observacao varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        AcolhidoId int4 NULL,
        VoluntarioId int4 NULL,
        CONSTRAINT Sessao_pkey PRIMARY KEY (id),
        CONSTRAINT Sessao_AcolhidoId_fkey FOREIGN KEY (AcolhidoId) REFERENCES Acolhido(id) ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT Sessao_VoluntarioId_fkey FOREIGN KEY (VoluntarioId) REFERENCES Voluntario(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Telefone;

    CREATE TABLE Telefone (
        id serial NOT NULL,
        numero int4 NULL,
        ddd int4 NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        PessoaId int4 NULL,
        CONSTRAINT Telefone_pkey PRIMARY KEY (id),
        CONSTRAINT Telefone_PessoaId_fkey FOREIGN KEY (PessoaId) REFERENCES Pessoa(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Usuario;

    CREATE TABLE Usuario (
        id serial NOT NULL,
        login varchar(255) NULL,
        senha varchar(255) NULL,
        perfil varchar(255) NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        AcolhidoId int4 NULL,
        CONSTRAINT Usuario_pkey PRIMARY KEY (id),
        CONSTRAINT Usuario_AcolhidoId_fkey FOREIGN KEY (AcolhidoId) REFERENCES Acolhido(id) ON UPDATE CASCADE ON DELETE SET NULL
    );

    -- Drop table

    -- DROP TABLE Voluntario;

    CREATE TABLE Voluntario (
        id serial NOT NULL,
        createdAt timestamp NOT NULL,
        updatedAt timestamp NOT NULL,
        PessoaId int4 NULL,
        EspecialidadeId int4 NULL,
        CONSTRAINT Voluntario_pkey PRIMARY KEY (id),
        CONSTRAINT Voluntario_EspecialidadeId_fkey FOREIGN KEY (EspecialidadeId) REFERENCES Especialidade(id) ON UPDATE CASCADE ON DELETE SET NULL,
        CONSTRAINT Voluntario_PessoaId_fkey FOREIGN KEY (PessoaId) REFERENCES Pessoa(id) ON UPDATE CASCADE ON DELETE SET NULL
    );
