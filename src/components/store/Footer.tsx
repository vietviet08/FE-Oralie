import Image from "next/image";
import Link from "next/link";

// import { getCategoriesList, getCollectionsList } from "@lib/data"

// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  //   const { collections } = await getCollectionsList(0, 6)
  //   const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-ui-border-base shadow-inner">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 py-6 lg:py-8">
        <div className="md:flex md:justify-between gap-6">
          {/* Logo and social media section */}
          <div className="mb-6 md:mb-0 w-full md:w-1/6 flex flex-col justify-between items-center md:items-start space-y-4 md:space-y-6">
            <div className="w-full flex items-center justify-center md:justify-start gap-2">
              <Image
                src="/images/oralie.png"
                width={64}
                height={64}
                className="w-14 h-14 md:w-16 md:h-16"
                alt="Oralie Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Oralie
              </span>
            </div>
            <div className="w-full">
              <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white text-center md:text-left">
                Contact with us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-1">
                <li>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-80">
                      <Image
                        width={25}
                        height={25}
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/facebook_icon_8543190720.svg"
                        alt="Facebook"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                      />
                    </a>
                    <a href="https://zalo.vn" target="_blank" rel="noreferrer" className="hover:opacity-80">
                      <Image
                        width={25}
                        height={25}
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/zalo_icon_8cbef61812.svg"
                        alt="Zalo"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                      />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:opacity-80">
                      <Image
                        width={25}
                        height={25}
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/youtube_icon_b492d61ba5.svg"
                        alt="YouTube"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                      />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:opacity-80">
                      <Image
                        width={25}
                        height={25}
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/tiktok_icon_faabbeeb61.svg"
                        alt="TikTok"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                      />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Menu sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full md:w-5/6 mt-6 md:mt-0">
            {/* About Us section */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                ABOUT US
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Introduction to the company
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Operating regulations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Friends - Your companion
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Promotional news
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Check warranty
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies section */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Information and policies
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Online shopping and payment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Online installment shopping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Delivery policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Check member points
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Warranty information
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal section with QR code */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm space-y-2">
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline hover:text-gray-700">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="pt-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <div className="w-20 h-20">
                      <Image
                        width={100}
                        height={100}
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/oralie-file-My_QR_Code_1-1024.png"
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-24 h-20">
                      <Image
                        width={150}
                        height={100}
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/oralie-file-png-clipart-google-play-and-app-store-logos-app-store-google-play-apple-apple-text-logo-removebg-preview.png"
                        alt="App Store and Google Play"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Payment options section */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Payment support
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {[
                  {src: "visa_icon_44fe6e15ed.svg", alt: "Visa"},
                  {src: "mastercard_icon_c75f94f6a5.svg", alt: "MasterCard"},
                  {src: "jcb_icon_214783937c.svg", alt: "JCB"},
                  {src: "amex_icon_d6fb68108d.svg", alt: "American Express"},
                  {src: "vnpay_icon_f42045057d.svg", alt: "VNPay"},
                  {src: "zalopay_icon_26d64ea93f.svg", alt: "ZaloPay"},
                  {src: "napas_icon_94d5330e3c.svg", alt: "Napas"},
                  {src: "momo_icon_baef21b5f7.svg", alt: "MoMo"}
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={`https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/${item.src}`}
                      alt={item.alt}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    />
                  </div>
                ))}
              </div>

              <h2 className="mt-6 mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Certification
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {[
                  {src: "dmca_icon_8fc6622bd5.svg", alt: "DMCA", size: "small"},
                  {src: "thuong_hieu_manh_2013_icon_b56f772475.svg", alt: "Strong Brand 2013", size: "small"},
                  {src: "san_pham_dich_vu_hang_dau_viet_nam_icon_282a9ba4f7.svg", alt: "Top Vietnam Service", size: "small"},
                  {src: "da_thong_bao_bo_cong_thuong_icon_64785fb3f7.svg", alt: "Registered with Ministry of Industry and Trade", size: "large"}
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-center ${item.size === 'large' ? 'col-span-2' : ''}`}>
                    <Image
                      width={40}
                      height={40}
                      src={`https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/${item.src}`}
                      alt={item.alt}
                      className={`${item.size === 'large' ? 'w-16 sm:w-20' : 'w-8 h-8 sm:w-10 sm:h-10'} object-contain`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer copyright section */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Oralie™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-2 sm:mt-0 space-x-5 sm:justify-center">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
