import Link from "next/link";
export function Footer() {
  return (
    <footer className="outer-container flex flex-col justify-end pt-20 md:pt-24 pb-10 md:pb-14 grow">
      <Link href="/" className="inline-block mb-4">
        <img src="/logo.svg" alt="FindIT logo" className="w-20 lg:w-24" />
      </Link>
      <section className="md:flex flex-row items-end gap-8 lg:gap-12">
        <div>
          <div className="flex flex-row gap-2 mb-2">
            <img src="/email.svg" alt="Email icon" />
            <a href="mailto:info@findit.ee" className="text-lg ">
              info@findit.ee
            </a>
          </div>
          <div className="flex flex-row gap-2 mb-4 md:mb-0">
            <img src="/phone.svg" alt="Phone icon" />
            <a href="tel:+37256843090" className="text-lg">
              +372 5684 3090
            </a>
          </div>
        </div>
        <p className="text-base md:text-lg">
          Copyright © 2023 FindIT. All rights reserved.
        </p>
      </section>
    </footer>
  );
}
