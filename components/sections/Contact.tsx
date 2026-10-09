import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { contact, person, socials } from "@/data/content";

const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { label: "Email", value: person.email, href: socials.email, Icon: Mail, external: false },
  { label: "GitHub", value: pretty(socials.github), href: socials.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", value: pretty(socials.linkedin), href: socials.linkedin, Icon: LinkedinIcon, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="gradient-border flex flex-col gap-6 rounded-2xl p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-fg shadow-lift">
                <Mail className="size-5" aria-hidden />
              </span>
              <div>
                <h2 id="contact-title" className="font-display text-xl font-bold sm:text-2xl">
                  {contact.heading}
                </h2>
                <p className="mt-1 max-w-xl text-sm text-muted">{contact.body}</p>
              </div>
            </div>
            <ButtonLink href={socials.email} className="shrink-0">
              <Send className="size-4" aria-hidden /> {contact.button}
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <ul className="grid gap-3">
              {channels.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-shadow hover:shadow-lift"
                  >
                    <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted">{label}</span>
                      <span className="block truncate text-sm font-semibold">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
