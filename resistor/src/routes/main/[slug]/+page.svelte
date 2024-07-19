<script>
    import {search} from '$lib/searchLogic';
    import Resistor from '$lib/resistor.svelte';
    import { onMount } from 'svelte';

    export let data

    /* used to indicate that everything is mounted */
    let key = false;

    let colorNum = data.band.order.filter(x => x === 0).length;
    $: colorNum = data.band.order.filter(x => x === 0).length;
    let inputValue = 220;
    let input = search(colorNum, inputValue, false)
    $: input = search(colorNum, inputValue, false)
    let values = []

    $: (() => {
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

        values = vals;
    }) ()

    onMount(() => {
        key = true;
    })

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
                {#each data[keyList[bandVal+1]] as color} <!-- throws an error but actually works-->
                    <option>{color.color}: {color.value}</option>
                {/each}
            </select>
        {/each}
        <label for="ohms">Resistance (Ohms)</label>
        <input name="ohms" id="oInput" type="number" bind:value={inputValue} min=0 max=2147483646 on:change={() => {
            input = search(colorNum, inputValue, false)
            console.log(input)
        }}> 
    </div>
    <div class="visual">
        <!-- TODO add visualiser component -->
        <Resistor band={values} />
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