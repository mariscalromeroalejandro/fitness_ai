export function divideIntoChunks(paragraph) {
    console.log("Dividing paragraph into chunks:", paragraph);
    if (!Array.isArray(paragraph)) return [];

    const chunkSize = 2; // Number of sentences per chunk
    const chunks = [];

    for (let i = 0; i < paragraph.length; i += chunkSize) {
        chunks.push(paragraph.slice(i, i + chunkSize));
    }

    // Convert each chunk (array) into a string with line breaks
    const chunksAsString = chunks.map(chunk => chunk.join('\n'));

    // Opcional: unir todos los chunks en un solo string final
    const finalString = chunksAsString.join('\n\n'); // Doble salto de línea entre chunks

    return finalString;
}
