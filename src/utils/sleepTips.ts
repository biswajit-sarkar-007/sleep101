interface SleepTip {
  title: string;
  description: string;
  icon: 'moon' | 'sun' | 'coffee' | 'exercise' | 'meditation' | 'book' | 'phone' | 'bed' | 'alarm' | 'food';
}

const tips: Record<string, SleepTip[]> = {
  poor: [
    {
      title: 'Establish a Consistent Schedule',
      description: 'Go to bed and wake up at the same time every day, even on weekends, to regulate your body clock.',
      icon: 'alarm'
    },
    {
      title: 'Create a Relaxing Bedtime Routine',
      description: 'Take a warm bath, read a book, or practice gentle stretching before bed to signal your body it\'s time to sleep.',
      icon: 'book'
    },
    {
      title: 'Limit Screen Time',
      description: 'Avoid electronic devices at least 1 hour before bedtime as blue light can interfere with melatonin production.',
      icon: 'phone'
    },
    {
      title: 'Optimize Your Sleep Environment',
      description: 'Keep your bedroom cool, dark, and quiet. Consider using blackout curtains and white noise.',
      icon: 'bed'
    }
  ],
  average: [
    {
      title: 'Mindful Evening Routine',
      description: 'Practice 10 minutes of meditation or deep breathing exercises before bed to reduce stress.',
      icon: 'meditation'
    },
    {
      title: 'Regular Exercise',
      description: 'Engage in moderate exercise during the day, but avoid vigorous workouts close to bedtime.',
      icon: 'exercise'
    },
    {
      title: 'Balanced Diet',
      description: 'Avoid heavy meals close to bedtime and limit caffeine intake after midday.',
      icon: 'food'
    },
    {
      title: 'Natural Light Exposure',
      description: 'Get 15-30 minutes of morning sunlight to help regulate your circadian rhythm.',
      icon: 'sun'
    }
  ],
  good: [
    {
      title: 'Maintain Your Success',
      description: 'Keep up your current sleep habits and gradually try to optimize your sleep schedule further.',
      icon: 'moon'
    },
    {
      title: 'Advanced Sleep Hygiene',
      description: 'Consider using sleep tracking apps to identify patterns and optimize your sleep quality.',
      icon: 'phone'
    },
    {
      title: 'Stress Management',
      description: 'Practice gratitude journaling or mindfulness to maintain mental well-being.',
      icon: 'meditation'
    },
    {
      title: 'Sleep Optimization',
      description: 'Experiment with different pillow types or mattress firmness to find your optimal sleep setup.',
      icon: 'bed'
    }
  ]
};

export const getSleepTips = (score: number): SleepTip[] => {
  if (score < 60) return tips.poor;
  if (score < 80) return tips.average;
  return tips.good;
}; 