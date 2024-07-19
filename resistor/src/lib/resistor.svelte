<script>
    import resistor from "$lib/assets/resistor-diagram.png"

    export let bands = ["none", "none", "none", "none"];

    /*
        bands = [ black, .... ]
        lightGrey: 0 defualt 
    */

</script>

<main>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={resistor} alt="image of resistor">
</main>

<style>
    main {
        background-color: rgb(199, 196, 196);
        width: 100%;
        display: flex;
        position: relative;
    }
</style>