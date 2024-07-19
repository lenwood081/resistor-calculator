import { colors, multiplier, tolerance, ppm} from "$lib/data/bands.json"
import { error } from "@sveltejs/kit";

export function search(rows, value) {
    // find greater than multiplier
    let multiIndex = -1;
    const finalValue = value
    let runningValue = 0


    /* Less than 0.01 case: assign all black */
    if (value < multiplier[0].value)
    {
        // essentually zero
        return {
            multi: 0,
            color: [0, 0, 0],
            toler: 0,
            value: 0
        } 
    }

    /* check for really low values */
    for (let i = 0; multiplier[i].value <= value; i++) {
        multiIndex = i;
        if (i === multiplier.length-1) break;
    }
    
    for (let i = 0; multiplier[i].value*Math.pow(10,rows-1) <= value; i++) {
        multiIndex = i;
        if (i === multiplier.length-1) break;
    }

    if (multiIndex === -1) {
        throw error(501);
    }

    console.log(multiIndex)
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
        toler: toleranceIndex,
        value: runningValue
    }
}