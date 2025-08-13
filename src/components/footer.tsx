
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-5 md:h-20 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
           <Image src="/logo.jpg" alt="Aarkay Techno Consultants Pvt. Ltd. Logo" width={20} height={20} className="h-5 w-5" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Aarkay Techno Consultants Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
