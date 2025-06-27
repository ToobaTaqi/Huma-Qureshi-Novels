import React from "react";
import Heading from "../components/Heading";
import Heading2 from "../components/Heading2";

export default function page() {
  return (
    <div className="py-5 lg:py-10 text-tertiary flex flex-col gap-6 lg-gap-10">
      <Heading name="About Me ✨ " />
      <div className="flex flex-col gap-6 lg:gap-10">
        <div className="flex flex-col gap-3">
          <p>Hi, I'm Huma Qureshi , a passionate storyteller and novelist.</p>
          <p>
            Writing has been more than just a skill for me; it’s a journey of
            expression, emotion, and connection. I began my writing career four
            years ago, sharing my very first story on Facebook. What started as
            a single post turned into a lifelong passion for weaving words into
            powerful narratives.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-2xl"> Since then, I’ve written:</h3>
          <ul className="list-disc ps-6 flex flex-col gap-2">
            <li>10 full-length Urdu novels</li>
            <li>5 short novels and afsanas</li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
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
        </div>

        <div className="flex flex-col gap-3">
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
        </div>

        <div className="flex flex-col gap-3">
          <Heading2 heading2=" Published Work:"/>
          <p>My novels and short stories have gained appreciation across online platforms, especially on Facebook, where my writing journey began. I continue to engage with my readers there while expanding into new platforms and creative formats.</p>
        </div>

        <div className="flex flex-col gap-3">
          <Heading name=" Let’s Connect"/>
          <p>
            If you’d like to collaborate, invite me for a guest post, or simply send a message, head over to the <a href="/contact" className="font-semibold lg:hover:text-secondary active:text-secondary">Contact Page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
