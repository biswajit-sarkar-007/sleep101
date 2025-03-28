import * as tf from '@tensorflow/tfjs';

export interface SleepAnalysis {
  duration: number;
  quality: 'Poor' | 'Average' | 'Good';
  score: number;
  insights: string[];
  recommendations: string[];
}

// Calculate sleep duration in hours
export const calculateSleepDuration = (bedtime: string, wakeTime: string): number => {
  const bed = new Date(`1970-01-01T${bedtime}`);
  const wake = new Date(`1970-01-01T${wakeTime}`);
  let duration = (wake.getTime() - bed.getTime()) / (1000 * 60 * 60);
  
  // Adjust for overnight sleep
  if (duration < 0) {
    duration += 24;
  }
  
  return duration;
};

// Generate mock training data for sleep quality prediction
const generateTrainingData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const duration = 4 + Math.random() * 6; // Random duration between 4-10 hours
    const restlessness = Math.floor(Math.random() * 11); // Random restlessness 0-10
    const quality = duration < 6 || restlessness > 7 ? 0 : 
                    duration < 7 || restlessness > 4 ? 1 : 2;
    data.push({
      features: [duration, restlessness],
      label: quality
    });
  }
  return data;
};

// Create and train a simple neural network
const createModel = async () => {
  const model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [2], units: 8, activation: 'relu' }),
      tf.layers.dense({ units: 3, activation: 'softmax' })
    ]
  });

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy']
  });

  // Generate and prepare training data
  const trainingData = generateTrainingData();
  const xs = tf.tensor2d(trainingData.map(d => d.features));
  const ys = tf.tensor1d(trainingData.map(d => d.label));

  // Train the model
  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 32,
    shuffle: true,
    verbose: 0
  });

  return model;
};

// Analyze sleep patterns and generate insights
export const analyzeSleep = async (
  duration: number,
  restlessness: number,
  historicalData: Array<{ duration: number; restlessness: number }>
): Promise<SleepAnalysis> => {
  // Create and train the model
  const model = await createModel();

  // Make prediction
  const prediction = model.predict(tf.tensor2d([[duration, restlessness]])) as tf.Tensor;
  const qualityIndex = (await prediction.argMax(1).data())[0];

  // Calculate sleep score (0-100)
  const baseScore = 100 - (restlessness * 10);
  const durationScore = Math.min(100, Math.max(0, (duration - 4) * 20));
  const finalScore = Math.round((baseScore + durationScore) / 2);

  // Generate insights based on historical data
  const insights: string[] = [];
  if (historicalData.length > 0) {
    const avgDuration = historicalData.reduce((acc, curr) => acc + curr.duration, 0) / historicalData.length;
    const avgRestlessness = historicalData.reduce((acc, curr) => acc + curr.restlessness, 0) / historicalData.length;

    if (duration < avgDuration * 0.9) {
      insights.push('Your sleep duration is below your average');
    }
    if (restlessness > avgRestlessness * 1.2) {
      insights.push('You were more restless than usual');
    }
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (duration < 7) {
    recommendations.push('Try to get at least 7 hours of sleep');
  }
  if (restlessness > 5) {
    recommendations.push('Consider reducing caffeine intake in the evening');
  }
  if (duration > 9) {
    recommendations.push('Longer sleep duration might indicate underlying fatigue');
  }

  return {
    duration,
    quality: ['Poor', 'Average', 'Good'][qualityIndex] as 'Poor' | 'Average' | 'Good',
    score: finalScore,
    insights,
    recommendations
  };
}; 