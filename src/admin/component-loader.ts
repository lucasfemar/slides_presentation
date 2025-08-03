import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const components = {
  ImagePreview: componentLoader.add('ImagePreview', '../components/ImagePreview.tsx'),
};

export { componentLoader, components };
