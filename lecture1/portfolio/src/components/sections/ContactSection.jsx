import { Link } from 'react-router-dom';
import { GITHUB_PROFILE_URL, CONTACT_EMAIL } from '../../constants/site';
import RevealOnScroll from '../ui/RevealOnScroll';
export default function ContactSection(){return <section className="editorial-contact portfolio-shell" id="contact" aria-labelledby="contact-title"><RevealOnScroll duration={.65}>
 <p className="edition-label">CONTACT</p><div className="editorial-contact-top"><div><h2 id="contact-title">함께 만들<br/>다음 화면.</h2><p>웹·UI 디자인 신입 지원 · 웹퍼블리싱 학습 중</p><Link className="experience-link" to="/about">경험과 제작 범위 보기</Link></div><div className="editorial-contact-actions"><a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><div><a href={`mailto:${CONTACT_EMAIL}`} className="text-link">이메일 보내기</a><a href={GITHUB_PROFILE_URL} className="text-link" target="_blank" rel="noopener noreferrer">GitHub<span className="visually-hidden"> (새 탭)</span></a></div></div></div>
 </RevealOnScroll><footer className="site-footer"><span>© {new Date().getFullYear()} 김도한</span><span>DESIGN IN CONTEXT</span></footer></section>}
