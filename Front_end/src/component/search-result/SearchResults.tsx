import React from 'react';
import { SectionWrapper, useSearchContext } from '../../lib';
import { Link } from 'react-router-dom';

const SearchResults: React.FC = () => {
    const { searchResults } = useSearchContext();

    return (
        <>
      <div>
        <article className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pl-3 pr-3 gap-5 flex-wrap justify-center pb-48">
          {searchResults.length > 0 ? (
            searchResults.map((item, index) => {
              return (
                <Link to={`/shop/${item.idProduct}`} key={index} className="flex flex-col">
                  <div className="bg-black group/item w-full h-full relative isolate flex flex-col justify-end px-8 p-52 max-w-sm mx-auto mt-8">
                    <div className="hover:opacity-60">
                      <img
                        src={item.image}
                        loading="lazy"
                        sizes="1200px"
                        width={1200}
                        height={1200}
                        alt="University of Southern California"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                      <div className="absolute inset-0 flex items-center justify-center group-hover/item:invisible">
                        <h3 className="z-10 text-3xl font-bold text-white">{item.name}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <h1 className='mb-44'>No results</h1>
          )}
        </article>
      </div>
    </>
    );
};

export default SectionWrapper(SearchResults);