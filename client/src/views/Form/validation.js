const regExName = /^(?![_.])(?!.*[_.]{2})[A-Za-z0-9\s_]+(?<![_.])$/;
const regExImage = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/;

const validation = ({ name, image, description, platforms, released, rating, genres }) => {

const errors = {};

if (!name) errors.name = 'You must enter a name';
if (!image) errors.image = 'You must enter an image URL';
if (!description) errors.description = 'You must enter a description';
if (!platforms.length) errors.platforms = 'You must choose at least one platform';
if (!released) errors.released = 'You must enter a release date';
if (!genres.length) errors.genres = 'You must choose at least one genre';

if (name && !regExName.test(name)) errors.name = "The name can't contain symbols";
if (image && !regExImage.test(image)) errors.image = 'Image must be a URL';

return errors;
};

export default validation;