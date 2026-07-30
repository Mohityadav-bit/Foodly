const images = import.meta.glob('./all_imgs/*.{jpg,jpeg,png,webp,svg,gif}', {
  eager: true,
  import: 'default',
});

const assets = Object.fromEntries(
  Object.entries(images).map(([path, url]) => {
    const fileName = path.split('/').pop().replace(/\.[^/.]+$/, '');
    return [fileName, url];
  })
);

export const burger = assets.burger;
export const restaurent = assets.restaurant;
export const logo = assets.logo;

export default assets;

