import React from "react";
import Heading from "../components/Heading";
import Image from "next/image";
// import { icons } from "../assets";
import Link from "next/link";

export default function page() {
  return (
    <div className="text-tertiary py-5 lg:py-10 flex flex-col gap-6 lg:gap-10">
      <div className="flex flex-col gap-3">
        <Heading name="Get in touch" />
        <p className="leading-loose">
          Thank you for visiting! <br /> Whether you’re a reader, publisher,
          collaborator, or fellow creative. <br /> I’d love to hear from you.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Heading name="Let’s Connect" />
        <p className="leading-loose">
          Have a project in mind? Want to discuss a story idea, a freelance
          opportunity, or just want to say hello? <br />
          Feel free to drop a message. I personally read every email, and I’ll
          get back to you as soon as possible.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Heading name="Looking for Professional Collaboration?" />
        <div>
          <p className="leading-loose">I’m open to: </p>
          <br />
          <ul className="list-disc ps-6 flex flex-col gap-2">
            <li>Freelance writing</li>
            <li>Story development & ghostwriting</li>
            <li>Content creation</li>
            <li>Screenplay or novel consultation</li>
            <li>Guest posts or interviews</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Heading name="Contact Details" />
        <div className="flex items-center gap-6">
          <Image
            src={
              "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662210/location_o9fddb.png"
            }
            alt=""
            width={100}
            height={100}
            className="w-10 "
          />
          <p>Karachi, Pakistan (Available for global projects remotely)</p>
        </div>
        <div className="flex justify-center items-center gap-6">
          <Link href="mailto:humaqureshiofficial73@gmail.com">
            <Image
              src={
                "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662225/mail_psqetd.png"
              }
              alt=""
              width={100}
              height={100}
              className="w-16 p-3 rounded hover:bg-tertiary active:bg-tertiary"
            />
          </Link>
          <Link
            href="https://youtube.com/@humaqureshinovels?si=XeLDyX5ho0LUqPwl"
            target="blank"
            className="flex justify-center items-center"
          >
            <Image
              src={
                "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758664074/youtube_dpg3g8.png"
              }
              alt=""
              width={100}
              height={100}
              className="w-16 p-3 rounded hover:bg-tertiary active:bg-tertiary"
            />
          </Link>
          <Link
            href="https://www.facebook.com/share/1AjE5KhudS/"
            target="blank"
            className="flex justify-center items-center"
          >
            <Image
              src={
                "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/facebook_vgnanl.png"
              }
              alt=""
              width={100}
              height={100}
              className="w-16 p-3 rounded hover:bg-tertiary active:bg-tertiary"
            />
          </Link>
          <Link
            href="https://www.instagram.com/humaqureshinovels?igsh=amp6Y3B5OXJvb3lh"
            target="blank"
            className="flex justify-center items-center"
          >
            <Image
              src={
                "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758663992/instagram_mxjgaa.png"
              }
              alt=""
              width={100}
              height={100}
              className="w-16 p-3 rounded hover:bg-tertiary active:bg-tertiary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
