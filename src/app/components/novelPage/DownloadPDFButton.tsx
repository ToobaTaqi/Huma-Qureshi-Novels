import Image from "next/image";
import React from "react";

export default function DownloadPDFButton({ pdf }: { pdf: string }) {
  return (
    <a
      href={pdf}
      target="blank"
      className="px-10 flex gap-1 justify-center flex-wrap border border-primary active:border-tertiary rounded py-2 w-fit self-center"
    >
      <p className="text-tertiary">Download PDF</p>
      <Image
        className="w-6 h-6"
        src={
          "https://res.cloudinary.com/dx1gryhqc/image/upload/v1758662209/download_tt1crr.png"
        }
        width={100}
        height={100}
        alt=""
      />
    </a>
  );
}
