import React from "react";
import Heading from "../components/Heading";
import Heading2 from "../components/Heading2";

export default function page() {
  return (
    <div className="text-tertiary py-5 flex flex-col gap-6 lg:py-10">
      <Heading name="Privacy Policy" />

      <ol className="list-decimal ps-6 flex flex-col gap-6 lg:gap-10">
        <p>
          At Huma Qureshi Writer Website, your privacy is extremely important to
          us. This Privacy Policy explains how we collect, use, and protect your
          information when you visit our website.
        </p>
        {/*  */}
        <li className="relative pl-8 counter-increment list-item">
          {/* <span className="absolute left-0 top-0 font-bold">
            <span className="before:content-[counter(list-item)_'.'] before:counter-increment-[list-item]" />
          </span> */}
          <div className="flex flex-col gap-6">
            <Heading2 heading2="Information We Collect" />
            <p>
              {" "}
              We may collect the following information when you use our website:{" "}
              <br />
              Name and Email Address (if submitted via contact form or
              newsletter)
            </p>
          </div>
        </li>
        {/*  */}

        <li className="relative pl-8 counter-increment list-item">
          <div className="flex flex-col gap-6">
            <Heading2 heading2="Information We Collect" />
            <p>
              We may collect the following information when you use our website:{" "}
              <br />
              Name and Email Address (if submitted via contact form or
              newsletter) <br />
              {/* Basic technical data like IP address, browser type, or device
            information (collected automatically through cookies) */}
            </p>
          </div>
        </li>

        <li className="relative pl-8 counter-increment list-item">
          <div className="flex flex-col gap-6">
            <Heading2 heading2="How We Use Your Information" />
            <p>
              We use your information to: <br /> Respond to your messages or
              inquiries Send updates if you opt-in to newsletters Improve user
              experience and website performance We do not sell, rent, or trade
              your information to third parties.
            </p>
          </div>
        </li>

        <li className="relative pl-8 counter-increment list-item">
         <div className="flex flex-col gap-6">
           <Heading2 heading2=" Cookies" />
          <p>
            This website may use cookies to improve performance and gather
            anonymous usage data. You can disable cookies through your browser
            settings.
          </p>
         </div>
        </li>

        <li className="relative pl-8 counter-increment list-item">
         <div className="flex flex-col gap-6">
           <Heading2 heading2="Data Security" />
          <p>
            We take reasonable measures to protect your personal information and
            ensure it is not lost, misused, or accessed without permission.
          </p>
         </div>
        </li>

        <li className="relative pl-8 counter-increment list-item">
         <div className="flex flex-col gap-6">
           <Heading2 heading2="Third-Party Links" />
          <p>
            Our website may include links to third-party websites (e.g.,
            Facebook, Instagram, YouTube). <br /> We are not responsible for
            their privacy practices. Please review their privacy policies
            individually.
          </p>
         </div>
        </li>

        <li className="relative pl-8 counter-increment list-item">
         <div className="flex flex-col gap-6">
           <Heading2 heading2="Children’s Privacy" />
          <p>
            This website is not intended for children under 13. We do not
            knowingly collect personal information from children.
          </p>
         </div>
        </li>

        <li className="relative pl-8 counter-increment list-item">
        <div className="flex flex-col gap-6">
            <Heading2 heading2="Changes to this Policy" />
          <p>
            We may update this Privacy Policy occasionally. Any changes will be
            posted on this page.
          </p>
        </div>
        </li>
      </ol>
    </div>
  );
}
