<script>
    import {search} from '$lib/searchLogic';
    import Resistor from '$lib/resistor.svelte';
    import { afterNavigate, beforeNavigate } from '$app/navigation';

    export let data

    let change = false; // idicates that the fields hav been edited

    $: bandNum = data.Band.order.length;
    $: colorNum = data.Band.order.filter(x => x === 0).length;
    let inputValue = 220;
    let input;
    $: if (inputValue !== null) {
        input = search(colorNum, inputValue)  
    } 
    let values = [] // values to be input into boxes

    /* for visuals */
    let lines = [];

    beforeNavigate(() => {
        /* reset values */
        change = false;
        values = [];
        lines = [];
        input = search(colorNum, inputValue)  
    })

    /* runs after mount or on url reloccation */
    afterNavigate(() => {
        change = true
    })

    $: (() => {
        if (change !== true) {
            // colors
            let vals = []
            
            for (let i = colorNum-1; i >= 0; i--) {
                vals.push(data.Colors[input.color[i]].color + ": " + data.Colors[input.color[i]].value)
            }

            // multiplier
            vals.push(data.Multiplier[input.multi].color + ": " + data.Multiplier[input.multi].value)

            // tolerance
            vals.push(data.Tolerance[input.toler].color + ": " + data.Tolerance[input.toler].value)
            
            // ppm
            if (bandNum === 6) {
                vals.push(data.Ppm[0].color + ": " + data.Ppm[0].value)
            }
            values = vals;
        }
        

        lines = []
        lines.push(values[0])
        lines.push(values[1])
        if (bandNum === 4) { 
            lines.push("none: ")
            lines.push(values[2])
            lines.push("none: ")
            lines.push(values[3])
        } else if (bandNum === 5) {
            lines.push(values[2])
            lines.push(values[3])
            lines.push("none: ")
            lines.push(values[4])
        } else if (bandNum === 6) {
            lines.push(values[2])
            lines.push(values[3])
            lines.push(values[4])
            lines.push(values[5])
        }

    }) ()

    let keyList = Object.keys(data).map(object => {
        return object.toString()
    });

    
</script>

<div class="main">
    <div class="selection">
        {#each data.Band.order as bandVal, num}
            {#if bandVal === 0}
                <label for="{"band"+num}">Band {num+1}</label>
            {:else}
                <label for="{"band"+num}">{keyList[bandVal+1]}</label>
            {/if}
            <select name="{"band"+num}" class="dropdown" bind:value={values[num]}>           
                {#each data[keyList[bandVal+1]] as color} 
                    <option>{color.color}: {color.value}</option>
                {/each}
            </select>
        {/each}
        <label for="ohms">Resistance (Ohms)</label>
        <input name="ohms" id="oInput" type="number" bind:value={inputValue} min=0.01 max=2147483646 
                    on:input={() => change = false}
                    on:change={() => change = true}> 
    </div>
    <div class="visual">
        <h2>This is the resistance</h2>

        {#key lines}
            <Resistor bands={lines} />
        {/key}
    </div>
</div>

<style>
    .main {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .selection {
        display: flex;
        flex-direction: column;
        width: 50%;
        background-color: lightgray;
        border-right: 1px solid black;
        font-size: 1.2rem;
    }

    .visual {
        display: flex;
        flex-direction: column;
        width: 50%;
        background-color: lightgray;
        border-left: 1px solid black;
        background-color: white;
    }

    h2 {
        font-size: 1.5rem;
        margin: 5px 0;
        text-align: center;
    }

    select, input {
        font-size: 1rem;
    }

    input {
        text-indent: 3px;
    }

    label {
        font-weight: bold;
        text-align: center;
        margin: 2px 0;
    }
</style>