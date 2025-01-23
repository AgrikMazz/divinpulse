import { GoChevronDown } from "react-icons/go";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { footer_data } from "@/lib/list";
import Link from "next/link";
import { IoShieldHalf } from "react-icons/io5";
import { TiTickOutline } from "react-icons/ti";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
        <div className="w-full bg-[#000060] p-4">
            <div className="flex flex-col xl:flex-row xl:px-10 xl:my-4 items-center justify-center gap-x-14 w-full">
                <div className="flex flex-col items-center justify-center transition w-fit border border-white hover:shadow-lg mt-6 mb-10 p-4 rounded-lg">
                    <div className="text-gray-200 font-serif font-semibold text-xl py-2 flex items-center gap-x-4"><IoShieldHalf size={30} />Safe and Secure Shopping</div>
                    <div className="text-gray-200 font-serif font-semibold text-xl py-2 flex items-center gap-x-4"><TiTickOutline size={30} />Trusted and Authentic Products</div>
                    <div className="text-gray-200 font-serif font-semibold text-xl py-2 flex items-center gap-x-4"><CiDeliveryTruck size={30} />Fast and Reliable Service</div>
                    <div className="text-gray-200 font-serif font-semibold text-xl py-2 flex items-center gap-x-4"><FaRegCreditCard size={30} />Easy and Secure Payments</div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="flex max-w-5xl mb-6 items-start justify-between w-full gap-4">
                        {footer_data.map((data) => <div key={data.title}>
                            <div className="text-white flex flex-col font-semibold text-lg mt-2 mb-2 gap-y-2">{data.title}</div>
                            {data.content.map((content) =>
                                <div key={content.link} className="py-2">
                                    <Link href={content.link} className="text-gray-300 hover:text-white font-light text-sm hover:underline">{content.name}</Link>
                                </div>)
                            }
                        </div>)}
                        <div className="flex flex-col">
                            <div className="text-white flex flex-col font-semibold text-lg mt-2 mb-2 gap-y-2">Contact us:</div>
                            <div className="py-2 flex items-scenter gap-x-2">
                                <Phone className="text-white" />
                                <p className="text-gray-300 font-semibold text-sm">+91 74395 41004</p>
                            </div>
                            <div className="py-2 flex items-scenter gap-x-2">
                                <Mail className="text-white" />
                                <p className="text-gray-300 font-semibold text-sm hover:underline">divinpulse@gmail.com</p>
                            </div>
                            <div className=" text-white font-light mt-2">
                                Follow us on:
                            </div>
                            <div className="py-2">
                                <Link href={"https://www.instagram.com/divinpulse/"}><Instagram className="text-white" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="bg-slate-200" />
            <div className="flex flex-row justify-between items-center p-2 mt-2">
                <div>
                    <h1 className="text-3xl text-white font-semibold font-serif">Divine Pulse</h1>
                    <p className="text-slate-400 text-sm font-light">© 2024 DIVIN PULSE. All Rights Reserved.</p>
                </div>
                {/*<div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex py-1 px-2 items-center font-semibold bg-gray-400 rounded-xl">
                            ENG
                            <GoChevronDown className="ml-3 p-1 h-6 w-6 rounded-full hover:bg-slate-300 transition" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>English</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>*/}
            </div>
            <div className="flex flex-row justify-between items-center p-2 gap-x-4 max-w-5xl">
                <Link href="/policies/terms-and-conditions" className="text-slate-400 text-sm font-light hover:underline hover:text-slate-200">Terms and Conditions</Link>
                <Link href="/policies/privacy-policy" className="text-slate-400 text-sm font-light hover:underline hover:text-slate-200">Privacy Policy</Link>
                <Link href="/policies/shipping-and-delivery" className="text-slate-400 text-sm font-light hover:underline hover:text-slate-200">Shipping and Delivery</Link>
                <Link href="/policies/cancellation-and-refund" className="text-slate-400 text-sm font-light hover:underline hover:text-slate-200">Cancellation and Refund</Link>
            </div>
        </div>
    );
}

export default Footer;