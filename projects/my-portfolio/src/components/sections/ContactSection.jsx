import { GITHUB_PROFILE_URL, CONTACT_EMAIL } from '../../constants/site';
import RevealOnScroll from '../ui/RevealOnScroll';
const ContactSection = () => <section className="contact-section portfolio-shell" id="contact" aria-labelledby="contact-title">
  <RevealOnScroll><div className="contact-top"><div><p className="eyebrow">LET’S MAKE IT CLEAR</p><h2 id="contact-title">다음 화면을,<br />함께 만들어가고 싶습니다.</h2><p className="contact-description">웹·UI 디자인 신입 지원 · 웹퍼블리싱 학습 중</p></div><div className="contact-actions"><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><div className="contact-secondary"><a className="portfolio-button portfolio-button--primary" href={`mailto:${CONTACT_EMAIL}`}>이메일 보내기</a><a className="text-link" href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">GitHub<span className="visually-hidden"> (새 탭)</span></a></div></div></div></RevealOnScroll>
  <footer className="site-footer"><span>© {new Date().getFullYear()} 김도한</span><span>RECORD / CLARITY</span><span>Figma · AI 협업 웹 제작</span></footer>
</section>;
export default ContactSection;
