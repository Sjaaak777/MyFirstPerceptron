export default class Perceptron {
    constructor() {
      this.trainingset = [
        { x1: 0, x2: 0, y: 0 },
        { x1: 0, x2: 1, y: 1 },
        { x1: 1, x2: 0, y: 1 },
        { x1: 1, x2: 1, y: 1 }
      ];
      this.runningTrainingsetValues = { x1: 0, x2: 0, y: 0 };
      this.weights = [{ w1: 0.0, w2: 0.0, bias: 0.0 }];
      this.trainingsetLineError = 0;
      this.epochError = 0;
      this.output = 0;
      this.epochCount = 0;
      this.desired = 0;
    }
  
    initializeWeights() {
      this.weights.w1 = Math.random() * 2 - 1;
      this.weights.w2 = Math.random() * 2 - 1;
      this.weights.bias = Math.random() * 2 - 1;
    }
  
    loadWeights() {
      this.weights.w1 = 0.61;
      this.weights.w2 = 0.75;
      this.weights.bias = -0.21;
    }
  
    loopTrainingset() {
      this.resetEpochError();
      this.increaseEpochCounter();
      console.log(
        "========================================== START EPOCH:",
        this.epochCount,
        "  ======================="
      );
  
      for (let trainingsetLine of this.trainingset) {
        console.log(
          "-----------------------------------------------------------------------------------"
        );
        this.runningTrainingsetValues.x1 = trainingsetLine.x1;
        this.runningTrainingsetValues.x2 = trainingsetLine.x2;
        this.runningTrainingsetValues.y = trainingsetLine.y;
        this.desired = trainingsetLine.y;
        console.log(
          "Training set Values :",
          this.runningTrainingsetValues.x1,
          this.runningTrainingsetValues.x2,
          this.runningTrainingsetValues.y
        );
        this.displayWeights();
        this.calculateAndSetIfFired();
        this.compareIsFiredWithTrainingsetOutput();
        this.displayDesired();
      }
      this.runAnotherEpochIfEpochHasError();
      console.log("");
    }
  
    calculateAndSetIfFired() {
      if (
        this.runningTrainingsetValues.x1 * this.weights.w1 +
          this.runningTrainingsetValues.x2 * this.weights.w2 +
          this.weights.bias >
        0
      ) {
        this.output = 1;
      } else {
        this.output = 0;
      }
  
      this.displayOutput();
    }
  
    increaseEpochCounter() {
      this.epochCount += 1;
    }
  
    updateTrainingsetLineError() {
      this.trainingsetLineError = this.desired - this.output;
    }
  
    runAnotherEpochIfEpochHasError() {
      if (this.epochError > 0) {
        this.loopTrainingset();
      } else {
        this.displayStatistics();
      }
    }
  
    compareIsFiredWithTrainingsetOutput() {
      if (this.output === this.runningTrainingsetValues.y) {
      } else {
        this.updateTrainingsetLineError();
        this.updateEpochError();
        this.updateWeightsOnError();
      }
    }
  
    updateEpochError() {
      this.epochError += 1;
    }
  
    updateWeightsOnError() {
      this.weights.w1 +=
        this.trainingsetLineError * this.runningTrainingsetValues.x1;
      this.weights.w2 +=
        this.trainingsetLineError * this.runningTrainingsetValues.x2;
      this.weights.bias += this.trainingsetLineError;
    }
  
    displayWeights() {
      console.log(
        "Current Weights     :",
        this.weights.w1,
        "|",
        this.weights.w2,
        "|",
        this.weights.bias
      );
    }
  
    displayStatistics() {
      console.log(
        "                         [# # #>   I am fully trained after",
        this.epochCount,
        "Epoch(s)   <# # #]"
      );
    }
  
    displayDesired() {
      console.log("Expected            :", this.desired);
    }
  
    resetEpochError() {
      this.epochError = 0;
    }
  
    displayOutput() {
      console.log("Received            :", this.output);
    }
  
    displayEpochError() {
      console.log("EpochError(s)   :", this.epochError, ":");
    }
  }
  