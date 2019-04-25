const trainingData = [
    {
        input: "Vertige Fatigue maux de tête éternuement Sautes d'humeur Troubles du goût",
        output: { Grippe: 0.8, Rhume: 0.4,  }
    },

    {
        input: "Maux de tête  Fièvre Ganglions Amygdales ",
        output: { Angine: 0.7, Diarrhee : 0.5 }
    }
];

module.exports = trainingData;