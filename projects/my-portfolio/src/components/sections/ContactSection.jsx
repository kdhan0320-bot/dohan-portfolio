import { GITHUB_PROFILE_URL, CONTACT_EMAIL } from '../../constants/site';
const ContactSection = () => (
  <section className="contact-section portfolio-shell" id="contact" aria-labelledby="contact-title">
    <div className="contact-top">
      <div><p className="eyebrow">CONTACT</p><h2 id="contact-title">다음 경험을,<br />함께 만들어가고 싶습니다.</h2><p className="contact-description">UX/UI 디자인 · 웹퍼블리싱 신입 지원</p></div>
      <div className="contact-actions"><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><div className="contact-secondary"><a className="portfolio-button portfolio-button--primary" href={`mailto:${CONTACT_EMAIL}`}>이메일 보내기</a><a className="portfolio-button portfolio-button--secondary" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">GitHub 보기<span className="visually-hidden"> (새 탭)</span></a></div></div>
    </div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} 김도한</span><span>차분하게 정리하고, 분명하게 표현합니다.</span></footer>
  </section>
);
export default ContactSection;
