import { PORTFOLIO_PDF_URL, GITHUB_PROFILE_URL, CONTACT_EMAIL } from '../../constants/site';
const ContactSection = () => (
  <section className="contact-section portfolio-shell" id="contact" aria-labelledby="contact-title">
    <div className="contact-top"><div><p className="eyebrow">CONTACT</p><h2 id="contact-title">함께 일할 기회를<br />기다립니다.</h2></div><div className="contact-actions"><p>UX/UI 웹디자인 · 웹퍼블리싱</p><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`} aria-label={`이메일 보내기: ${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<span aria-hidden="true">↗</span></a><div className="contact-secondary"><a className="text-link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="visually-hidden"> (새 탭)</span></a>{PORTFOLIO_PDF_URL && <a className="text-link" href={PORTFOLIO_PDF_URL} target="_blank" rel="noopener noreferrer">포트폴리오 PDF <span aria-hidden="true">↗</span><span className="visually-hidden"> (새 탭)</span></a>}</div></div></div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} 김도한</span><span>UX/UI DESIGN & WEB PUBLISHING</span></footer>
  </section>
);
export default ContactSection;
