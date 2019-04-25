const trainingData = [
    {
        input: "Sautes d'humeur Troubles du goût sensibilité aux odeurs",
        output: { Gripex: 0.6, Fervex: 0.4,  }
    },

    {
        input: "  vertige fatigue vertige maux de tête",
        output: { Analgan: 0.7, Efferalgan: 0.5 }
    },

    {
        input: "Maux de tête  Fièvre Ganglions Amygdales ",
        output: { Doliprane: 0.8, Panadole: 0.5 }
    }
];

module.exports = trainingData;