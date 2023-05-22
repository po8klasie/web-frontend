import { headers } from 'next/headers';

// XXX(micorix): A bit hacky. I know.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering
const forceServerComponentDynamicRender = () => {
  headers();
};

export default forceServerComponentDynamicRender;
