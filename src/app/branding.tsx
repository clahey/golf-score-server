import Image from 'next/image'
import { Branding } from "@toolpad/core";
import logo from "./logo.png";


export const BRANDING: Branding = {
    logo:
        <Image src={logo} alt="" height="32" width="32" style={{
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)"
        }}></Image>,
    title: "Golf Score"
}