/**
 * Utility to handle various image URL formats, especially Google Drive links.
 * Converts standard GDrive sharing links into direct rendering links.
 */
export const getDirectImageLink = (url: string | undefined): string => {
        if (!url) return '';

        // Google Drive Link Handling
        if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
                // Extract the file ID using regex (handles /d/ID, id=ID, etc.)
                const idMatch = url.match(/[-\w]{25,}/);
                if (idMatch && idMatch[0]) {
                        // Use lh3 service for direct, high-performance rendering that bypasses most blocks
                        return `https://lh3.googleusercontent.com/d/${idMatch[0]}`;
                }
        }

        // Return original URL if it's not a GDrive link or ID wasn't found
        return url;
};
