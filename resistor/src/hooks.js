import { bands } from "$lib/data/bands"
import { redirect } from "@sveltejs/kit"

export async function handle({ event, resolve }) {
    /* declare valid urls */
    let valid = []
    for (let i = 0; i < bands.length; i++) {
        valid.push("/main/" + bands[i].number)
    }

    let ret = valid.find(e => e === event.url.pathname);

    if (!ret) redirect(302, `/main/${bands[0].number}`)

    return await resolve(event);
}