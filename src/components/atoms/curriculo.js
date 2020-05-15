const jobCandidate = {
    getPersonInfo: () => ({
        name: 'Diego Borges Ferreira',
        age: 25,
        from: {
            city: 'Vespasiano',
            state: 'Minas Gerais',
            country: 'Brasil',
            toString: () => 'Vespasiano/MG - Brasil'
        },
        skills: {
            hard: [
                'HTML',
                'CSS',
                'JavaScript',
                'React',
                'React Native',
                'TypeScript',
                'Node.js',
                'PHP',
                'Python',
                'SQL DB (MySQL, Postgre & Maria DB)',
                'NoSQL DB (Mongo, Firebase & Redis)',
                'AWS Services (EC2, ECS, ELB, S3, Lambda Functions)',
                'Docker & Docker Compose',
              	'Git',
            ],
            concepts: [
                'OOP',
                'TDD',
                'Clean Architecture',
                'Clean Code',
            ],
            soft: [
                'Criatividade',
                'Comunicação',
                'Trabalho em equipe',
                'Autodidata',
            ],
        },
        academics: [
            {
                name: 'Sistemas de Informação',
                school: 'Pontificia Universidade Catolica de Minas Gerais (PUC MG)',
                type: 'Graduação',
            },
        ],
        experiences: [
            {
                name: 'Gamefik',
                from: '01/2020',
                to: 'current',
            },
            {
                name: 'MaxMilhas',
                from: '10/2018',
                to: '01/2020',
            },
            {
                name: '4yousee',
                from: '10/2017',
                to: '10/2018',
            },
            {
                name: 'Quartel Design',
                from: '02/2017',
                to: '10/2017',
            },
        ]
    })
};

export jobCandidate; 