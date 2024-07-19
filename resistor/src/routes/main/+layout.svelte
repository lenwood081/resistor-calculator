<script>
    /* retrive bands data and input into links */
    import {bands} from "$lib/data/bands.json";

    let bandtypes = bands;
</script>

<div class="main">
    <header>

    </header>
   <nav>
        {#each bandtypes as band}
            <a href="/main/{band.number}">{band.number} Bands</a>
        {/each}
    </nav>
    <div class="content">
        <slot />
    </div>
</div>


<style>
    .main {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    nav {

        flex-direction: row;
        justify-content: space-around;
        display: flex;
        margin: 0 10%;
        border: 1px solid black;
    }

    header {
        display: flex;
        height: 10%;
        border-bottom: 2px solid black;
        margin-bottom: 100px;
    }

    .content {
        display: flex;
        justify-content: center;
        border: 1px solid black;
        margin: 0 10%;
        overflow: hidden;
    }

    a {
        font-size: 1.5rem;
        text-decoration: none;
        color:black;
        padding: 10px;
        font-weight: 900;
    }
</style>