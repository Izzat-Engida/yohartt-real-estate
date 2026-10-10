import { site } from '@/data/site';
import { ContactForm } from '../ContactForm';

export function ContactSection({ label = '(06)' }: { label?: string }) {
  return (
    <section className="contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__copy">
          <p className="eyebrow" data-reveal="">
            <span>{label}</span> Contact
          </p>
          <h2 className="display display--xl" data-reveal="">
            Let’s find
            <br />
            <em>your</em> floor.
          </h2>
          <p className="contact__lead" data-reveal="">
            Book a site visit, request floor plans or ask about payment options. Our sales team will get back to you
            shortly.
          </p>
          <ul className="contact__list" data-reveal="">
            <li>
              <span>Call</span>
              <a href={site.phone.href}>{site.phone.display}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span>Visit</span>
              <p>
                {site.city}, {site.country}
              </p>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
