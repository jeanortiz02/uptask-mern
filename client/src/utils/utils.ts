

export function formatDate ( isoString: string ) : string {
    const date = new Date(isoString);
    const formatted = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    return formatted.format(date);
}