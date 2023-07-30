import React from "react";

const Footer = () => {
  return (
    <div className="d-flex flex-column h-100 my-5">
      <footer className="w-100 py-4 flex-shrink-0">
        <div className="container-view py-4">
          <div className="row gy-4 gx-5">
            <div className="col-lg-6 col-md-6 px-5">
              <h5 className="mb-3">LET'S BE FRIENDS</h5>
              <p className="small text-muted">
                Get a 30% discount on posters now when you sign up for our
                newsletter!
              </p>
              <form>
                <div className="mb-3">
                  <input
                    className="input-large"
                    type="text"
                    placeholder="Please enter your email address"
                  />
                  <button className="bt-primary mt-4 mb-2">SEND</button>
                  <p className="text-center">
                    In our privacy policy you can find out how we process your
                    data
                  </p>
                </div>
              </form>

              <div className="social-media-icons">
                <img
                  src="/assets/icons/fb.svg"
                  height="34"
                  width="34"
                  alt="fb"
                ></img>
                <img
                  src="/assets/icons/instagram.svg"
                  height="34"
                  width="34"
                  alt="fb"
                ></img>
                <img
                  src="/assets/icons/pinterest.svg"
                  height="34"
                  width="34"
                  alt="fb"
                ></img>
                <img
                  src="/assets/icons/tiktok.svg"
                  height="34"
                  width="34"
                  alt="fb"
                ></img>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 with-left-line">
              <h5 className="mb-3">TARANTINO</h5>
              <ul className="list-unstyled text-muted">
                <li>
                  <a
                    href="about-tarantino"
                    data-type="DirectoryItem"
                    class="text-xs"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    imprint
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    career
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    Environment
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    Student Discount
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    BrandBassador
                  </a>
                </li>
                <li>
                  <a
                    href="#h"
                    data-type="DirectoryItem"
                    class="text-xs hover:underline"
                  >
                    Registration (business)
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="mb-3">HELP</h5>
              <ul className="list-unstyled text-muted">
                <li>
                  <a href="#home">customer service</a>
                </li>
                <li>
                  <a href="#home">Conditions</a>
                </li>
                <li>
                  <a href="#home">Data protection</a>
                </li>
                <li>
                  <a href="#home">cookies</a>
                </li>
                <li>
                  <a href="#home">manage cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
