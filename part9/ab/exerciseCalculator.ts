export interface Statistics {
    periodLength: number;
    trainingDays: number;
    sucess: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

/*interface Args {
    hours: Array<number>;
    target: number;
  }*/


export const calculateExercises = (hours: Array<number>, target: number): Statistics => {
    const result = {
        periodLength: hours.length,
        trainingDays: hours.filter(x => x > 0).length,
        sucess: hours.reduce((start, next) => start + next, 0) / hours.length >= target,
        rating: 0,
        ratingDescription: "",
        target: target,
        average: hours.reduce((start, next) => start + next, 0) / hours.length,
      };

    if (target - result.average <= 0) {
        result.ratingDescription = "Great job. Target meetted";
        result.rating = 3;
    }
    else if (result.average / target > 0.90) {
        result.ratingDescription = "not too bad but could be better";
        result.rating = 2;
    }
    else { 
        result.ratingDescription = "You have to do better";
        result.rating = 1;
    }

    return result;
};

/*const parseArguments = (args: Array<string>): Args => {
    if (args.length < 4) throw new Error('Not enough arguments');

    let i = 3;
    let hours: Array<number> = [];

    if (args.slice(2,-1).filter(x => isNaN(Number(x))).length > 0) throw new Error('Provided values were not numbers!');
  
    while (!isNaN(Number(args[i]))) {
        hours = hours.concat(Number(args[i]));
        i += 1;
    }

    const result = {
        target: Number(args[2]),
        hours: hours
    };

    return result;
  };*/

  /*try {
    const { hours, target } = parseArguments(process.argv);
    calculateExercises(hours, target);
  
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }*/

