import React from 'react';

import TargetImage from '../images/features-02-image.png';

function Target() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2" data-aos="fade-up">From the big picture to every tiny detail, DocuBot got you covered.</h2>
          </div>

          {/* Items */}
          <div className="grid gap-20" data-aos-id-target>

            {/* Item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">

              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:rtl" data-aos="fade-right" data-aos-delay="200" data-aos-anchor="[data-aos-id-target]">
                <img className="mx-auto md:max-w-none" src={TargetImage} width="540" height="520" alt="Features 02" />
              </div>

              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2" data-aos="fade-left" data-aos-anchor="[data-aos-id-target]">Be the change you want to see</div>
                  <div className="mt-6" data-aos="fade-left" data-aos-delay="200" data-aos-anchor="[data-aos-id-target]">
                    <h4 className="h4 mb-2"><span className="text-purple-600">.</span> For students</h4>
                    <p className="text-lg text-gray-400">DocuBot can assist students in managing their research papers, lecture notes, and assignments efficiently.</p>
                  </div>
                  <div className="mt-6" data-aos="fade-left" data-aos-delay="400" data-aos-anchor="[data-aos-id-target]">
                    <h4 className="h4 mb-2"><span className="text-teal-500">.</span> For researchers</h4>
                    <p className="text-lg text-gray-400">Researchers can benefit from DocuBot's document search and summarization features to analyze and extract relevant information from vast amounts of research papers and articles.</p>
                  </div>
                  <div className="mt-6" data-aos="fade-left" data-aos-delay="600" data-aos-anchor="[data-aos-id-target]">
                    <h4 className="h4 mb-2"><span className="text-pink-500">.</span> For businesses</h4>
                    <p className="text-lg text-gray-400">DocuBot can aid businesses in organizing and retrieving important documents, contracts, and reports swiftly. It can also facilitate collaboration among team members.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Target;
