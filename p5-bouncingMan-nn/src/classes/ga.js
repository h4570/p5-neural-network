class GeneticAlgorithm {

    constructor() { }

    static nextGeneration(players) {
        this.normalizeFitness(players);
        return this.generate(players);
    }

    static generate(players) {
        let newPlayers = [];
        for (let i = 0; i < players.length; i++) {
            let newPlayer = this.poolSelection(players);
            newPlayers.push(newPlayer.copy());
        }
        return newPlayers;
    }

    static normalizeFitness(players) {
        let sum = 0;
        for (let player of players) {
            player.score = pow(player.score, 2);
            sum += player.score;
        }

        for (let player of players)
            if (player.score && sum) player.fitness = player.score / sum;

    }

    static getMaxFitness(players) {
        let record = 0;
        for (let i = 0; i < players.length; i++)
            if (players[i].fitness > record) record = players[i].fitness;
        return record;
    }

    static poolSelection(players) {
        let matingPool = [];
        let maxFitness = this.getMaxFitness(players);

        for (let i = 0; i < players.length; i++) {
            let fitnessNormal = map(players[i].fitness, 0, maxFitness, 0, 1);
            let n = floor(fitnessNormal * 100);
            for (var x = 0; x < n; x++)matingPool.push(players[i]);
        }

        return matingPool[floor(random(matingPool.length))];
    }

}