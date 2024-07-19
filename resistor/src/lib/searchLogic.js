import { colors, multiplier, tolerance, ppm} from "$lib/data/bands.json"
import { error } from "@sveltejs/kit";

// @ts-ignore
export function search(rows, value, ppm) {
    // find greater than multiplier
    let multiIndex = -1;
    const finalValue = value
    let runningValue = 0

    /* TODO: Less than 1 case */

    for (let i = 0; multiplier[i].value*Math.pow(10,rows-1) <= value; i++) {
        multiIndex = i;
        if (i === multiplier.length-1) break;
    }

    if (multiIndex === -1) {
        throw error(501);
    }

    value = value/multiplier[multiIndex].value;

    //round value
    value = Math.round(value)
    if (multiIndex != multiplier.length-1) {
        if (value >= Math.pow(10,rows)) {
            multiIndex++;
            value = value/(multiplier[multiIndex].value/multiplier[multiIndex-1].value)
        }
    }
    
    let colorsIndex = [];

    for (let i = rows-1; i >= 0; i--) {
        for (let j = 0; colors[j].value*Math.pow(10, i) <= value; j++) {
            colorsIndex[i] = j;
            if (j === colors.length-1) break; // to prevent indexing error
        }

        // remove first digit
        let placeholder = String(value);
        // add zeros for special case
        if (placeholder.length == i+1)
            placeholder = placeholder.substring(1)
        value = Number(placeholder)
    }

    /* tolerance band calculation */
    for (let i = 0; i < rows; i++) {
        runningValue += colors[colorsIndex[i]].value*Math.pow(10,i)
    }
    runningValue *= multiplier[multiIndex].value
    const difference = Math.abs(finalValue-runningValue)
    const percentDiffernece = (difference)/((runningValue+finalValue)/2) * 100
    

    let toleranceIndex = 0
    for (let i = 0; tolerance[i].value < percentDiffernece; i++) {
        toleranceIndex = i
        if (i === tolerance.length-1) break;
    }

    return {
        multi: multiIndex,
        color: colorsIndex,
        toler: toleranceIndex
    }
}