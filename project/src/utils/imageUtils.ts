/**
 * Utility to handle various image URL formats, especially Google Drive links.
 * Converts standard GDrive sharing links into direct rendering links.
 */
export const getDirectImageLink = (url: string | undefined): string => {
    if (!url) return '';

    // Google Drive Link Handling
    if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
        // Try to extract the file ID using common patterns (handles /d/ID, id=ID, etc.)
        const idMatch = url.match(/(?:\/d\/|id=)([-\w]+)/) || url.match(/[-\w]{25,}/);
        const id = idMatch ? (idMatch[1] || idMatch[0]) : null;
        if (id) {
            // Use the drive "uc" endpoint which returns a direct image view when permissions allow
            return `https://drive.google.com/uc?export=view&id=${id}`;
        }
    }

    // Return original URL if it's not a Google Drive link or ID wasn't found
    return url;
};
