import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Backyard Cook",
  description: "Photos from Backyard Cook orders and events around Bakersfield, CA.",
};

const photoSpots = [
  { label: "Baby Back Ribs Rubbed and on the grill", src: "/images/BabyBackRibsRubbed.jpg" },
  { label: "Burnt Ends rubbed and ready for the grill", src: "/images/BurntEndsRubbed.jpg" },
  { label: "Plated food from a recent order", src: "/images/Plated.jpg" },
  { label: "Brisket Slicing", src: "/images/SlicingBrisket.jpg" },
  { label: "Completed Spread of recent order", src: "/images/CompletedSpread.jpg" },
  { label: "Ribs and Tri Tip on the grill", src: "/images/RibsAndTriTip.jpg" },
  { label: "Pastrami Sandwich", src: "/images/PastramiSandwich.jpg" },
  { label: "Bacon From Scratch after Smoker", src: "/images/BaconFromScratchSmoked.jpg" },
  { label: "Chicken Breast Rubbed and on the grill", src: "/images/ChickenBreastRubbedOnGrill.jpg" },
];

export default function Gallery() {
  return (
    <main>
      <section className="menu-hero">
        <p className="eyebrow">Gallery</p>
        <h1 className="menu-heading">Smoke, plates, and the occasional line out the door.</h1>
        <p className="menu-lede">
          A running record of past cooks — swap in new shots as new orders come through.
        </p>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="gallery-grid">
            {photoSpots.map((spot) => (
              <div key={spot.label} className="photo-frame">
                <Image
                  src={spot.src}
                  alt={spot.label}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ...cta-band unchanged... */}
    </main>
  );
}