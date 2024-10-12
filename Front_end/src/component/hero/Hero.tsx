import React from 'react'
import { SectionWrapper } from '../../lib';
import Carousels from '../../lib/carousel/Carousels';
import Categorie from './Categorie';

const Hero = () => {
  return (
    <>
      <Carousels />
      <Categorie />
    </>
  );
};

export default SectionWrapper(Hero);