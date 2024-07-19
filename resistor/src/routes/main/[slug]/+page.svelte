<script>
    import {search} from '$lib/searchLogic';
    import Resistor from '$lib/resistor.svelte';
    import { afterNavigate, beforeNavigate } from '$app/navigation';

    export let data

    let change = false; // idicates that the fields hav been edited

    $: bandNum = data.band.order.length;
    $: colorNum = data.band.order.filter(x => x === 0).length;
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
                vals.push(data.colors[input.color[i]].color + ": " + data.colors[input.color[i]].value)
            }

            // multiplier
            vals.push(data.multiplier[input.multi].color + ": " + data.multiplier[input.multi].value)

            // tolerance
            vals.push(data.tolerance[input.toler].color + ": " + data.tolerance[input.toler].value)
            
            // ppm
            if (bandNum === 6) {
                vals.push(data.ppm[0].color + ": " + data.ppm[0].value)
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
        {#each data.band.order as bandVal, num}
            {#if bandVal === 0}
                <label for="{"band"+num}">band {num+1}</label>
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
                    on:input={() => change = false}> 
    </div>
    <div class="visual">
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
    }

    .visual {
        display: flex;
        width: 50%;
        background-color: lightgray;
        border-left: 1px solid black;
    }
</style>