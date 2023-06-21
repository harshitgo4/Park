import React from 'react';
import { Link } from 'react-router-dom';

import NewsImage01 from '../images/news-01.jpg';
import NewsImage02 from '../images/news-02.jpg';
import NewsImage03 from '../images/news-03.jpg';
import NewsAuthor01 from '../images/news-author-01.jpg';
import NewsAuthor02 from '../images/news-author-02.jpg';
import NewsAuthor03 from '../images/news-author-03.jpg';

function News() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2" data-aos="fade-up">Refreashing news for what is next with DocuBot</h2>
          </div>

          {/* Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">
            <div className="grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start">

              {/* 1st article */}
              <article className="flex flex-col h-full" data-aos="fade-up">
                <header>
                  <Link className="block mb-6" to="/blog-post">
                    <figure className="relative h-0 pb-9/16 overflow-hidden rounded-sm">
                      <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={NewsImage01} width="352" height="198" alt="News 01" />
                    </figure>
                  </Link>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">Product</a>
                      </li>
                      <li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">Engineering</a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="h4 mb-2">
                    <Link className="hover:text-gray-100 transition duration-150 ease-in-out" to="/blog-post">It is always about solving a problem.</Link>
                  </h3>
                </header>
                <p className="text-lg text-gray-400 grow">By continuously listening to the needs and feedback of our target market, DocuBot strives to develop features and functionalities that directly address those pain points.</p>
                <footer className="flex items-center mt-4">
                  <a href="#0">
                    <img className="rounded-full shrink-0 mr-4" src={NewsAuthor01} width="40" height="40" alt="Author 01" />
                  </a>
                  <div className="font-medium">
                    <a className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Body Elvis</a>
                    <span className="text-gray-700"> - </span>
                    <span className="text-gray-500">Jun 17, 2023</span>
                  </div>
                </footer>
              </article>

              {/* 2nd article */}
              <article className="flex flex-col h-full" data-aos="fade-up" data-aos-delay="200">
                <header>
                  <Link className="block mb-6" to="/blog-post">
                    <figure className="relative h-0 pb-9/16 overflow-hidden rounded-sm">
                      <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={NewsImage02} width="352" height="198" alt="News 02" />
                    </figure>
                  </Link>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-pink-500 hover:bg-pink-600 transition duration-150 ease-in-out" href="#0">Testing</a>
                      </li>
                      <li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">CI/CD</a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="h4 mb-2">
                    <Link className="hover:text-gray-100 transition duration-150 ease-in-out" to="/blog-post">Endless journey into the future.</Link>
                  </h3>
                </header>
                <p className="text-lg text-gray-400 grow">We are starting an endless journey into the future which will be fueled by rigorous testing and a robust CI/CD pipeline, ensuring continuous improvements, reliability, and innovation.</p>
                <footer className="flex items-center mt-4">
                  <a href="#0">
                    <img className="rounded-full shrink-0 mr-4" src={NewsAuthor02} width="40" height="40" alt="Author 02" />
                  </a>
                  <div className="font-medium">
                    <a className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Body Elvis</a>
                    <span className="text-gray-700"> - </span>
                    <span className="text-gray-500">Jun 20, 2023</span>
                  </div>
                </footer>
              </article>

              {/* 3rd article */}
              <article className="flex flex-col h-full" data-aos="fade-up" data-aos-delay="400">
                <header>
                  <Link className="block mb-6" to="/blog-post">
                    <figure className="relative h-0 pb-9/16 overflow-hidden rounded-sm">
                      <img className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" src={NewsImage03} width="352" height="198" alt="News 03" />
                    </figure>
                  </Link>
                  <div className="mb-3">
                    <ul className="flex flex-wrap text-xs font-medium -m-1">
                      <li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">Conversational AI</a>
                      </li>
                      <li className="m-1">
                        <a className="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-teal-500 hover:bg-teal-600 transition duration-150 ease-in-out" href="#0">Researching on AI</a>
                      </li>
                    </ul>
                  </div>
                  <h3 className="h4 mb-2">
                    <Link className="hover:text-gray-100 transition duration-150 ease-in-out" to="/blog-post">Short introduction how AI will impact how we learn.</Link>
                  </h3>
                </header>
                <p className="text-lg text-gray-400 grow">AI will revolutionize learning by personalizing education, automating administrative tasks, and providing interactive and adaptive learning experiences.</p>
                <footer className="flex items-center mt-4">
                  <a href="#0">
                    <img className="rounded-full shrink-0 mr-4" src={NewsAuthor03} width="40" height="40" alt="Author 03" />
                  </a>
                  <div className="font-medium">
                    <a className="text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out" href="#0">Body Elvis</a>
                    <span className="text-gray-700"> - </span>
                    <span className="text-gray-500">Jun 25, 2023</span>
                  </div>
                </footer>
              </article>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default News;
