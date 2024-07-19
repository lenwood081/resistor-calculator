import { bands, colors, tolerance, multiplier, ppm } from "$lib/data/bands.json";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const page = Number(params.slug);

    /* check that it is a valid page */
    const band = bands.find((band) => band.number === page);

    if (!band) {
        throw error(404);
    }
    
    return {
        band: band,
        colors: colors,
        multiplier: multiplier,
        tolerance: tolerance,
        ppm: ppm
    }
}