import { url } from "inspector";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row bg-cream2 justify-between items-center px-4 lg:px-20 py-10 lg:py-20">
        <div className="mb-4 lg:mb-0">
          <h2 className="font-semibold text-[24px] lg:text-[30px]">Free Delivery</h2>
          <p className="w-full lg:w-[75%]">
            For all orders over $50, consectetur adipim scing elit.
          </p>
        </div>
        <div className="mb-4 lg:mb-0">
          <h2 className="font-semibold text-[24px] lg:text-[30px]">90 Days Return</h2>
          <p className="w-full lg:w-[75%]">
            If goods have problems, consectetur adipim scing elit.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-[24px] lg:text-[30px]">Secure Payment</h2>
          <p className="w-full lg:w-[75%]">
            100% secure payment, consectetur adipim scing elit.
          </p>
        </div>
      </div>

      <div>
        <div className="relative bg4-center bg4-cover h-[320px] flex flex-col justify-center bg-cover items-center text-center py-10 px-4 lg:px-20 bg-[url('/images/instagrambg.png')]">
          <h1 className="text-3xl lg:text-5xl font-extrabold">Our Instagram</h1>
          <p className="mt-2 text-lg">Follow our store on Instagram</p>
          <button className="mt-4 px-6 py-2 bg4-white text4-gray-800 font-semibold rounded-full shadow-lg hover:shadow-md">
            Follow Us
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between py-10 px-4 lg:px-20">
        <div className="mb-4 lg:mb-0">
          <p>400 University Drive Suite 200 Coral Gables,</p>
          <p>FL 33134 USA</p>
        </div>

        <div className="mb-4 lg:mb-0">
          <h3 className="font-semibold mb-2">Links</h3>
          <ul className="space-y-2 text-black">
            <li>
              <a href="/" className="hover:text4-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text4-gray-600">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text4-gray-600">
                Contact
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text4-gray-600">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-4 lg:mb-0">
          <h3 className="font-semibold mb-2">Help</h3>
          <ul className="space-y-2 text-black">
            <li>
              <a href="/cart" className="hover:text4-gray-600">
                Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:text4-gray-600">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text4-gray-600">
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <div className="flex items-center border border-b-2 border-black rounded">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-grow p-2 text4-gray-700"
            />
            <button className="bg4-gray-800 text4-white px-4 py-2 hover:bg4-gray-600">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="bg4-gray-100 text4-gray-600 py-4 text-center text4-sm">
        2025 Meubel House. All rights reserved | Developer by Zuhaib
      </div>
    </div>
  );
};

export default Footer;