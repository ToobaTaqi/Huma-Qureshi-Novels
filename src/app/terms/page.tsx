import React from "react";
import Heading from "../components/Heading";
import Heading2 from "../components/Heading2";
import Link from "next/link";

export default function page() {
  return (
    <div className="py-5 lg:py-10 text-tertiary flex flex-col gap-6 lg-gap-10">
      <Heading name="Terms & Disclaimer" />
      <div className="flex flex-col gap-6 lg:gap-10">
        {/* <div className="flex flex-col gap-3">
             <p>Hi, I'm Huma Qureshi , a passionate storyteller and novelist.</p>
             <p>
               Writing has been more than just a skill for me; it’s a journey of
               expression, emotion, and connection. I began my writing career four
               years ago, sharing my very first story on Facebook. What started as
               a single post turned into a lifelong passion for weaving words into
               powerful narratives.
             </p>
           </div> */}
        {/* <div className="flex flex-col gap-3">
             <h3 className="font-semibold text-2xl"> General Terms</h3>
             <ul className="list-disc ps-6 flex flex-col gap-2">
               <li>10 full-length Urdu novels</li>
               <li>5 short novels and afsanas</li>
             </ul>
           </div> */}
        {/* <div className="flex flex-col gap-3">
             <p>
               Each of my stories is deeply rooted in emotion, often exploring
               themes of love, struggle, betrayal, resilience, and the hidden
               layers of human relationships. I write to move hearts, to challenge
               thoughts, and to give voice to the unspoken.I strongly believe that
               fiction is not just for entertainment. it is a mirror of
               society.{" "}
             </p>
             <p>
               Whether you're a loyal reader, a new visitor, or a fellow writer
               welcome to my world of words.
             </p>
           </div> */}

        {/* <div className="flex flex-col gap-3">
             <Heading2 heading2="Genres I Write 🖋 " />
             <ul className="list-disc ps-6 flex flex-col gap-2">
               <li>Romance & Emotional Fiction</li>
               <li>Social Drama</li>
               <li>Women-Centric Stories</li>
               <li>Social Issue-Based Narratives</li>
               <li>Short Stories (Afsanay)</li>
               <li>
                 Realistic & Thought-Provoking Plots Mystery & Suspense
                 (occasionally)
               </li>
             </ul>
           </div> */}

        <div className="flex flex-col gap-3">
          <Heading2 heading2="General Terms" />
          <p>
            By accessing and using this website, you agree to the following
            terms and conditions. If you do not agree with any part of these
            terms, please refrain from using the website.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Heading2 heading2="Content Ownership" />
          <p>
            All content published on this website ,including stories, novels,
            afsanas, articles, and creative works , is the intellectual property
            of Huma Qureshi, unless otherwise stated.
          </p>{" "}
          <p>
            You may not copy, reproduce, translate, republish, or distribute any
            part of this content without written permission.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Heading2 heading2="Fictional Disclaimer" />
          <p>
            All stories, characters, events, and places mentioned on this
            website are works of fiction unless clearly stated as real. Any
            resemblance to actual persons (living or dead), places, or incidents
            is purely coincidental.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Heading2 heading2="No Plagiarism Allowed 🚫" />
          <p>Visitors and readers are not allowed to:</p>
          <ul className="list-disc ps-6 flex flex-col gap-2">
            <li>Copy or steal written material</li>
            <li>Use content under their name or for commercial purposes</li>
            <li>Share full stories without credit or permission</li>
            <li>
              Legal action may be taken in case of violation of content rights.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Heading2 heading2="Collaborations & Permissions" />
          <div className="flex gap-1 flex-wrap">
            <p>
              For sharing, quoting, or collaborating professionally, please
              contact me directly through the Contact Page or email at
            </p>
            <Link
              href="mailto:humaqureshiofficial73@gmail.com"
              className="font-semibold"
              target="blank"
            >
              humaqureshiofficial73@gmail.com
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Heading2 heading2="Privacy & Data Use" />
          <p>
            Any personal data submitted through contact forms (such as name or
            email) will be kept confidential and never shared with third parties
            without consent.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Heading2 heading2="Disclaimer of Liability" />
          <p>
            While we try to keep all information accurate and updated, this
            website makes no guarantees about the completeness, reliability, or
            accuracy of the content.
          </p>
          <p>
            The author is not liable for any misinterpretation, emotional
            impact, or external use of the content.
          </p>
        </div>
        {/* <div className="flex flex-col gap-3">
             <Heading name=" Let’s Connect"/>
             <p>
               If you’d like to collaborate, invite me for a guest post, or simply send a message, head over to the <a href="/contact" className="font-semibold lg:hover:text-secondary active:text-secondary">Contact Page</a>.
             </p>
           </div> */}
      </div>
    </div>
  );
}
