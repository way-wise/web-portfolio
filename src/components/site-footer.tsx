import Link from "next/link";
import Image from "next/image";
// import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

// const socialLinks = [
//   { name: "Twitter", icon: Twitter, href: "#" },
//   { name: "LinkedIn", icon: Linkedin, href: "#" },
//   { name: "Instagram", icon: Instagram, href: "#" },
//   { name: "GitHub", icon: Github, href: "#" },
// ];

export function SiteFooter() {
  return (
    <footer className="border-t bg-black text-white">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="max-w-xl mx-auto text-center flex flex-col gap-4 items-center justify-center">
          <Link href="/" className="flex items-center space-x-2 py-3">
            <Image
              src="/images/logo-light.webp"
              alt="Way-Wise Tech INC Logo"
              width={260}
              height={60}
              className="aspect-auto w-full max-w-[250px]"
            />
          </Link>
          <p className="text-muted-foreground">
            Transforming ideas into exceptional digital experiences. We craft
            innovative solutions that empower businesses to thrive in the
            digital age.
          </p>
          {/* <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="rounded-full border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="sr-only">{social.name}</span>
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div> */}
        </div>
        <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Way-Wise Tech INC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
