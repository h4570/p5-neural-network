function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
function dsigmoid(y) { return y * (1 - y); }

class NeuralNetwork {
    /**
      * if first argument is a NeuralNetwork the constructor clones it
      * USAGE: cloned_nn = new NeuralNetwork(to_clone_nn);
      */
    constructor(inputNodes, hiddenLayers, outputsNodes) {

        if (inputNodes instanceof NeuralNetwork) {
            this.inputNodes = inputNodes.inputNodes;
            this.hiddenLayers = inputNodes.hiddenLayers;
            this.outputNodes = inputNodes.outputNodes;

            this.biasH = inputNodes.biasH.copy();
            this.biasO = inputNodes.biasO.copy();
            this.weightsIH = inputNodes.weightsIH.copy();
            this.weightsHO = inputNodes.weightsHO.copy();
        } else {

            this.inputNodes = inputNodes;
            this.hiddenLayers = hiddenLayers;
            this.outputNodes = outputsNodes;

            this.weightsIH = new Matrix(this.hiddenLayers, this.inputNodes);
            this.weightsHO = new Matrix(this.outputNodes, this.hiddenLayers);
            this.biasH = new Matrix(this.hiddenLayers, 1);
            this.biasO = new Matrix(this.outputNodes, 1);

            this.weightsIH.randomize();
            this.weightsHO.randomize();
            this.biasH.randomize();
            this.biasO.randomize();

        }

        this.setLearningRate();
    }

    predict(inputs) {
        inputs = Matrix.fromArray(inputs);
        let hidden = Matrix.multiply(this.weightsIH, inputs);
        hidden.add(this.biasH);
        hidden.map(sigmoid);
        let output = Matrix.multiply(this.weightsHO, hidden)
        output.add(this.biasO);
        output.map(sigmoid);
        return output.toArray();
    }

    train(inputs, targets) {

        inputs = Matrix.fromArray(inputs);
        let hidden = Matrix.multiply(this.weightsIH, inputs);
        hidden.add(this.biasH);
        hidden.map(sigmoid);
        let outputs = Matrix.multiply(this.weightsHO, hidden);
        outputs.add(this.biasO);
        outputs.map(sigmoid);

        targets = Matrix.fromArray(targets);
        let outputErrors = Matrix.subtract(targets, outputs);
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(outputErrors);
        gradients.multiply(this.learningRate);
        let transposedHidden = Matrix.transpose(hidden);
        let weightsHODeltas = Matrix.multiply(gradients, transposedHidden);
        this.weightsHO.add(weightsHODeltas);
        this.biasO.add(gradients);
        let transposedHOWeights = Matrix.transpose(this.weightsHO);
        let hiddenErrors = Matrix.multiply(transposedHOWeights, outputErrors);
        let hiddenGradient = Matrix.map(hidden, dsigmoid);
        hiddenGradient.multiply(hiddenErrors);
        hiddenGradient.multiply(this.learningRate);
        let transposedInputs = Matrix.transpose(inputs);
        let weightIHDeltas = Matrix.multiply(hiddenGradient, transposedInputs);
        this.weightsIH.add(weightIHDeltas);
        this.biasH.add(hiddenGradient);
    }

    //--- --- --- --- ---

    setLearningRate(learningRate = 0.1) { this.learningRate = learningRate; }

    copy() { return new NeuralNetwork(this); }

    serialize() { return JSON.stringify(this); }

    static deserialize(data) {
        if (typeof data == 'string') data = JSON.parse(data);

        let nn = new NeuralNetwork(data.inputNodes, data.hiddenLayers, data.outputNodes);
        nn.weightsIH = Matrix.deserialize(data.weightsIH);
        nn.weightsHO = Matrix.deserialize(data.weightsHO);
        nn.biasH = Matrix.deserialize(data.biasH);
        nn.biasO = Matrix.deserialize(data.biasO);
        nn.learningRate = data.learningRate;
        return nn;
    }

    mutate(rate) {

        function mutate(val) {
            if (Math.random() < rate) return Math.random() * 2 - 1;
            else return val;
        }

        this.weightsIH.map(mutate)
        this.weightsHO.map(mutate)
        this.biasH.map(mutate)
        this.biasO.map(mutate)
    }


}