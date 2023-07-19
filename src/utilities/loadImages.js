export function loadImages(onImagesLoaded) {
    const paintingNames = ['Reflections', 'Chaos and Order', 'Dreamscape', 'Beyond the Horizon', 'Melancholy', 'Inner Depths', 'Metamorphosis', 'Fragmented Memories', 'The Human Condition', 'Parallel Universe', 'Illusionary Worlds', 'Embrace of the Elements', 'Transcendence', 'Enchanted Forests', 'Sensory Overload', 'Timeless Beauty', 'Celestial Journey', 'The Endless Ocean', 'Shadows and Light', 'The Alchemy of Nature'];
    const painters_both = [
        { nameFull: 'Leonardo da Vinci', nameShort: 'Leonardo da Vinci' },
        { nameFull: 'Michelangelo Buonarroti', nameShort: 'Michelangelo' },
        { nameFull: 'Vincent van Gogh', nameShort: 'Vincent van Gogh' },
        { nameFull: 'Pablo Picasso', nameShort: 'Pablo Picasso' },
        { nameFull: 'Rembrandt van Rijn', nameShort: 'Rembrandt van Rijn' },
        { nameFull: 'Claude Monet', nameShort: 'Claude Monet' },
        { nameFull: 'Johannes Vermeer', nameShort: 'Johannes Vermeer' },
        { nameFull: 'Salvador Dali', nameShort: 'Salvador Dali' },
        { nameFull: 'Henri Matisse', nameShort: 'Henri Matisse' },
        { nameFull: 'Paul Cezanne', nameShort: 'Paul Cezanne' }
    ];

    const painters = painters_both.map(painter => painter.nameFull)
    
    const stem = 'https://storage.googleapis.com/ai_dev_projects/arthouse/paintings/';
    const middle = '_in_';
    const end = '_style_painting__.jpg';

    const preloadedImages = [];

    const totalImages = paintingNames.length * painters.length;
    let loadedImages = 0;

    paintingNames.forEach((painting, i) => {
        preloadedImages[i] = [];
        painters.forEach((painter, j) => {
            const thisPainting = painting.replace(/ /g, '_');
            const thisPainter = painter.replace(/ /g, '_');
            const totalnamestring = stem + thisPainting + middle + thisPainter + end;
            const image = new Image();

            image.onload = () => {
                loadedImages++;
                preloadedImages[i][j] = image;

                if (loadedImages === totalImages) {
                    // All images have been loaded
                    onImagesLoaded(preloadedImages, paintingNames, painters_both);
                }
            };
            image.src = totalnamestring;
        });
    });
}