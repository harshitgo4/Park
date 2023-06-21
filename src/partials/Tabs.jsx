import React, { useState, useRef, useEffect } from 'react'
import Transition from '../utils/Transition'

import TabsImage01 from '../images/tabs-image-01.jpg'
import HeroImage01 from '../images/hero-image-01.jpg'

function Tabs() {
  const [tab, setTab] = useState(1)

  const tabs = useRef(null)

  const heightFix = () => {
    if (tabs.current.children[tab - 1]) {
      tabs.current.style.height =
        tabs.current.children[tab - 1].offsetHeight + 'px'
    }
  }

  useEffect(() => {
    heightFix()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12" data-aos-id-tabs>
            <h2
              className="h2 mb-4"
              data-aos="fade-up"
              data-aos-anchor="[data-aos-id-tabs]"
            >
              Integrated working tools for perfect conversation
            </h2>
            <p
              className="text-xl text-gray-400"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-anchor="[data-aos-id-tabs]"
            >
              Once signed in, you can immediately start using DocuBot platform.
              You can choose to upload various file formats such as PDF, text,
              ePub, or PowerPoint etc.
            </p>
          </div>

          {/* Section content */}
          <div>
            {/* Tabs buttons */}
            <div
              className="flex flex-wrap justify-center -m-2"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor="[data-aos-id-tabs]"
            >
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 1 && 'opacity-50'
                }`}
                onClick={() => setTab(1)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 5.5c-.311.001-.62.061-.909.177l-2.268-2.268c.116-.29.176-.598.177-.909a2.5 2.5 0 00-5 0c.001.311.061.62.177.909L3.409 5.677A2.473 2.473 0 002.5 5.5a2.5 2.5 0 000 5c.311-.001.62-.061.909-.177l2.268 2.268c-.116.29-.176.598-.177.909a2.5 2.5 0 105 0 2.473 2.473 0 00-.177-.909l2.268-2.268c.29.116.598.176.909.177a2.5 2.5 0 100-5zM8 11c-.311.001-.62.061-.909.177L4.823 8.909a2.423 2.423 0 000-1.818l2.268-2.268a2.423 2.423 0 001.818 0l2.268 2.268a2.423 2.423 0 000 1.818l-2.268 2.268A2.473 2.473 0 008 11z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  PDF Doc Files
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 2 && 'opacity-50'
                }`}
                onClick={() => setTab(2)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.043 6.293S9.79 1.905 6.745 0A5.37 5.37 0 014.72 3.887C3.42 5.03.974 7.6 1 10.34A6.285 6.285 0 004.451 16a3.984 3.984 0 011.394-2.755 3.253 3.253 0 001.246-2.185 5.856 5.856 0 013.1 4.881v.013a5.883 5.883 0 003.428-5.106c.216-2.574-1.194-6.074-2.445-7.218a6.793 6.793 0 01-2.13 2.663z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  Text Doc Files
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 3 && 'opacity-50'
                }`}
                onClick={() => setTab(3)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 10c-1.1 0-2-.9-2-2 0-.2 0-.3.1-.5L3.6 5 5 3.6l2.5 2.5c.2-.1.3-.1.5-.1 1.1 0 2 .9 2 2s-.9 2-2 2z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  EPUD Files
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 4 && 'opacity-50'
                }`}
                onClick={() => setTab(4)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 9v6a8 8 0 008-8V1a8 8 0 00-8 8zM0 6v3a6 6 0 006 6v-3a6 6 0 00-6-6z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  PowerPoint
                </span>
              </button>
              <button
                className={`flex items-center font-medium py-2 px-4 m-2 bg-gray-800 rounded-full group transition duration-500 ${
                  tab !== 5 && 'opacity-50'
                }`}
                onClick={() => setTab(5)}
              >
                <svg
                  className="w-4 h-4 fill-current text-purple-600 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.936 6.007H8.358l1.594-4.685c.3-.997-.897-1.794-1.694-.997L.284 8.3c-.598.598-.199 1.694.698 1.694H7.56l-1.594 4.685c-.3.997.897 1.794 1.694.997L15.633 7.7c.598-.598.2-1.694-.697-1.694z" />
                </svg>
                <span className="text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out">
                  Excel Files
                </span>
              </button>
            </div>

            {/* Tabs items */}
            <div
              className="relative flex flex-col mt-16"
              data-aos="fade-up"
              ref={tabs}
            >
              {/* Item 1 */}
              <Transition
                show={tab === 1}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:right-0 md:w-1/2">
                    <img
                      className="w-full h-full object-cover"
                      src={TabsImage01}
                      width="516"
                      height="387"
                      alt="Tabs 01"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pr-16 md:max-w-lg lg:max-w-xl">
                    <h4 className="h4 mb-2">
                      Utilize DocuBot with PDF documents
                    </h4>
                    <p className="text-lg text-gray-400">
                      Our conversational AI chatbot will process your queries
                      and retrieve sections or excepts from your documents that
                      match your search criteria. This makes it easier to locate
                      the desired information without manually reading through
                      the entire document with meaningful information for
                      studies, research, or decision-making.
                    </p>
                    <a
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6"
                      href="#0"
                    >
                      <span className="text-sm">Learn more</span>
                      <svg
                        className="w-3 h-3 fill-current text-purple-400 shrink-0 ml-2"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 5H0v2h6v4l6-5-6-5z" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Transition>

              {/* Item 2 */}
              <Transition
                show={tab === 2}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:left-0 md:w-1/2">
                    <img
                      className="w-full h-full object-cover"
                      src={HeroImage01}
                      width="516"
                      height="387"
                      alt="Tabs 02"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pl-16 md:max-w-lg lg:max-w-xl md:ml-auto">
                    <h4 className="h4 mb-2">
                      Easy to start, create, edit and update text
                    </h4>
                    <p className="text-lg text-gray-400">
                      You have control over the extracted information, allowing
                      you to modify or enhance the accuracy and relevance of the
                      extracted content. Users can choose to export the
                      documents as text files, PDFs, or other compatible
                      formats, making it convenient for further analysis,
                      sharing, or presentation purposes.
                    </p>
                    <a
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6"
                      href="#0"
                    >
                      <span className="text-sm">Learn more</span>
                      <svg
                        className="w-3 h-3 fill-current text-purple-400 shrink-0 ml-2"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 5H0v2h6v4l6-5-6-5z" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Transition>

              {/* Item 3 */}
              <Transition
                show={tab === 3}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:right-0 md:w-1/2">
                    <img
                      className="w-full h-full object-cover"
                      src={TabsImage01}
                      width="516"
                      height="387"
                      alt="Tabs 01"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pr-16 md:max-w-lg lg:max-w-xl">
                    <h4 className="h4 mb-2">
                      Data optimization they way you want
                    </h4>
                    <p className="text-lg text-gray-400">
                      You can leverage the platform's features to interact with
                      ePub documents efficiently. You can search for specific
                      information within the ePub documents, extract relevant
                      insights, and receive intelligent responses. You can
                      further edit chat answers using text context interface
                      with a seamless and intuitive way to engage with content.
                    </p>
                    <a
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6"
                      href="#0"
                    >
                      <span className="text-sm">Learn more</span>
                      <svg
                        className="w-3 h-3 fill-current text-purple-400 shrink-0 ml-2"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 5H0v2h6v4l6-5-6-5z" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Transition>

              {/* Item 4 */}
              <Transition
                show={tab === 4}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:left-0 md:w-1/2">
                    <img
                      className="w-full h-full object-cover"
                      src={HeroImage01}
                      width="516"
                      height="387"
                      alt="Tabs 02"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pl-16 md:max-w-lg lg:max-w-xl md:ml-auto">
                    <h4 className="h4 mb-2">
                      Transform presentations into data points
                    </h4>
                    <p className="text-lg text-gray-400">
                      The conversational AI chatbot empowers you to search for
                      specific information, extract key insights, and receive
                      intelligent responses related to their PowerPoint
                      presentations. You can interact with the chatbot to ask
                      questions, request summaries, or explore specific slides
                      or sections of the presentation.
                    </p>
                    <a
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6"
                      href="#0"
                    >
                      <span className="text-sm">Learn more</span>
                      <svg
                        className="w-3 h-3 fill-current text-purple-400 shrink-0 ml-2"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 5H0v2h6v4l6-5-6-5z" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Transition>

              {/* Item 5 */}
              <Transition
                show={tab === 5}
                appear={true}
                className="w-full"
                enter="transition ease-in-out duration-500 transform order-first"
                enterStart="opacity-0 scale-98"
                enterEnd="opacity-100 scale-100"
                leave="transition ease-out duration-300 transform absolute"
                leaveStart="opacity-100 scale-100"
                leaveEnd="opacity-0 scale-98"
              >
                <article className="relative max-w-md mx-auto md:max-w-none">
                  <figure className="md:absolute md:inset-y-0 md:right-0 md:w-1/2">
                    <img
                      className="w-full h-full object-cover"
                      src={TabsImage01}
                      width="516"
                      height="387"
                      alt="Tabs 01"
                    />
                  </figure>
                  <div className="relative bg-gray-800 py-8 md:py-16 px-6 md:pr-16 md:max-w-lg lg:max-w-xl">
                    <h4 className="h4 mb-2">
                      Understanding spreedsheets made easy
                    </h4>
                    <p className="text-lg text-gray-400">
                      Our conversational AI chatbot enables you to perform
                      various actions, such as searching for specific data
                      points, retrieving summary statistics, or requesting
                      insights based on the Excel data. You can interact with
                      the chatbot to ask questions, analyze trends, or explore
                      relationships within the spreadsheet.
                    </p>
                    <a
                      className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6"
                      href="#0"
                    >
                      <span className="text-sm">Learn more</span>
                      <svg
                        className="w-3 h-3 fill-current text-purple-400 shrink-0 ml-2"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 5H0v2h6v4l6-5-6-5z" />
                      </svg>
                    </a>
                  </div>
                </article>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tabs
