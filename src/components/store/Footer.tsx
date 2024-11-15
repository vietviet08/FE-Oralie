import { Text, clx } from "@medusajs/ui";
import Image from "next/image";

// import { getCategoriesList, getCollectionsList } from "@lib/data"

// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  //   const { collections } = await getCollectionsList(0, 6)
  //   const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-ui-border-base shadow-inner  ">
      <div className="mx-auto w-full sm:px-16 lg:px-32 px-6 py-8 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 w-full md:w-1/6 space-x-6 flex flex-row md:flex-col justify-between md:justify-start items-center  ">
            <div className="w-3/6 lg:w-full">
              <a href="https://flowbite.com/" className="flex items-center">
                <Image
                  src="/images/oralie.png"
                  width={64}
                  height={64}
                  className=""
                  alt="Oralie Logo"
                />
                <span className=" lg:block hidden self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Oralie
                </span>
              </a>
            </div>
            <div className="pt-4 w-3/6 lg:w-full">
              <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                contact with us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-1 lg:w-3/5">
                <li className="">
                  <a href="#" className="hover:underline"></a>
                </li>
                <li>
                  <div className="flex flex-wrap gap-2 lg:grid lg:grid-cols-4">
                    <div className="  ">
                      <a href="https://facebook.com" target="_blank">
                        <Image
                          width={25}
                          height={25}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/facebook_icon_8543190720.svg"
                          }
                          alt=""
                          className=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="https://zalo.vn" target="_blank">
                        <Image
                          width={25}
                          height={25}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/zalo_icon_8cbef61812.svg"
                          }
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="https://youtube.com" target="_blank">
                        <Image
                          width={25}
                          height={25}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/youtube_icon_b492d61ba5.svg"
                          }
                          alt=""
                        />
                      </a>
                    </div>
                    <div>
                      <a href="https://tiktok.com" target="_blank">
                        <Image
                          width={25}
                          height={25}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/tiktok_icon_faabbeeb61.svg"
                          }
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4 w-full md:w-5/6">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                ABOUT US
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
                <li className="">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Introduction to the company{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Operating regulations{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Friends - Your companion{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Promotional news{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Introduction to return devices{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Online shopping & payment instructions{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Apple authorized dealers and authorized warranty centers{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Check electronic invoices{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Check warranty{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Frequently asked questions{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Information and policies
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
                <li className="">
                  <a href="https://flowbite.com/" className="hover:underline">
                    Online shopping and payment{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Online installment shopping{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Installment shopping with credit card{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Delivery policy{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Check member points{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    View member promotions{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Check warranty information{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Check electronic invoices{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Purchase invoice information{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Official warranty center{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Regulations on data backup{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Apple product unboxing policy{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-1">
                <li className="">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="">
                  <div className="flex justify-between items-center -space-x-4">
                    <div className="w-2/5">
                      <Image
                        width={100}
                        height={100}
                        sizes="100%"
                        src={
                          "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/oralie-file-My_QR_Code_1-1024.png"
                        }
                        alt=""
                      ></Image>
                    </div>
                    <div className="w-3/5">
                      <Image
                        width={150}
                        height={100}
                        sizes="100%"
                        src={
                          "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/oralie-file-png-clipart-google-play-and-app-store-logos-app-store-google-play-apple-apple-text-logo-removebg-preview.png"
                        }
                        alt={""}
                      ></Image>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Payment support
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-1">
                  <li className="">
                    <a href="#" className="hover:underline"></a>
                  </li>
                  <li>
                    <div className="flex flex-wrap gap-1 md:grid md:grid-cols-4">
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/visa_icon_44fe6e15ed.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/mastercard_icon_c75f94f6a5.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/jcb_icon_214783937c.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/amex_icon_d6fb68108d.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/vnpay_icon_f42045057d.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/zalopay_icon_26d64ea93f.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/napas_icon_94d5330e3c.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/kredivo_icon_04f72baf36.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/momo_icon_baef21b5f7.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/foxpay_icon_063b36c1f8.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/alepay_icon_20d5310617.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/homepaylater_icon_adef600842.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/muadee_icon_5e297d9e61.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/applepay_icon_cb6806a0d0.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/samsungpay_icon_0292aa9876.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/googlepay_icon_afa293cc14.svg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="pt-4 w-full">
                <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Certification
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium text-sm space-y-1">
                  <li className="">
                    <a href="#" className="hover:underline"></a>
                  </li>
                  <li>
                    <div className="flex flex-wrap gap-1 md:grid md:grid-cols-4">
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/dmca_icon_8fc6622bd5.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/thuong_hieu_manh_2013_icon_b56f772475.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={55}
                          height={55}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/san_pham_dich_vu_hang_dau_viet_nam_icon_282a9ba4f7.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={35}
                          height={35}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/noi_khong_voi_hang_gia_icon_e16037d9cb.svg"
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <Image
                          width={100}
                          height={100}
                          sizes="100%"
                          src={
                            "https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/da_thong_bao_bo_cong_thuong_icon_64785fb3f7.svg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Oralie™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
