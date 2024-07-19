<script>
    import resistor from "$lib/assets/resistor-diagram.png"

    export let bands = [ "none :", "none :", "none :", "none :", "none :", "none :"];

    const band_positions = [ 10, 25, 30, 50, 70, 87 ] // positions of all six bands 
    let band_colors = bands.map((e) => {
        return e.split(":")[0]
    })

</script>

<main>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={resistor} alt="image of resistor">
    {#each band_positions as pos, num}
        <div class="band" style="left: {pos}%; background-color: {band_colors[num]};"></div>
    {/each}
    
</main>

<style>
    main {
        background-color: rgb(199, 196, 196);
        width: 100%;
        display: flex;
        position: relative;
    }

    img {
        z-index: 10;
    }

    .band {
        position: absolute;
        left: 10%;
        height: 100%;
        width: 15px;
        border: 1px solid black;
    }
</style>