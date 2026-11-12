import { Link } from 'react-router-dom';
import RevealOnScroll from '../ui/RevealOnScroll';
export default function DesignNotesSection(){return <section className="experience-section" id="about" aria-labelledby="notes-title"><div className="portfolio-shell"><RevealOnScroll duration={.65}>
 <p className="edition-label">03 / BACKGROUND</p>
 <div className="experience-layout"><div><h2 id="notes-title">화면 밖에서<br/>배운 <em>일의 감각.</em></h2><Link to="/about" className="experience-link">경험과 제작 기여 보기</Link></div>
 <div className="experience-copy"><p>엑셀과 메일로 구매 요청을 정리하고,<br className="experience-break"/> 종이 결재서를 올리던 경험이 있습니다.</p><p>어떤 정보가 먼저 필요한지, 다음에 누가 무엇을 해야 하는지. 그 질문을 품의선과 설비결의 요구사항으로 이어갔습니다.</p><dl><div><dt>김도한</dt><dd>업무 경험 · 요구사항 · 우선순위 검토 · 방향 선택</dd></div><div><dt>AI 협업</dt><dd>시각 제안 · Figma 화면 편집 · 웹 구현과 검사</dd></div></dl></div></div>
 </RevealOnScroll></div></section>}
