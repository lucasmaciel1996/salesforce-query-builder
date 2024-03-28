export function encodeQueryUrl(query:string) {
    return `query/?q=${query.replace(/ /g, "+")}`
 }