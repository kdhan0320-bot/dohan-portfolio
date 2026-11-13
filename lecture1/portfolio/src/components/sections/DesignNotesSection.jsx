import { Link } from 'react-router-dom';
import RevealOnScroll from '../ui/RevealOnScroll';
export default function DesignNotesSection(){return <section className="experience-section" id="about" aria-labelledby="notes-title"><div className="portfolio-shell"><RevealOnScroll duration={.65}>
 <p className="edition-label">03 / BACKGROUND</p>
 <div className="experience-layout"><div><h2 id="notes-title">화면 밖에서<br/>배운 <em>일의 감각.</em></h2><Link to="/about" className="experience-link">경험과 제작 기여 보기</Link></div>
 <div className="experience-copy"><p>자동화설비회사에서<br className="experience-break"/> 구매관리·총무를 담당했습니다.</p><p>이 경험을 개인 작품의 주제 선정에 연결했습니다. 제품 제작에서는 주제·요구사항을 제시하고 제안을 검토해 방향을 선택했습니다.</p><dl><div><dt>김도한</dt><dd>주제·요구사항 제시 · 제안 검토 · 방향 선택</dd></div><div><dt>AI 협업</dt><dd>시각 제안 · Figma 화면 편집 · 웹 구현과 검사</dd></div></dl></div></div>
 </RevealOnScroll></div></section>}
