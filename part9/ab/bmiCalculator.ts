/*interface Args2 {
    height: number;
    mass: number;
  }*/

export const calculateBmi = (height: number, mass: number): string => {
    const result = mass / Math.pow(height / 100, 2);

    if (result < 16.0) {
        return "Underweight (Severe thinness)";
    }
    else if (result < 17.0) {
        return "Underweight (Moderate thinness)";
    }
    else if (result < 18.5) {
        return "Underweight (Mild thinness)";
    }
    else if (result < 25.0) {
        return "Normal range";
    }
    else if (result < 30.0) {
        return "Overweight (Pre-obese)";
    }
    else if (result < 35.0) {
        return "Obese (Class I)";
    }
    else if (result < 40.0) {
        return "Obese (Class II)";
    }

    return "Obese (Class III)";
  };

/*const parseArguments2 = (args: Array<string>): Args2 => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (args.slice(2,-1).filter(x => isNaN(Number(x))).length > 0) throw new Error('Provided values were not numbers!');

    const result = {
        height: Number(args[2]),
        mass: Number(args[3])
    };

    return result;
  };*/

