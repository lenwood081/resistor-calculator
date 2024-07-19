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
        Band: band,
        Colors: colors,
        Multiplier: multiplier,
        Tolerance: tolerance,
        Ppm: ppm
    }
}